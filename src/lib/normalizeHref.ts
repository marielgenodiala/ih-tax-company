import React from "react";

/**
 * Normalizes a URL path for internal links.
 * Handles formats like "team", "/team", "home", "/home", "/#contact", "/book-online".
 * External URLs (http://, https://, www.) are returned with proper protocol.
 */
export function normalizeHref(href: string | undefined): string {
  if (!href) return "/";

  const trimmed = href.trim();

  // External URL
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // www. format — add https://
  if (trimmed.startsWith("www.")) {
    return `https://${trimmed}`;
  }

  // Anchor link on current page
  if (trimmed.startsWith("#")) {
    return trimmed;
  }

  // Already starts with /
  if (trimmed.startsWith("/")) {
    // /home → /
    if (trimmed === "/home") return "/";
    return trimmed;
  }

  // Plain slug: "home" → "/", "team" → "/team"
  if (trimmed === "home") return "/";
  return `/${trimmed}`;
}

/**
 * Normalizes a social media URL.
 * Handles: "www.facebook.com", "facebook.com", "https://facebook.com"
 */
/**
 * Parses *text* into <em> tags and \n into <br /> elements.
 * Example: "Feel the *I H Professionals*\nDifference"
 *        → ["Feel the ", <em>I H Professionals</em>, <br />, "Difference"]
 */
export function parseEmphasis(text: string): (string | React.ReactElement)[] {
  // First split by *emphasis*
  const emphParts = text.split(/\*([^*]+)\*/g);
  const result: (string | React.ReactElement)[] = [];
  let keyIdx = 0;

  for (let i = 0; i < emphParts.length; i++) {
    if (i % 2 === 1) {
      // Emphasized text
      result.push(React.createElement("em", { key: `em-${keyIdx++}` }, emphParts[i]));
    } else {
      // Plain text — split by newlines to insert <br />
      const lines = emphParts[i].split("\n");
      lines.forEach((line, li) => {
        if (li > 0) {
          result.push(React.createElement("br", { key: `br-${keyIdx++}` }));
        }
        if (line) result.push(line);
      });
    }
  }

  return result;
}

export function normalizeSocialUrl(url: string | undefined): string {
  if (!url) return "#";

  const trimmed = url.trim();

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  if (trimmed.startsWith("www.")) {
    return `https://${trimmed}`;
  }

  // Bare domain like "facebook.com"
  if (trimmed.includes(".")) {
    return `https://${trimmed}`;
  }

  return trimmed;
}
