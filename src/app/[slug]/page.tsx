import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { pageBySlugQuery, allPageSlugsQuery } from "@/sanity/lib/queries";
import SectionRenderer from "@/components/sections/SectionRenderer";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pages: { slug: string }[] =
    (await client.fetch(allPageSlugsQuery)) || [];
  return pages
    .filter((p) => p.slug)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await client.fetch(pageBySlugQuery, { slug });
  if (!page) return { title: "Page Not Found" };
  return {
    title: `${page.title} | I H Professionals & Co.`,
  };
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await client.fetch(pageBySlugQuery, { slug });
  if (!page) notFound();

  return (
    <>
      {page.sections && <SectionRenderer sections={page.sections} />}
    </>
  );
}
