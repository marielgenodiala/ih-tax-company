import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost, getRecentPosts } from "@/data/blog-posts";
import RevealWrapper from "@/components/ui/RevealWrapper";
import Footer from "@/components/layout/Footer";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | I H Professionals & Co.`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const recentPosts = getRecentPosts(slug);

  return (
    <>
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
          <Image
            src={post.image}
            alt={post.imageAlt}
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto", borderRadius: "var(--border-radius-lg)" }}
          />
        </div>
      </RevealWrapper>

      <div className="container">
        <div className="blog-article__layout">
          <RevealWrapper>
            <article className="blog-article__body">
              {post.content}

              <div className="blog-article__back">
                <Link href="/blogs" className="btn btn--outline">
                  &larr; Back to Blog
                </Link>
              </div>
            </article>
          </RevealWrapper>

          <aside className="blog-article__sidebar">
            <div className="blog-article__sidebar-inner">
              <div className="blog-article__author-card">
                <p className="blog-article__author-label">Author</p>
                <p className="blog-article__author-name">I H Professionals &amp; Co</p>
                <p className="blog-article__author-role">Registered Tax Agents</p>
              </div>
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
                        <Image
                          src={recent.image}
                          alt={recent.imageAlt}
                          width={56}
                          height={56}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div className="blog-article__recent-info">
                        <p>{recent.title}</p>
                        <span className="blog-article__recent-date">{recent.date}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
}
