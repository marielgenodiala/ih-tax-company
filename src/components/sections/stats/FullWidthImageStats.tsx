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
}: FullWidthImageStatsProps) {
  const items = Array.isArray(stats) && stats.length > 0 ? stats : [];
  const hasBody = Boolean(body?.trim());

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
          <div className="img-strip__stats">
            {items.map((item, i) => (
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

