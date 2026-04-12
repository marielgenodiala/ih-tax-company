import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import RevealWrapper from "@/components/ui/RevealWrapper";
import { parseEmphasis } from "@/lib/normalizeHref";
import ServicesHeaderIntroPillars, { type ValuePillarItem } from "./ServicesHeaderIntroPillars";
import ServicesHeaderLeadContent, {
  type ServicesHeaderLeadChecklistItem,
} from "./ServicesHeaderLeadContent";

export interface ServicesHeaderSectionProps {
  variant?: string | null;
  sectionLabel?: string | null;
  title?: string | null;
  body?: PortableTextBlock[] | null;
  visualLabel?: string | null;
  accredBadgeTitle?: string | null;
  accredChips?: string[] | null;
  valuePillars?: ValuePillarItem[] | null;
  checklistItems?: ServicesHeaderLeadChecklistItem[] | null;
  checklistHeading?: string | null;
  checklistSubheading?: string | null;
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
    checklistItems,
    checklistHeading,
    checklistSubheading,
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

  if (variant === "leadChecklist") {
    return (
      <ServicesHeaderLeadContent
        sectionLabel={sectionLabel || undefined}
        title={title || undefined}
        body={body || undefined}
        checklistItems={checklistItems || undefined}
        checklistHeading={checklistHeading || undefined}
        checklistSubheading={checklistSubheading || undefined}
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
        <div className="services-header__content">
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
        <div className="services-header__visual-wrap">
          {hasVisual && (
            <RevealWrapper>
              <div className="services-header__visual">
                <span className="services-header__visual-label">
                  {visualLabel}
                </span>
              </div>
            </RevealWrapper>
          )}
          {hasAccred && (
            <RevealWrapper delay={hasVisual ? 1 : undefined}>
              <div className="services-header__accred">
                {hasAccredTitle && (
                  <div className="services-header__accred-top">
                    {accredBadgeTitle}
                  </div>
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
            </RevealWrapper>
          )}
        </div>
      </div>
    </section>
  );
}
