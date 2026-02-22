import Image from "next/image";
import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";
import { client } from "@/sanity/lib/client";
import { allBlogPostsQuery, latestBlogPostsQuery } from "@/sanity/lib/queries";
import { parseEmphasis } from "@/lib/normalizeHref";

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

interface BlogPreviewProps {
  subtitle?: string;
  title?: string;
  description?: string;
  useBlogList?: boolean;
  alignLeft?: boolean;
}

export default async function BlogPreview({
  subtitle,
  title,
  description,
  useBlogList = true,
  alignLeft = false,
}: BlogPreviewProps) {
  const query = alignLeft ? allBlogPostsQuery : latestBlogPostsQuery;
  const posts: BlogPost[] = useBlogList
    ? await client.fetch(query)
    : [];

  const hasHeader = subtitle || title || description;

  return (
    <section className="section blog-preview">
      <div className="container">
        {hasHeader && (
          <RevealWrapper>
            <div className={`section__header${alignLeft ? " section__header--left" : ""}`}>
              {subtitle && <span className="section-label">{subtitle}</span>}
              {title && <h2>{parseEmphasis(title)}</h2>}
              {description && <p>{description}</p>}
            </div>
          </RevealWrapper>
        )}
        {posts.length > 0 && (
          <>
            <div className="grid grid--3">
              {posts.map((post, i) => (
                <RevealWrapper key={post.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
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
            {!alignLeft && (
              <RevealWrapper>
                <div className="blog-preview__cta">
                  <Link href="/blogs" className="btn btn--outline">
                    View All Posts
                  </Link>
                </div>
              </RevealWrapper>
            )}
          </>
        )}
      </div>
    </section>
  );
}
