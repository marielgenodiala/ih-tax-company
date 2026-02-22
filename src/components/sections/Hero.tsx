import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { parseEmphasis } from "@/lib/normalizeHref";

interface HeroProps {
  subtitle?: string;
  title?: string;
  description?: string;
  backgroundImage?: { asset?: { _ref: string } };
}

export default function Hero({
  subtitle,
  title,
  description,
  backgroundImage,
}: HeroProps = {}) {
  const bgUrl = backgroundImage?.asset?._ref
    ? urlFor(backgroundImage).width(1920).url()
    : "/images/heroImage.avif";

  return (
    <section
      className="hero "
      style={{ backgroundImage: `url('${bgUrl}')` }}
    >
      <div className="hero__overlay"></div>
      <div className="container hero__content !px-4 lg:!px-20">
        <p className="hero__subtitle">
          {subtitle || "Registered Tax Agent \u00B7 Business Consultant \u00B7 Sydney NSW"}
        </p>
        <h1 className="hero__title max-w-3xl" >
          {title ? parseEmphasis(title) : (
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
          <Link href="/book-online" className="btn btn--primary btn--arrow">
            Book a Consultation
          </Link>
          <Link
            href="#services"
            className="btn btn--outline"
            style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}
          >
            Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
