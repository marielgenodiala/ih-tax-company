import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { blogPostSlugsQuery, allTeamMemberSlugsQuery, allServicePathsQuery } from "@/sanity/lib/queries";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ih-tax-company.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogSlugs, teamSlugs, servicePaths] = await Promise.all([
    client.fetch<{ slug: string }[]>(blogPostSlugsQuery),
    client.fetch<{ slug: string }[]>(allTeamMemberSlugsQuery),
    client.fetch<{ category: string; slug: string }[]>(allServicePathsQuery),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blogs`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/book-online`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = (blogSlugs || []).map(({ slug }) => ({
    url: `${BASE_URL}/blogs/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const teamRoutes: MetadataRoute.Sitemap = (teamSlugs || []).map(({ slug }) => ({
    url: `${BASE_URL}/team/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = (servicePaths || []).map(({ category, slug }) => ({
    url: `${BASE_URL}/services/${category}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes, ...teamRoutes, ...serviceRoutes];
}
