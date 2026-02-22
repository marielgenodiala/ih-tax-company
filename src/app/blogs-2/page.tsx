import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { allBlogPostsQuery } from "@/sanity/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog | I H Professionals & Co.",
  description:
    "Tax tips, accounting insights, and business updates from I H Professionals & Co.",
};

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

  return (
    <>
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
