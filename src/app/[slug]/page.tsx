import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { pageBySlugQuery, allPageSlugsQuery, seoSettingsQuery } from "@/sanity/lib/queries";
import { SITE_URL, SITE_NAME, SITE_SUFFIX, resolveSeo } from "@/lib/seo";
import SectionRenderer from "@/components/sections/SectionRenderer";
import JsonLd from "@/components/seo/JsonLd";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pages: { slug: string }[] =
    (await client.fetch(allPageSlugsQuery)) || [];
  return pages.filter((p) => p.slug).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const [page, global] = await Promise.all([
    client.fetch(pageBySlugQuery, { slug }),
    client.fetch(seoSettingsQuery),
  ]);
  if (!page) return { title: "Page Not Found" };

  const seo = resolveSeo(page.seo, global);
  const canonical = `${SITE_URL}/${slug}`;
  const ogImage = seo.ogImage;
  // Custom title → absolute (exact). Empty → page.title gets template suffix appended.
  const titleMeta = seo.customTitle
    ? { absolute: seo.customTitle }
    : page.title;
  const titleStr = seo.customTitle || `${page.title} | ${SITE_SUFFIX}`;

  return {
    title: titleMeta,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: titleStr,
      description: seo.description,
      siteName: SITE_NAME,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: titleStr }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: titleStr,
      description: seo.description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const [page, global] = await Promise.all([
    client.fetch(pageBySlugQuery, { slug }),
    client.fetch(seoSettingsQuery),
  ]);
  if (!page) notFound();

  const seo = resolveSeo(page.seo, global);
  const canonical = `${SITE_URL}/${slug}`;
  const titleStr = seo.customTitle || `${page.title} | ${SITE_SUFFIX}`;

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: titleStr,
    url: canonical,
    description: seo.description,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <>
      <JsonLd data={webPageSchema} />
      {page.sections && <SectionRenderer sections={page.sections} />}
    </>
  );
}
