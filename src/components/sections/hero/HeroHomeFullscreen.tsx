"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { parseEmphasis, normalizeHref } from "@/lib/normalizeHref";

const SWIPE_INTERVAL_MS = 5000;

export interface HeroHomeFullscreenProps {
  subtitle?: string;
  title?: string;
  description?: string;
  /** Array of Sanity image refs; used as auto-swiping background. */
  backgroundImages?: Array<{ asset?: { _ref: string } }>;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}

function parseImages(
  backgroundImages: HeroHomeFullscreenProps["backgroundImages"],
): string[] {
  if (!Array.isArray(backgroundImages) || backgroundImages.length === 0)
    return ["/images/heroImage.avif"];
  return backgroundImages
    .filter((img) => img?.asset?._ref)
    .map((img) => urlFor(img).width(1920).url());
}

export default function HeroHomeFullscreen({
  subtitle,
  title,
  description,
  backgroundImages,
  ctaPrimaryLabel = "Book a Consultation",
  ctaPrimaryHref = "/book-online",
  ctaSecondaryLabel = "Our Services",
  ctaSecondaryHref = "#services",
}: HeroHomeFullscreenProps = {}) {
  const urls = useMemo(() => parseImages(backgroundImages), [backgroundImages]);
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const goToSlide = useCallback(
    (i: number) => {
      setIndex(i % urls.length);
    },
    [urls.length],
  );

  useEffect(() => {
    if (urls.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % urls.length);
    }, SWIPE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [urls.length]);

  const scrollToNextSection = useCallback(() => {
    const section = sectionRef.current;
    if (!section?.nextElementSibling) return;
    const next = section.nextElementSibling as HTMLElement;
    let navHeight = 80;
    if (typeof document !== "undefined") {
      const raw = getComputedStyle(document.documentElement)
        .getPropertyValue("--nav-sticky-height")
        .trim();
      if (raw) navHeight = parseFloat(raw) || 80;
    }
    const top = next.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero hero--fullscreen"
      aria-label="Hero"
    >
      <div className="hero__bg-carousel" aria-hidden>
        {urls.map((url, i) => (
          <div
            key={url + i}
            className="hero__bg-slide"
            style={{
              backgroundImage: `url('${url}')`,
              opacity: i === index ? 1 : 0,
            }}
          />
        ))}
      </div>
      <div className="hero__overlay" aria-hidden />
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
            className="btn btn--white btn--arrow"
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
        {urls.length > 1 && (
          <div
            className="hero__pagination"
            role="tablist"
            aria-label="Background image"
          >
            {urls.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Go to image ${i + 1}`}
                className={`hero__pagination-dot${i === index ? " hero__pagination-dot--active" : ""}`}
                onClick={() => goToSlide(i)}
              />
            ))}
          </div>
        )}
      </div>
      <button
        type="button"
        className="hero__scroll-down"
        onClick={scrollToNextSection}
        aria-label="Scroll to next section"
      >
        <span className="hero__scroll-down-arrow" aria-hidden>
          <svg
            width="28"
            height="28"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="24,29.172 9.414,14.586 6.586,17.414 24,34.828 41.414,17.414 38.586,14.586"
              fill="currentColor"
            />
          </svg>
        </span>
      </button>
    </section>
  );
}
