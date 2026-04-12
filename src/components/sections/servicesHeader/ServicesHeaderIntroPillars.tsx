import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import RevealWrapper from "@/components/ui/RevealWrapper";
import { parseEmphasis } from "@/lib/normalizeHref";

const pillarIcons: Record<string, React.ReactNode> = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  lightbulb: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
};

export interface ValuePillarItem {
  _key?: string;
  iconKey?: string | null;
  title?: string | null;
  description?: string | null;
}

export interface ServicesHeaderIntroPillarsProps {
  sectionLabel?: string | null;
  title?: string | null;
  body?: PortableTextBlock[] | null;
  valuePillars?: ValuePillarItem[] | null;
}

const bodyComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="services-header__p">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong>{children}</strong>,
  },
};

export default function ServicesHeaderIntroPillars({
  sectionLabel,
  title,
  body,
  valuePillars,
}: ServicesHeaderIntroPillarsProps) {
  const hasLabel = Boolean(sectionLabel?.trim());
  const hasTitle = Boolean(title?.trim());
  const hasBody = Array.isArray(body) && body.length > 0;
  const hasPillars = Array.isArray(valuePillars) && valuePillars.length > 0;

  return (
    <section className="services-header services-header--intro">
      <div className="services-header__container container">
        <div className="services-header__content services-header__content--intro">
          {hasLabel && (
            <RevealWrapper>
              <div className="services-header__label">{sectionLabel}</div>
            </RevealWrapper>
          )}
          {hasTitle && (
            <RevealWrapper delay={hasLabel ? 1 : undefined}>
              <h2 className="services-header__title">{parseEmphasis(title!)}</h2>
            </RevealWrapper>
          )}
          {hasBody && (
            <RevealWrapper
              delay={
                hasLabel && hasTitle ? 2 : hasLabel || hasTitle ? 1 : undefined
              }
            >
              <div className="services-header__body">
                <PortableText
                  value={body as PortableTextBlock[]}
                  components={bodyComponents}
                />
              </div>
            </RevealWrapper>
          )}
        </div>
        {hasPillars && (
          <div className="services-header__pillars">
            {valuePillars.map((pillar, i) => (
              <RevealWrapper
                key={pillar._key ?? i}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              >
                <div className="services-header__pillar">
                  <div className="services-header__pillar-icon">
                    {pillar.iconKey && pillarIcons[pillar.iconKey]
                      ? pillarIcons[pillar.iconKey]
                      : pillarIcons.shield}
                  </div>
                  <div>
                    {pillar.title && (
                      <h4 className="services-header__pillar-title">
                        {pillar.title}
                      </h4>
                    )}
                    {pillar.description && (
                      <p className="services-header__pillar-desc">
                        {pillar.description}
                      </p>
                    )}
                  </div>
                </div>
              </RevealWrapper>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
