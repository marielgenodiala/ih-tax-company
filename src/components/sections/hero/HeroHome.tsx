import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { parseEmphasis, normalizeHref } from "@/lib/normalizeHref";

export interface HeroHomeProps {
  subtitle?: string;
  title?: string;
  description?: string;
  backgroundImage?: { asset?: { _ref: string } };
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}

export default function HeroHome({
  subtitle,
  title,
  description,
  backgroundImage,
  ctaPrimaryLabel = "Book a Consultation",
  ctaPrimaryHref = "/book-online",
  ctaSecondaryLabel = "Our Services",
  ctaSecondaryHref = "#services",
}: HeroHomeProps = {}) {
  const bgUrl = backgroundImage?.asset?._ref
    ? urlFor(backgroundImage).width(1920).url()
    : "/images/heroImage.avif";

  return (
    <section className="hero " style={{ backgroundImage: `url('${bgUrl}')` }}>
      <div className="hero__overlay"></div>
      <div className="container hero__content !px-4 lg:!px-20">
        <p className="hero__subtitle">
          {subtitle ||
            "Registered Tax Agent \u00B7 Business Consultant \u00B7 Sydney NSW"}
        </p>
        <h1 className="hero__title max-w-3xl">
          {title ? (
            parseEmphasis(title)
          ) : (
            <>
              Feel the <em>I H Professionals</em>
              <br />
              Difference
            </>
          )}
        </h1>
        <p className="hero__text">
          {description ||
            "The care your accounting needs. We provide unparalleled personalised accounting services to individuals and businesses across Australia."}
        </p>
        <div className="hero__cta-group">
          <Link
            href={normalizeHref(ctaPrimaryHref)}
            className="btn btn--primary btn--arrow"
          >
            {ctaPrimaryLabel}
          </Link>
          <Link
            href={normalizeHref(ctaSecondaryHref)}
            className="btn btn--outline"
            style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}
          >
            {ctaSecondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
