import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { client } from "@/sanity/lib/client";
import { navigationV2Query, footerV2Query } from "@/sanity/lib/queries";

export default async function NotFound() {
  const [navSection, footerSection] = await Promise.all([
    client.fetch(navigationV2Query),
    client.fetch(footerV2Query),
  ]);

  return (
    <>
      <div className="thank-you-wrapper">
        <Header navSection={navSection ?? undefined} />
        <section className="thank-you">
          <div className="container">
            <div className="thank-you__card">
              <div className="thank-you__icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <h1 className="thank-you__title">Page Not Found</h1>
              <p className="thank-you__text">
                Sorry, the page you&apos;re looking for doesn&apos;t exist or has
                been moved.
              </p>
              <Link href="/" className="btn btn--primary btn--arrow">
                Go Back to Homepage
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer footerSection={footerSection ?? undefined} />
    </>
  );
}
