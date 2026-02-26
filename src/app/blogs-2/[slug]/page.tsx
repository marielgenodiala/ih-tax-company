import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import RevealWrapper from "@/components/ui/RevealWrapper";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import {
  blogPostBySlugQuery,
  blogPostSlugsQuery,
  recentPostsQuery,
  seoSettingsQuery,
} from "@/sanity/lib/queries";
import { portableTextComponents } from "@/components/blog/PortableTextComponents";
import HeroImageModal from "@/components/blog/HeroImageModal";
import JsonLd from "@/components/seo/JsonLd";
import { SITE_URL, SITE_NAME, SITE_SUFFIX, resolveSeo } from "@/lib/seo";

export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

interface PostSeo {
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string[] | null;
  ogImage?: string | null;
}

interface BlogPost {
  title: string;
  slug: string;
  date: string;
  category: string;
  readingTime: string;
  excerpt: string;
  content: unknown[];
  image: string;
  imageAlt: string;
  seo?: PostSeo | null;
}

interface RecentPost {
  title: string;
  slug: string;
  date: string;
  image: string;
  imageAlt: string;
}

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(blogPostSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const [post, global]: [BlogPost | null, unknown] = await Promise.all([
    client.fetch(blogPostBySlugQuery, { slug }),
    client.fetch(seoSettingsQuery),
  ]);
  if (!post) return { title: "Post Not Found" };

  const seo = resolveSeo(post.seo, global as Parameters<typeof resolveSeo>[1]);
  // Custom title → absolute. Empty → post.title gets template suffix.
  const titleMeta = seo.customTitle ? { absolute: seo.customTitle } : post.title;
  const titleStr = seo.customTitle || `${post.title} | ${SITE_SUFFIX}`;
  const description = seo.description || post.excerpt;
  const ogImage = seo.ogImage || post.image;
  const canonical = `${SITE_URL}/blogs/${slug}`;

  return {
    title: titleMeta,
    description,
    keywords: seo.keywords,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: titleStr,
      description,
      siteName: SITE_NAME,
      publishedTime: post.date,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630, alt: titleStr }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: titleStr,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

function RecentPostsList({ recentPosts }: { recentPosts: RecentPost[] }) {
  return (
    <div className="blog-article__recent">
      <p className="blog-article__recent-title">Recent Posts</p>
      <div className="blog-article__recent-list">
        {recentPosts.map((recent) => (
          <Link
            key={recent.slug}
            href={`/blogs/${recent.slug}`}
            className="blog-article__recent-item"
          >
            <div className="blog-article__recent-img">
              {recent.image && (
                <Image
                  src={recent.image}
                  alt={recent.imageAlt || recent.title}
                  width={56}
                  height={56}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              )}
            </div>
            <div className="blog-article__recent-info">
              <p>{recent.title}</p>
              <span className="blog-article__recent-date">{recent.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, global, recentPosts]: [BlogPost | null, unknown, RecentPost[]] = await Promise.all([
    client.fetch(blogPostBySlugQuery, { slug }),
    client.fetch(seoSettingsQuery),
    client.fetch(recentPostsQuery, { slug }),
  ]);
  if (!post) notFound();

  const seo = resolveSeo(post.seo, global as Parameters<typeof resolveSeo>[1]);
  const titleStr = seo.customTitle || `${post.title} | ${SITE_SUFFIX}`;
  const description = seo.description || post.excerpt;
  const ogImage = seo.ogImage || post.image;
  const canonical = `${SITE_URL}/blogs/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: titleStr,
    description,
    url: canonical,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    ...(ogImage && { image: { "@type": "ImageObject", url: ogImage } }),
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <Header />
      <section className="blog-article-header">
        <div className="container">
          <RevealWrapper>
            <dl className="blog-article-header__meta">
              <div>
                <dt>Date</dt>
                <dd>{post.date}</dd>
              </div>
              <div>
                <dt>Category</dt>
                <dd>{post.category}</dd>
              </div>
              <div>
                <dt>Reading Time</dt>
                <dd>{post.readingTime}</dd>
              </div>
            </dl>
          </RevealWrapper>
          <RevealWrapper>
            <h1 className="blog-article-header__title">{post.title}</h1>
          </RevealWrapper>
          <RevealWrapper>
            <p className="blog-article-header__excerpt">{post.excerpt}</p>
          </RevealWrapper>
        </div>
      </section>

      <RevealWrapper>
        <div className="blog-article__hero">
          {post.image && (
            <HeroImageModal
              src={post.image}
              alt={post.imageAlt || post.title}
              width={1200}
              height={600}
              style={{ width: "100%", height: "auto", borderRadius: "var(--border-radius-lg)" }}
            />
          )}
        </div>
      </RevealWrapper>

      <div className="container">
        <div className="blog-article__layout">
          {/* Author card — mobile: below image, desktop: sidebar top (sticky with recent posts) */}
          <div className="blog-article__sidebar">
            <div className="blog-article__sidebar-inner">
              <div className="blog-article__author-card">
                <p className="blog-article__author-label">Author</p>
                <p className="blog-article__author-name">I H Professionals &amp; Co</p>
                <p className="blog-article__author-role">Registered Tax Agents</p>
              </div>
              {/* Recent posts — desktop only (inside sticky sidebar) */}
              <div className="blog-article__recent--desktop">
                <RecentPostsList recentPosts={recentPosts} />
              </div>
            </div>
          </div>

          {/* Article content */}
          <RevealWrapper>
            <article className="blog-article__body">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <PortableText value={post.content as any} components={portableTextComponents} />
            </article>
          </RevealWrapper>

          {/* Recent posts — mobile only (below content with hr) */}
          <div className="blog-article__recent--mobile">
            <hr className="blog-article__divider" />
            <RecentPostsList recentPosts={recentPosts} />
          </div>
        </div>

        <div className="blog-article__back">
          <Link href="/blogs" className="btn btn--outline blog-article__back-btn">
            &larr; Back to Blog
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
