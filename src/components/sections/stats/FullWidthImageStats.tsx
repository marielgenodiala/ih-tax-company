"use client";

import RevealWrapper from "@/components/ui/RevealWrapper";
import { CountUpNumber } from "./Default";

export interface FullWidthStatItem {
  _key?: string;
  number?: string;
  label?: string; 
}

export interface FullWidthImageStatsProps {
  backgroundImage?: string | null;
  title?: string | null;
  body?: string | null;
  stats?: FullWidthStatItem[] | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
}

function renderTitle(title?: string | null) {
  const raw = title?.trim();
  if (!raw) return null;

  // If title contains *emphasised* text, split into two lines:
  // before → normal, after → blue italic on next line.
  const match = raw.match(/^(.*)\*(.+?)\*(.*)$/);
  if (!match) {
    return <h2 className="img-strip__title">{raw}</h2>;
  }

  const before = match[1]?.trim() ?? "";
  const emphasized = match[2]?.trim() ?? "";

  return (
    <h2 className="img-strip__title">
      {before}
      {before && <br />}
      {emphasized && <em>{emphasized}</em>}
    </h2>
  );
}

export default function FullWidthImageStats({
  backgroundImage,
  title,
  body,
  stats,
  ctaLabel,
  ctaHref,
}: FullWidthImageStatsProps) {
  const items = Array.isArray(stats) && stats.length > 0 ? stats : [];
  const hasBody = Boolean(body?.trim());
  const resolvedCtaLabel = ctaLabel?.trim() || "Contact Us";
  const resolvedCtaHref = ctaHref?.trim() || "/contact-us";
  const showCta = items.length === 0;

  return (
    <section className="img-strip">
      {backgroundImage && (
        <img src={backgroundImage} alt="" className="img-strip__bg" />
      )}
      <div className="img-strip__overlay" />
      <div className="img-strip__content">
        <div className="img-strip__inner container">
          <div className="img-strip__text">
            {title?.trim() && <RevealWrapper>{renderTitle(title)}</RevealWrapper>}
            {hasBody && (
              <RevealWrapper delay={title?.trim() ? 1 : undefined}>
                <p className="img-strip__body">{body}</p>
              </RevealWrapper>
            )}
          </div>
          <div className={`img-strip__stats${showCta ? " img-strip__stats--cta-only" : ""}`}>
            {items.length > 0
              ? items.map((item, i) => (
                  <RevealWrapper
                    key={item._key ?? i}
                    delay={(i + 1) as 1 | 2 | 3 | 4}
                  >
                    <div className="img-strip__stat">
                      {item.number && (
                        <div className="img-strip__stat-number">
                          <CountUpNumber value={item.number} />
                        </div>
                      )}
                      {item.label && (
                        <div className="img-strip__stat-label">{item.label}</div>
                      )}
                    </div>
                  </RevealWrapper>
                ))
              : showCta && (
                  <>
                    <div className="img-strip__cta-spacer" aria-hidden />
                    <RevealWrapper delay={1}>
                      <a
                        href={resolvedCtaHref}
                        className="img-strip__stat img-strip__stat--cta"
                      >
                        <span className="img-strip__cta-text">{resolvedCtaLabel}</span>
                        <svg
                          aria-hidden
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    </RevealWrapper>
                  </>
                )}
          </div>
        </div>
      </div>
    </section>
  );
}

