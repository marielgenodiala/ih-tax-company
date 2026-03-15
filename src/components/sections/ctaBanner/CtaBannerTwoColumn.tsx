import Link from "next/link";
import { normalizeHref, parseEmphasis } from "@/lib/normalizeHref";
import RevealWrapper from "@/components/ui/RevealWrapper";

interface CtaBannerTwoColumnProps {
  heading?: string;
  text?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CtaBannerTwoColumn({
  heading = "Ready to Reclaim Control?",
  text = "Schedule a Free Consultation with a Member of Our Team Today",
  buttonText = "Schedule a Free Consultation",
  buttonHref = "/#contact",
}: CtaBannerTwoColumnProps) {
  return (
    <section className="cta-banner cta-banner--two-column">
      <div className="container cta-banner--two-column__row">
        <RevealWrapper className="cta-banner--two-column__row-inner">
          <div className="cta-banner--two-column__content">
            <h2 className="cta-banner--two-column__title">
              {parseEmphasis(heading)}
            </h2>
            <p className="cta-banner--two-column__desc">{text}</p>
          </div>
          <div className="cta-banner--two-column__action">
            <Link
              href={normalizeHref(buttonHref)}
              className="btn btn--white btn--arrow"
            >
              {buttonText}
            </Link>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
