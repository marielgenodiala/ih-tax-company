import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import RevealWrapper from "@/components/ui/RevealWrapper";
import { parseEmphasis } from "@/lib/normalizeHref";

export interface ServicesHeaderLeadChecklistItem {
  _key?: string;
  title?: string | null;
  description?: string | null;
}

export interface ServicesHeaderLeadProps {
  sectionLabel?: string | null;
  title?: string | null;
  body?: PortableTextBlock[] | null;
  checklistItems?: ServicesHeaderLeadChecklistItem[] | null;
  checklistHeading?: string | null;
  checklistSubheading?: string | null;
}

const leadBodyComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="service-lead__p">{children}</p>
    ),
    // treat blockquote style as the highlighted callout block
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <div className="service-lead__callout">
        <p className="service-lead__callout-body">{children}</p>
      </div>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong>{children}</strong>
    ),
  },
};

export default function ServicesHeaderLeadContent({
  sectionLabel,
  title,
  body,
  checklistItems,
  checklistHeading,
  checklistSubheading,
}: ServicesHeaderLeadProps) {
  const hasLabel = Boolean(sectionLabel?.trim());
  const hasTitle = Boolean(title?.trim());
  const hasBody = Array.isArray(body) && body.length > 0;
  const items = Array.isArray(checklistItems) ? checklistItems : [];

  return (
    <section className="lead">
      <div className="container">
        <RevealWrapper>
          <div className="w">
            <div className="lead-text">
              {hasLabel && <div className="lbl">{sectionLabel}</div>}
              {hasTitle && <h2>{parseEmphasis(title as string)}</h2>}
              {hasBody && (
                <div className="lead-text__body">
                  <PortableText
                    value={body as PortableTextBlock[]}
                    components={leadBodyComponents}
                  />
                </div>
              )}
            </div>
            <div className="incl-box">
              <div className="incl-box-header">
                <h3>{checklistHeading}</h3>
                {checklistSubheading && <p>{checklistSubheading}</p>}
              </div>
              <ul className="incl-list">
                {items.map((item, i) => {
                  if (!item?.title?.trim() && !item?.description?.trim())
                    return null;
                  return (
                    <li key={item._key ?? i}>
                      <span className="ck">
                        <svg viewBox="0 0 24 24" aria-hidden>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <div>
                        {item.title && <strong>{item.title}</strong>}
                        {item.description && <span>{item.description}</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
