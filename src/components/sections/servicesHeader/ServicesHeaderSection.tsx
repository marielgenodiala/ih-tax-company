import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import RevealWrapper from "@/components/ui/RevealWrapper";
import { parseEmphasis } from "@/lib/normalizeHref";
import ServicesHeaderIntroPillars, { type ValuePillarItem } from "./ServicesHeaderIntroPillars";

export interface ServicesHeaderSectionProps {
  variant?: string | null;
  sectionLabel?: string | null;
  title?: string | null;
  body?: PortableTextBlock[] | null;
  visualLabel?: string | null;
  accredBadgeTitle?: string | null;
  accredChips?: string[] | null;
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

export default function ServicesHeaderSection(props: ServicesHeaderSectionProps) {
  const {
    variant = "default",
    sectionLabel,
    title,
    body,
    visualLabel,
    accredBadgeTitle,
    accredChips,
    valuePillars,
  } = props;

  if (variant === "introWithPillars") {
    return (
      <ServicesHeaderIntroPillars
        sectionLabel={sectionLabel}
        title={title}
        body={body}
        valuePillars={valuePillars}
      />
    );
  }

  const hasLabel = Boolean(sectionLabel?.trim());
  const hasTitle = Boolean(title?.trim());
  const hasBody = Array.isArray(body) && body.length > 0;
  const hasVisual = Boolean(visualLabel?.trim());
  const hasAccredTitle = Boolean(accredBadgeTitle?.trim());
  const hasAccredChips = Array.isArray(accredChips) && accredChips.length > 0;
  const hasAccred = hasAccredTitle || hasAccredChips;

  return (
    <section className="services-header">
      <div className="services-header__container container">
        <RevealWrapper>
          <div className="services-header__content">
            {hasLabel && (
              <div className="services-header__label">{sectionLabel}</div>
            )}
            {hasTitle && (
              <h2 className="services-header__title">{parseEmphasis(title!)}</h2>
            )}
            {hasBody && (
              <div className="services-header__body">
                <PortableText value={body as PortableTextBlock[]} components={bodyComponents} />
              </div>
            )}
          </div>
        </RevealWrapper>
        <RevealWrapper delay={2}>
          <div className="services-header__visual-wrap">
            {hasVisual && (
              <div className="services-header__visual">
                <span className="services-header__visual-label">{visualLabel}</span>
              </div>
            )}
            {hasAccred && (
              <div className="services-header__accred">
                {hasAccredTitle && (
                  <div className="services-header__accred-top">{accredBadgeTitle}</div>
                )}
                {hasAccredChips && (
                  <div className="services-header__accred-chips">
                    {accredChips!.map((chip, i) => (
                      <span key={i} className="services-header__chip">
                        {chip}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
