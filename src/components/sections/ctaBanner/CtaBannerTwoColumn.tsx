import Link from "next/link";
import { normalizeHref, parseEmphasis } from "@/lib/normalizeHref";
import RevealWrapper from "@/components/ui/RevealWrapper";

type BackgroundType = "darkBlue" | "linear" | "image";

interface CtaBannerTwoColumnProps {
  heading?: string;
  text?: string;
  buttonText?: string;
  buttonHref?: string;
  backgroundType?: BackgroundType | null;
  backgroundImage?: string | null;
}

export default function CtaBannerTwoColumn({
  heading = "Ready to Reclaim Control?",
  text = "Schedule a Free Consultation with a Member of Our Team Today",
  buttonText = "Schedule a Free Consultation",
  buttonHref = "/#contact",
  backgroundType = "darkBlue",
  backgroundImage,
}: CtaBannerTwoColumnProps) {
  const bg =
    backgroundType === "linear"
      ? "linear"
      : backgroundType === "image"
        ? "image"
        : "darkBlue";
  const hasImage = bg === "image" && backgroundImage?.trim();

  return (
    <section
      className={`cta-banner cta-banner--two-column cta-banner--two-column--${bg}`}
    >
      {hasImage && (
        <>
          <div
            className="cta-banner--two-column__bg-img"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            aria-hidden
          />
          <div className="cta-banner--two-column__overlay" aria-hidden />
        </>
      )}
      <div className="container cta-banner--two-column__row">
        <div className="cta-banner--two-column__row-inner">
          <RevealWrapper className="cta-banner--two-column__reveal-col">
            <div className="cta-banner--two-column__content">
              <h2 className="cta-banner--two-column__title">
                {parseEmphasis(heading)}
              </h2>
              <p className="cta-banner--two-column__desc">{text}</p>
            </div>
          </RevealWrapper>
          <RevealWrapper
            className="cta-banner--two-column__reveal-col cta-banner--two-column__reveal-col--action"
            delay={1}
          >
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
      </div>
    </section>
  );
}
