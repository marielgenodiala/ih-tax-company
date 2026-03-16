"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { parseEmphasis, normalizeHref } from "@/lib/normalizeHref";

const PARALLAX_FACTOR = 0.4;

export interface BreadcrumbItem {
  label?: string;
  href?: string;
}

export interface HeroServicesBannerProps {
  breadcrumb?: BreadcrumbItem[] | null;
  eyebrow?: string | null;
  title?: string | null;
  description?: string | null;
  ctaPrimaryLabel?: string | null;
  ctaPrimaryHref?: string | null;
  ctaSecondaryLabel?: string | null;
  ctaSecondaryHref?: string | null;
  backgroundType?: "blue" | "image" | null;
  backgroundImage?: string | null;
}

export default function HeroServicesBanner({
  breadcrumb,
  eyebrow,
  title,
  description,
  ctaPrimaryLabel,
  ctaPrimaryHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
  backgroundType = "blue",
  backgroundImage,
}: HeroServicesBannerProps) {
  const hasBreadcrumb = Array.isArray(breadcrumb) && breadcrumb.length > 0;
  const hasEyebrow = Boolean(eyebrow?.trim());
  const hasTitle = Boolean(title?.trim());
  const hasDescription = Boolean(description?.trim());
  const hasPrimaryCta = Boolean(
    ctaPrimaryLabel?.trim() && ctaPrimaryHref?.trim(),
  );
  const hasSecondaryCta = Boolean(
    ctaSecondaryLabel?.trim() && ctaSecondaryHref?.trim(),
  );
  const hasAnyCta = hasPrimaryCta || hasSecondaryCta;
  const useImageBg =
    backgroundType === "image" && Boolean(backgroundImage?.trim());
  const parallaxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!useImageBg) return;
    const el = parallaxRef.current;
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
  }, [useImageBg]);

  return (
    <section
      className={`hero hero-banner${useImageBg ? " hero-banner--image" : ""}`}
      aria-label="Hero"
    >
      {useImageBg && (
        <div ref={parallaxRef} className="hero-banner__parallax-wrap">
          <img
            className="hero-banner__img"
            src={backgroundImage!}
            alt=""
            aria-hidden
          />
          <div className="hero-banner__img-overlay" aria-hidden />
        </div>
      )}
      <div className="hero-banner__container container">
        {hasBreadcrumb && (
          <nav className="hero-banner__breadcrumb" aria-label="Breadcrumb">
            {breadcrumb!.map((item, i) => {
              const isLast = i === breadcrumb!.length - 1;
              const rawHref = item.href?.trim();
              const label = item.label?.trim() || "";
              if (!label) return null;
              const hasLink =
                !isLast && rawHref !== undefined && rawHref !== "";
              const href = hasLink ? normalizeHref(rawHref!) : "";
              if (hasLink) {
                return (
                  <span key={i} className="hero-banner__breadcrumb-item">
                    {i > 0 && (
                      <span className="hero-banner__breadcrumb-sep">›</span>
                    )}
                    <Link href={href} className="hero-banner__breadcrumb-link">
                      {label}
                    </Link>
                  </span>
                );
              }
              return (
                <span key={i} className="hero-banner__breadcrumb-cur">
                  {i > 0 && (
                    <span className="hero-banner__breadcrumb-sep">›</span>
                  )}
                  {label}
                </span>
              );
            })}
          </nav>
        )}
        {hasEyebrow && <div className="hero-banner__eyebrow">{eyebrow}</div>}
        {hasTitle && (
          <h1 className="hero-banner__title">{parseEmphasis(title!)}</h1>
        )}
        {hasDescription && <p className="hero-banner__desc">{description}</p>}
        {hasAnyCta && (
          <div className="hero-banner__btns">
            {hasPrimaryCta && (
              <Link
                href={normalizeHref(ctaPrimaryHref!)}
                className="btn btn--white btn--arrow"
              >
                {ctaPrimaryLabel}
              </Link>
            )}
            {hasSecondaryCta && (
              <Link
                href={normalizeHref(ctaSecondaryHref!)}
                className="btn btn--outline"
                style={{ borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}
              >
                {ctaSecondaryLabel}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
