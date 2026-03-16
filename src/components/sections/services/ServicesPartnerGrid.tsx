import Image from "next/image";
import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";
import { normalizeHref } from "@/lib/normalizeHref";

export interface PartnerCardItem {
  _key?: string;
  image?: string | null;
  logoVariant?: string | null;
  category?: string | null;
  title?: string | null;
  description?: string | null;
  tags?: string[] | null;
  linkLabel?: string | null;
  linkHref?: string | null;
}

/** Generate badge from title: first letter of first 3 words (e.g. "Mortgage Broking Partner" → "MBG"). */
function getBadgeFromTitle(title: string): string {
  const trimmed = title.trim();
  if (!trimmed) return "—";
  const words = trimmed.split(/\s+/).filter(Boolean);
  const letters = words
    .slice(0, 3)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return letters || "—";
}

export interface ServicesPartnerGridProps {
  categoryLabel?: string | null;
  categoryTitle?: string | null;
  categoryDescription?: string | null;
  partnerCards?: PartnerCardItem[] | null;
  hasBackground?: boolean | null;
}

const externalLinkSvg = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function ServicesPartnerGrid({
  categoryLabel,
  categoryTitle,
  categoryDescription,
  partnerCards,
  hasBackground = false,
}: ServicesPartnerGridProps) {
  const hasCategoryLabel = Boolean(categoryLabel?.trim());
  const hasCategoryTitle = Boolean(categoryTitle?.trim());
  const hasCategoryDesc = Boolean(categoryDescription?.trim());
  const hasHeader = hasCategoryLabel || hasCategoryTitle || hasCategoryDesc;
  const hasCards = Array.isArray(partnerCards) && partnerCards.length > 0;

  return (
    <div
      className={`services-partner-grid${hasBackground ? " services-partner-grid--with-bg" : ""}`}
    >
      <div className="services-partner-grid__container container">
        {hasHeader && (
          <RevealWrapper>
            <div className="services-partner-grid__divider">
              <div>
                {hasCategoryLabel && (
                  <div className="services-partner-grid__cat-label">
                    {categoryLabel}
                  </div>
                )}
                {hasCategoryTitle && (
                  <h2 className="services-partner-grid__cat-title">
                    {categoryTitle}
                  </h2>
                )}
              </div>
              {hasCategoryDesc && (
                <p className="services-partner-grid__cat-desc">
                  {categoryDescription}
                </p>
              )}
            </div>
          </RevealWrapper>
        )}
        {hasCards && (
          <div className="services-partner-grid__grid">
            {partnerCards.map((card, i) => {
              const hasImage = Boolean(card.image?.trim());
              const badge = hasImage
                ? null
                : getBadgeFromTitle(card.title ?? "");
              return (
                <RevealWrapper
                  key={card._key ?? i}
                  delay={((i % 3) + 1) as 1 | 2 | 3}
                >
                  <div
                    className={`services-partner-grid__card${!hasImage ? " services-partner-grid__card--no-image" : ""}`}
                  >
                    <div className="services-partner-grid__logo">
                      {hasImage ? (
                        <Image
                          src={card.image!}
                          alt=""
                          width={280}
                          height={160}
                          className="services-partner-grid__logo-img"
                          unoptimized={card.image?.startsWith("data:")}
                        />
                      ) : (
                        <div
                          className={`services-partner-grid__initials${card.logoVariant ? ` ${card.logoVariant}` : ""}`}
                        >
                          {badge}
                        </div>
                      )}
                    </div>
                    <div className="services-partner-grid__body">
                      {card.category && (
                        <div className="services-partner-grid__category">
                          {card.category}
                        </div>
                      )}
                      {card.title && (
                        <h3 className="services-partner-grid__card-title">
                          {card.title}
                        </h3>
                      )}
                      {card.description && (
                        <p className="services-partner-grid__card-desc">
                          {card.description}
                        </p>
                      )}
                      <div className="services-partner-grid__footer">
                        <div className="services-partner-grid__tags">
                          {Array.isArray(card.tags) &&
                            card.tags.map((tag, j) => (
                              <span
                                key={j}
                                className="services-partner-grid__tag"
                              >
                                {tag}
                              </span>
                            ))}
                        </div>
                        {(card.linkLabel?.trim() || card.linkHref?.trim()) &&
                          (card.linkHref?.trim() ? (
                            (() => {
                              const href = normalizeHref(card.linkHref!);
                              const isExternal =
                                href.startsWith("http://") || href.startsWith("https://");
                              return isExternal ? (
                                <a
                                  href={href}
                                  className="services-partner-grid__link"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {card.linkLabel?.trim() || "Visit"}
                                  {externalLinkSvg}
                                </a>
                              ) : (
                                <Link
                                  href={href}
                                  className="services-partner-grid__link"
                                >
                                  {card.linkLabel?.trim() || "Visit"}
                                  {externalLinkSvg}
                                </Link>
                              );
                            })()
                          ) : (
                            <span className="services-partner-grid__link services-partner-grid__link--label-only">
                              {card.linkLabel?.trim() || "Visit"}
                              {externalLinkSvg}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </RevealWrapper>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
