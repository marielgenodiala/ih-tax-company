import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Blog | I H Professionals & Co.",
  description:
    "Tax tips, accounting insights, and business updates from I H Professionals & Co.",
};

const blogPosts = [
  {
    slug: "useful-links",
    image: "/images/blogs/useful-links.avif",
    alt: "Useful links",
    date: "5 Jan 2025",
    readTime: "2 min read",
    title: "Useful Links",
    excerpt:
      "ABN Lookup, ASIC Registers, and other essential resources for businesses and individuals to manage their obligations.",
  },
  {
    slug: "nsw-covid-19-support",
    image: "/images/blogs/NSW COVID-19.avif",
    alt: "NSW COVID-19 Support",
    date: "22 Jul 2021",
    readTime: "3 min read",
    title: "July 2021: NSW COVID-19 Support Packages",
    excerpt:
      "Considering the most recent Covid-19 lockdowns impacting Greater Sydney, the NSW and Commonwealth Governments announced support packages.",
  },
  {
    slug: "nsw-flood-disaster-recovery",
    image: "/images/blogs/NSW Governments Flood.avif",
    alt: "Flood disaster recovery",
    date: "4 May 2021",
    readTime: "2 min read",
    title: "NSW Government\u2019s Flood Disaster Recovery Small Business Grant",
    excerpt:
      "If the recent NSW floods and storms have directly impacted your business, you may be eligible for a grant of up to $50,000.",
  },
  {
    slug: "nsw-small-business-fees",
    image: "/images/blogs/NSW Small Business Fees.avif",
    alt: "Small business fees rebate",
    date: "20 Apr 2021",
    readTime: "4 min read",
    title: "NSW Small Business Fees and Charges Rebate",
    excerpt:
      "The NSW Government is providing a Small Business Fees and Charges Rebate to help small businesses with the cost of government fees and charges.",
  },
  {
    slug: "nsw-business-events-grant",
    image: "/images/blogs/NSW Business Events Grant Opportunity.avif",
    alt: "Business events grant",
    date: "25 Mar 2021",
    readTime: "3 min read",
    title: "NSW Business Events Grant Opportunity",
    excerpt:
      "The Australian Government has recently came up with a new program to further support industries negatively impacted by the COVID-19 pandemic.",
  },
  {
    slug: "nsw-homebuilder-grant",
    image: "/images/blogs/What You Need to Know.avif",
    alt: "HomeBuilder grant extension",
    date: "11 Feb 2021",
    readTime: "2 min read",
    title: "What You Need to Know about the NSW HomeBuilder Grant Extension?",
    excerpt:
      "On 29 November 2020, the Australian Government announced an extension to the HomeBuilder program to 31 March 2021.",
  },
];

export default function BlogsPage() {
  return (
    <>
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
