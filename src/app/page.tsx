import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { pageBySlugQuery } from "@/sanity/lib/queries";
import SectionRenderer from "@/components/sections/SectionRenderer";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(pageBySlugQuery, { slug: "home" });
  if (!page) return { title: "I H Professionals & Co." };
  return {
    title: `${page.title} | I H Professionals & Co.`,
  };
}

export default async function HomePage() {
  const page = await client.fetch(pageBySlugQuery, { slug: "home" });
  if (!page) notFound();

  return <SectionRenderer sections={page.sections || []} />;
}
