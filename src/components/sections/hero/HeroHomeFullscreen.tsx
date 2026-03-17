"use client";

import { useState, useEffect, useLayoutEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { parseEmphasis, normalizeHref } from "@/lib/normalizeHref";

const PARALLAX_FACTOR = 0.4;

const SWIPE_INTERVAL_MS = 5000;

export interface HeroHomeFullscreenProps {
  subtitle?: string;
  title?: string;
  description?: string;
  /** Array of image URLs (from GROQ asset->url) or Sanity image refs; used as auto-swiping background. */
  backgroundImages?: (string | { asset?: { _ref: string } })[];
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
  const urls = backgroundImages
    .map((img) => {
      if (typeof img === "string" && img) return img;
      if (
        img &&
        typeof img === "object" &&
        (img as { asset?: { _ref: string } }).asset?._ref
      )
        return urlFor(img as { asset: { _ref: string } })
          .width(1920)
          .url();
      return null;
    })
    .filter((url): url is string => url != null);
  return urls.length > 0 ? urls : ["/images/heroImage.avif"];
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
  const bgCarouselRef = useRef<HTMLDivElement>(null);

  const goToSlide = useCallback(
    (i: number) => {
      setIndex(i % urls.length);
    },
    [urls.length],
  );

  // Preload hero background images so they load immediately
  useEffect(() => {
    const links: HTMLLinkElement[] = [];
    urls.slice(0, 2).forEach((url) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = url;
      document.head.appendChild(link);
      links.push(link);
    });
    return () => {
      links.forEach((link) => {
        if (link.parentNode === document.head) document.head.removeChild(link);
      });
    };
  }, [urls]);

  useEffect(() => {
    if (urls.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % urls.length);
    }, SWIPE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [urls.length]);

  useLayoutEffect(() => {
    const el = bgCarouselRef.current;
    if (!el) return;
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY * PARALLAX_FACTOR;
        el.style.transform = `translate3d(0, ${y}px, 0)`;
        rafId = null;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, []);

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
      <div ref={bgCarouselRef} className="hero__bg-carousel" aria-hidden>
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
        <p className="hero__text">{description}</p>
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
