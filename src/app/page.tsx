import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { pageBySlugQuery, seoSettingsQuery } from "@/sanity/lib/queries";
import { SITE_URL, SITE_NAME, SITE_SUFFIX, resolveSeo } from "@/lib/seo";
import SectionRenderer from "@/components/sections/SectionRenderer";
import JsonLd from "@/components/seo/JsonLd";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const [page, global] = await Promise.all([
    client.fetch(pageBySlugQuery, { slug: "home" }),
    client.fetch(seoSettingsQuery),
  ]);

  const seo = resolveSeo(page?.seo, global);
  // Home page: custom title is absolute; empty → use default site suffix
  const title = seo.customTitle || global?.seoTitle || SITE_SUFFIX;
  const ogImage = seo.ogImage;

  return {
    title: { absolute: title },
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: SITE_URL },
    openGraph: {
      type: "website",
      url: SITE_URL,
      title,
      description: seo.description,
      siteName: SITE_NAME,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: seo.description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function HomePage() {
  const [page, global] = await Promise.all([
    client.fetch(pageBySlugQuery, { slug: "home" }),
    client.fetch(seoSettingsQuery),
  ]);
  if (!page) notFound();

  const seo = resolveSeo(page?.seo, global);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: SITE_NAME,
    url: SITE_URL,
    description: seo.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Level 17, 9 Castlereagh Street",
      addressLocality: "Sydney",
      addressRegion: "NSW",
      postalCode: "2000",
      addressCountry: "AU",
    },
    telephone: "02 8041 8276",
    email: "info@ihprofessionals.com.au",
    areaServed: "Sydney, NSW, Australia",
    sameAs: [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: seo.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/blogs?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={websiteSchema} />
      <SectionRenderer sections={page.sections || []} />
    </>
  );
}
