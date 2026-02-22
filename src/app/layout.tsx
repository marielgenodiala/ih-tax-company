import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { client } from "@/sanity/lib/client";
import { seoSettingsQuery } from "@/sanity/lib/queries";
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

  return {
    title: seo?.seoTitle || "I H Professionals & Co. Pty Ltd | Tax Agent",
    description:
      seo?.seoDescription ||
      "Tax Return, I H Professionals & Co. Pty Ltd, We have more than 15 years experience in accounting, tax and business advisory fields with a great range of business, individuals, SMSFs & Trusts. Located in the Sydney CBD and various locations across Sydney.",
    keywords: seo?.seoKeywords || undefined,
    openGraph: seo?.seoImage
      ? { images: [{ url: seo.seoImage }] }
      : undefined,
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
      <body>{children}</body>
    </html>
  );
}
