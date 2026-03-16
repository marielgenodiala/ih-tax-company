import Link from "next/link";
import { parseEmphasis, normalizeHref } from "@/lib/normalizeHref";

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

  return (
    <section className="hero hero-banner" aria-label="Hero">
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
