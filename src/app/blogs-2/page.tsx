import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { allBlogPostsQuery, seoSettingsQuery } from "@/sanity/lib/queries";
import { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export const revalidate = 60;

const PAGE_TITLE = "Blog";
const PAGE_DESCRIPTION =
  "Tax tips, accounting insights, and business updates from I H Professionals & Co.";
const CANONICAL = `${SITE_URL}/blogs`;

export async function generateMetadata(): Promise<Metadata> {
  const global = await client.fetch(seoSettingsQuery);
  const ogImage = global?.seoImage || null;

  return {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    alternates: { canonical: CANONICAL },
    openGraph: {
      type: "website",
      url: CANONICAL,
      title: `${PAGE_TITLE} | ${SITE_NAME}`,
      description: PAGE_DESCRIPTION,
      siteName: SITE_NAME,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${PAGE_TITLE} | ${SITE_NAME}`,
      description: PAGE_DESCRIPTION,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

interface BlogPost {
  title: string;
  slug: string;
  date: string;
  category: string;
  readingTime: string;
  excerpt: string;
  image: string;
  imageAlt: string;
}

export default async function BlogsPage() {
  const blogPosts: BlogPost[] = await client.fetch(allBlogPostsQuery);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${PAGE_TITLE} | ${SITE_NAME}`,
    url: CANONICAL,
    description: PAGE_DESCRIPTION,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <Header />
      <section className="page-hero">
        <div className="container">
          <h1>Our Blog</h1>
          <p>Updates, insights, and resources for your business.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <RevealWrapper>
            <div className="section__header section__header--left">
              <span className="section-label">All Posts</span>
            </div>
          </RevealWrapper>
          <div className="grid grid--3">
            {blogPosts.map((post, i) => (
              <RevealWrapper key={post.slug} delay={(((i % 3) + 1) as 1 | 2 | 3)}>
                <Link href={`/blogs/${post.slug}`} className="blog-card blog-card--link">
                  <div className="blog-card__image">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.imageAlt || post.title}
                        width={400}
                        height={250}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <div className="blog-card__content">
                    <div className="blog-card__meta">
                      <span className="blog-card__date">{post.date}</span>
                      {post.readingTime && (
                        <span className="blog-card__read-time">{post.readingTime}</span>
                      )}
                    </div>
                    <h3 className="blog-card__title">{post.title}</h3>
                    <p className="blog-card__excerpt">{post.excerpt}</p>
                    <p className="blog-card__author">I H Professionals &amp; Co</p>
                  </div>
                </Link>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
