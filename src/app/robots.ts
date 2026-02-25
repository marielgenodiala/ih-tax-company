import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ih-tax-company.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/sanity/", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
