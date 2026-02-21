import Image from "next/image";
import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";

const previewPosts = [
  {
    slug: "useful-links",
    image: "/images/blogs/useful-links.avif",
    alt: "Useful links",
    date: "5 Jan 2025",
    readTime: "2 min read",
    title: "Useful Links",
    excerpt:
      "ABN Lookup, ASIC Registers, and other essential resources for businesses and individuals.",
  },
  {
    slug: "nsw-covid-19-support",
    image: "/images/blogs/NSW COVID-19.avif",
    alt: "NSW COVID-19 Support",
    date: "22 Jul 2021",
    readTime: "3 min read",
    title: "NSW COVID-19 Support Packages",
    excerpt:
      "NSW COVID Support Packages considering the most recent Covid-19 lockdowns impacting Greater Sydney.",
  },
  {
    slug: "nsw-flood-disaster-recovery",
    image: "/images/blogs/NSW Governments Flood.avif",
    alt: "Flood disaster recovery grant",
    date: "4 May 2021",
    readTime: "2 min read",
    title: "NSW Flood Disaster Recovery Small Business Grant",
    excerpt:
      "If the recent NSW floods have directly impacted your business, you may be eligible for this grant.",
  },
];

export default function BlogPreview() {
  return (
    <section className="section blog-preview">
      <div className="container">
        <RevealWrapper>
          <div className="section__header">
            <span className="section-label">Latest Insights</span>
            <h2>From Our Blog</h2>
            <p>Stay informed with the latest tax tips and business updates.</p>
          </div>
        </RevealWrapper>
        <div className="grid grid--3">
          {previewPosts.map((post, i) => (
            <RevealWrapper key={post.slug} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <article className="blog-card">
                <div className="blog-card__image">
                  <Image
                    src={post.image}
                    alt={post.alt}
                    width={400}
                    height={250}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="blog-card__content">
                  <div className="blog-card__meta">
                    <span className="blog-card__date">{post.date}</span>
                    <span className="blog-card__read-time">{post.readTime}</span>
                  </div>
                  <h3 className="blog-card__title">
                    <Link href={`/blogs/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <p className="blog-card__author">I H Professionals &amp; Co</p>
                </div>
              </article>
            </RevealWrapper>
          ))}
        </div>
        <RevealWrapper>
          <div className="blog-preview__cta">
            <Link href="/blogs" className="btn btn--outline">
              View All Posts
            </Link>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
