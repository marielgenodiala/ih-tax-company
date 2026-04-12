import RevealWrapper from "@/components/ui/RevealWrapper";
import { parseEmphasis } from "@/lib/normalizeHref";

export interface ServicesWhoWeServeProps {
  subtitle?: string | null;
  title?: string | null;
  description?: string | null;
  industryItems?: string[] | null;
  hasBackground?: boolean | null;
}

export default function ServicesWhoWeServe({
  subtitle,
  title,
  description,
  industryItems,
  hasBackground = false,
}: ServicesWhoWeServeProps) {
  const hasSubtitle = Boolean(subtitle?.trim());
  const hasTitle = Boolean(title?.trim());
  const hasDescription = Boolean(description?.trim());
  const hasItems = Array.isArray(industryItems) && industryItems.length > 0;

  return (
    <section
      className={`services-who-we-serve${hasBackground ? " services-who-we-serve--with-bg" : ""}`}
    >
      <div className="services-who-we-serve__container container">
        {(hasSubtitle || hasTitle || hasDescription) && (
          <div className="services-who-we-serve__header">
            {hasSubtitle && (
              <RevealWrapper>
                <div className="services-who-we-serve__label">{subtitle}</div>
              </RevealWrapper>
            )}
            {hasTitle && (
              <RevealWrapper delay={hasSubtitle ? 1 : undefined}>
                <h2 className="services-who-we-serve__title">
                  {parseEmphasis(title!)}
                </h2>
              </RevealWrapper>
            )}
            {hasDescription && (
              <RevealWrapper
                delay={
                  hasSubtitle && hasTitle ? 2 : hasSubtitle || hasTitle ? 1 : undefined
                }
              >
                <p className="services-who-we-serve__desc">{description}</p>
              </RevealWrapper>
            )}
          </div>
        )}
        {hasItems && (
          <div className="services-who-we-serve__grid">
            {industryItems!.map((name, i) => (
              <RevealWrapper key={i} delay={((i % 4) + 1) as 1 | 2 | 3}>
                <div className="services-who-we-serve__item">
                  <span className="services-who-we-serve__dot" aria-hidden />
                  {name}
                </div>
              </RevealWrapper>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
