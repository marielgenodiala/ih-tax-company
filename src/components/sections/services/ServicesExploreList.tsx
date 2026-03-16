import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";
import { parseEmphasis, normalizeHref } from "@/lib/normalizeHref";
import { iconMap } from "./Default";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <polyline
        points="20 6 9 17 4 12"
        stroke="currentColor"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <line
        x1="5"
        y1="12"
        x2="19"
        y2="12"
        stroke="currentColor"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <polyline
        points="12 5 19 12 12 19"
        stroke="currentColor"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface ExploreListItem {
  title?: string | null;
  description?: string | null;
  iconKey?: string | null;
  features?: string[] | null;
  buttonLabel?: string | null;
  buttonHref?: string | null;
}

export interface ServicesExploreListProps {
  subtitle?: string | null;
  title?: string | null;
  description?: string | null;
  exploreListItems?: ExploreListItem[] | null;
}

export default function ServicesExploreList({
  subtitle,
  title,
  description,
  exploreListItems,
}: ServicesExploreListProps) {
  const hasSubtitle = Boolean(subtitle?.trim());
  const hasTitle = Boolean(title?.trim());
  const hasDescription = Boolean(description?.trim());
  const hasHeader = hasSubtitle || hasTitle || hasDescription;
  const items = Array.isArray(exploreListItems) ? exploreListItems : [];

  return (
    <section className="services-explore-list services" id="services">
      <div className="w">
        {hasHeader && (
          <RevealWrapper>
            <div className="sec-hd">
              {hasSubtitle && <div className="lbl">{subtitle}</div>}
              {hasTitle && <h2>{parseEmphasis(title!)}</h2>}
              {hasDescription && <p>{description}</p>}
            </div>
          </RevealWrapper>
        )}
        {items.length > 0 && (
          <div className="svc-grid">
            {items.map((item, i) => {
              const cardTitle = item.title?.trim();
              const cardDesc = item.description?.trim();
              const features = Array.isArray(item.features)
                ? item.features.filter((f) => f?.trim())
                : [];
              const btnLabel = item.buttonLabel?.trim();
              const btnHref = item.buttonHref?.trim();
              const hasButton = Boolean(btnLabel);
              const Icon =
                item.iconKey && iconMap[item.iconKey]
                  ? iconMap[item.iconKey]
                  : iconMap.management;

              return (
                <RevealWrapper
                  key={cardTitle || i}
                  delay={((i % 3) + 1) as 1 | 2 | 3}
                >
                  <div className="svc-card">
                    <div className="svc-icon">{Icon}</div>
                    {cardTitle && <h3>{cardTitle}</h3>}
                    {cardDesc && <p>{cardDesc}</p>}
                    {features.length > 0 && (
                      <ul className="svc-features">
                        {features.map((feature, j) => (
                          <li key={j}>
                            <CheckIcon />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    {hasButton && (
                      <Link
                        href={btnHref ? normalizeHref(btnHref) : "#"}
                        className="btn btn--outline svc-btn"
                      >
                        {btnLabel}
                        <ArrowRightIcon />
                      </Link>
                    )}
                  </div>
                </RevealWrapper>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
