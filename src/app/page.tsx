import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { pageBySlugQuery, seoSettingsQuery } from "@/sanity/lib/queries";
import SectionRenderer from "@/components/sections/SectionRenderer";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await client.fetch(seoSettingsQuery);
  return {
    title: {
      absolute: seo?.seoTitle || "I H Professionals & Co. Pty Ltd | Tax Agent",
    },
  };
}

export default async function HomePage() {
  const page = await client.fetch(pageBySlugQuery, { slug: "home" });
  if (!page) notFound();

  return <SectionRenderer sections={page.sections || []} />;
}
