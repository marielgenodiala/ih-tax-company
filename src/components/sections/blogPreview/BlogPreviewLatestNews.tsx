import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { latestFourBlogPostsQuery } from "@/sanity/lib/queries";
import { parseEmphasis } from "@/lib/normalizeHref";
import RevealWrapper from "@/components/ui/RevealWrapper";

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

interface BlogPreviewLatestNewsProps {
  title?: string;
  viewAllLabel?: string;
  useBlogList?: boolean;
}

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default async function BlogPreviewLatestNews({
  title = "The Latest News",
  viewAllLabel = "View All Blogs",
  useBlogList = true,
}: BlogPreviewLatestNewsProps) {
  const posts: BlogPost[] = useBlogList
    ? await client.fetch(latestFourBlogPostsQuery)
    : [];

  if (posts.length === 0) return null;

  const featured = posts[0];
  const topRight = posts[1];
  const bottomLeft = posts[2];
  const bottomRight = posts[3];

  return (
    <section className="blog-preview blog-preview--latest-news section--light">
      <div className="blog-preview-ln__inner container">
        <RevealWrapper>
          <div className="blog-preview-ln__header-row">
            <div className="blog-preview-ln__heading">
              <h2 className="blog-preview-ln__title">{parseEmphasis(title)}</h2>
            </div>
            <div className="blog-preview-ln__cta blog-preview-ln__cta--header">
              <Link href="/blogs" className="btn btn--outline">
                {viewAllLabel}
              </Link>
            </div>
          </div>

          <div
            className={`blog-preview-ln__grid${!topRight ? " blog-preview-ln__grid--featured-only" : ""}`}
          >
            {/* Featured (left) */}
            <Link
              href={`/blogs/${featured.slug}`}
              className="blog-preview-ln__featured"
            >
              <div className="blog-preview-ln__feat-img-wrap">
                {featured.image && (
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt || featured.title}
                    fill
                    sizes="(min-width: 1024px) 740px, 100vw"
                    className="blog-preview-ln__feat-img"
                  />
                )}
              </div>
              <div className="blog-preview-ln__feat-overlay" aria-hidden />
              <div className="blog-preview-ln__feat-caption">
                {featured.category && (
                  <span className="blog-preview-ln__feat-category">
                    {featured.category}
                  </span>
                )}
                <h3 className="blog-preview-ln__feat-title">{featured.title}</h3>
                <span className="blog-preview-ln__feat-rule" aria-hidden />
                <span className="blog-preview-ln__feat-date">
                  {formatDate(featured.date)}
                </span>
              </div>
            </Link>

            {/* Right column — only when we have at least 2 posts */}
            {topRight && (
              <div className="blog-preview-ln__right">
                <Link
                  href={`/blogs/${topRight.slug}`}
                  className="blog-preview-ln__side-card blog-preview-ln__side-card--top"
                >
                  <div className="blog-preview-ln__side-img-wrap">
                    {topRight.image && (
                      <Image
                        src={topRight.image}
                        alt={topRight.imageAlt || topRight.title}
                        fill
                        sizes="(min-width: 1024px) 420px, 100vw"
                        className="blog-preview-ln__side-img"
                      />
                    )}
                  </div>
                  <div className="blog-preview-ln__side-overlay" aria-hidden />
                  <div className="blog-preview-ln__side-caption">
                    {topRight.category && (
                      <span className="blog-preview-ln__sc-cat">
                        {topRight.category}
                      </span>
                    )}
                    <h4 className="blog-preview-ln__side-title">
                      {topRight.title}
                    </h4>
                    <span className="blog-preview-ln__side-rule" aria-hidden />
                  </div>
                </Link>

                {(bottomLeft || bottomRight) && (
                  <div className="blog-preview-ln__side-bottom">
                    {bottomLeft && (
                      <Link
                        href={`/blogs/${bottomLeft.slug}`}
                        className="blog-preview-ln__side-card"
                      >
                        <div className="blog-preview-ln__side-img-wrap">
                          {bottomLeft.image && (
                            <Image
                              src={bottomLeft.image}
                              alt={bottomLeft.imageAlt || bottomLeft.title}
                              fill
                              sizes="(min-width: 1024px) 207px, 50vw"
                              className="blog-preview-ln__side-img"
                            />
                          )}
                        </div>
                        <div
                          className="blog-preview-ln__side-overlay"
                          aria-hidden
                        />
                        <div className="blog-preview-ln__side-caption">
                          {bottomLeft.category && (
                            <span className="blog-preview-ln__sc-cat">
                              {bottomLeft.category}
                            </span>
                          )}
                          <h4 className="blog-preview-ln__side-title">
                            {bottomLeft.title}
                          </h4>
                          <span
                            className="blog-preview-ln__side-rule"
                            aria-hidden
                          />
                        </div>
                      </Link>
                    )}
                    {bottomRight && (
                      <Link
                        href={`/blogs/${bottomRight.slug}`}
                        className="blog-preview-ln__side-card"
                      >
                        <div className="blog-preview-ln__side-img-wrap">
                          {bottomRight.image && (
                            <Image
                              src={bottomRight.image}
                              alt={bottomRight.imageAlt || bottomRight.title}
                              fill
                              sizes="(min-width: 1024px) 207px, 50vw"
                              className="blog-preview-ln__side-img"
                            />
                          )}
                        </div>
                        <div
                          className="blog-preview-ln__side-overlay"
                          aria-hidden
                        />
                        <div className="blog-preview-ln__side-caption">
                          {bottomRight.category && (
                            <span className="blog-preview-ln__sc-cat">
                              {bottomRight.category}
                            </span>
                          )}
                          <h4 className="blog-preview-ln__side-title">
                            {bottomRight.title}
                          </h4>
                          <span
                            className="blog-preview-ln__side-rule"
                            aria-hidden
                          />
                        </div>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
