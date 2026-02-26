import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { client } from "@/sanity/lib/client";
import { seoSettingsQuery } from "@/sanity/lib/queries";
import { SITE_URL, SITE_NAME, SITE_SUFFIX, DEFAULT_DESCRIPTION } from "@/lib/seo";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const seo = await client.fetch(seoSettingsQuery);

  const description = seo?.seoDescription || DEFAULT_DESCRIPTION;
  const ogImage = seo?.seoImage;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      template: `%s | ${SITE_SUFFIX}`,
      default: seo?.seoTitle || SITE_SUFFIX,
    },
    description,
    keywords: seo?.seoKeywords || undefined,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      description,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      site: "@ihprofessionals",
      description,
      ...(ogImage && { images: [ogImage] }),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    icons: {
      icon: "/images/brandlogo-new.png",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfairDisplay.variable}`}>
      <head>
        {/* Preload hero background so LCP image is discovered early */}
        <link
          rel="preload"
          as="image"
          href="/images/heroImage.avif"
          type="image/avif"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
