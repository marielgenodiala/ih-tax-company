import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Thank You | I H Professionals & Co.",
  description: "Thank you for contacting I H Professionals & Co.",
};

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <section className="thank-you">
        <div className="container py-20">
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
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="thank-you__title">Thank You!</h1>
            <p className="thank-you__text">
              We&apos;ve received your submission. A member of our team will be
              in touch shortly.
            </p>
            <Link href="/" className="btn btn--primary btn--arrow">
              Go Back to Homepage
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
