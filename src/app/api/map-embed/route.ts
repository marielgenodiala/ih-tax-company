import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = [
  "https://maps.app.goo.gl",
  "https://goo.gl",
  "https://www.google.com/maps",
  "https://google.com/maps",
  "https://maps.google.com",
];

function isValidMapUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return ALLOWED_ORIGINS.some(
      (origin) => u.origin === origin || u.href.startsWith(origin + "/")
    );
  } catch {
    return false;
  }
}

/**
 * Extract latitude and longitude from a Google Maps URL.
 * Handles formats: @lat,lng,17z and /@lat,lng,zoom
 */
function extractCoordsFromUrl(finalUrl: string): { lat: number; lng: number } | null {
  const atMatch = finalUrl.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
  if (atMatch) {
    const lat = parseFloat(atMatch[1]);
    const lng = parseFloat(atMatch[2]);
    if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };
  }
  const dataMatch = finalUrl.match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/);
  if (dataMatch) {
    const lat = parseFloat(dataMatch[1]);
    const lng = parseFloat(dataMatch[2]);
    if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };
  }
  return null;
}

/**
 * Convert a Google Maps share link (e.g. https://maps.app.goo.gl/xxx) to an
 * embeddable iframe URL by following the redirect and extracting coordinates.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  if (!isValidMapUrl(url)) {
    return NextResponse.json({ error: "Invalid map URL" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0 (compatible; MapEmbed/1.0)" },
    });
    const finalUrl = res.url || url;
    const coords = extractCoordsFromUrl(finalUrl);

    if (!coords) {
      return NextResponse.json(
        { error: "Could not extract coordinates from map URL" },
        { status: 422 }
      );
    }

    const embedUrl = `https://www.google.com/maps?q=${coords.lat},${coords.lng}&output=embed`;
    return NextResponse.json({ embedUrl });
  } catch (err) {
    console.error("[map-embed]", err);
    return NextResponse.json(
      { error: "Failed to resolve map URL" },
      { status: 502 }
    );
  }
}
