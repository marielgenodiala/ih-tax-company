import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import {
  allServicePathsQuery,
  serviceByPathQuery,
  seoSettingsQuery,
} from "@/sanity/lib/queries";
import { SITE_URL, SITE_NAME, SITE_SUFFIX, resolveSeo } from "@/lib/seo";
import SectionRenderer from "@/components/sections/SectionRenderer";
import JsonLd from "@/components/seo/JsonLd";

export const revalidate = 60;

interface ServicePageProps {
  params: Promise<{ slug: string; serviceSlug: string }>;
}

export async function generateStaticParams() {
  const services: { category: string; slug: string }[] =
    (await client.fetch(allServicePathsQuery)) || [];

  return services.map(({ category, slug }) => ({
    slug: category,
    serviceSlug: slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug, serviceSlug } = await params;

  const [service, global] = await Promise.all([
    client.fetch(serviceByPathQuery, {
      category: slug,
      slug: serviceSlug,
    }),
    client.fetch(seoSettingsQuery),
  ]);

  if (!service) {
    return { title: "Service Not Found" };
  }

  const seo = resolveSeo(service.seo, global);
  const titleBase = service.title || "Service";
  const titleStr = seo.customTitle || `${titleBase} | ${SITE_SUFFIX}`;
  const canonical = `${SITE_URL}/${slug}/${serviceSlug}`;
  const ogImage = seo.ogImage;

  return {
    title: seo.customTitle ? { absolute: seo.customTitle } : titleBase,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: titleStr,
      description: seo.description,
      siteName: SITE_NAME,
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: titleStr }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: titleStr,
      description: seo.description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug, serviceSlug } = await params;

  const [service, global] = await Promise.all([
    client.fetch(serviceByPathQuery, {
      category: slug,
      slug: serviceSlug,
    }),
    client.fetch(seoSettingsQuery),
  ]);

  if (!service) {
    notFound();
  }

  const seo = resolveSeo(service.seo, global);
  const titleBase = service.title || "Service";
  const titleStr = seo.customTitle || `${titleBase} | ${SITE_SUFFIX}`;
  const canonical = `${SITE_URL}/${slug}/${serviceSlug}`;

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
      <SectionRenderer sections={service.sections || []} />
    </>
  );
}

