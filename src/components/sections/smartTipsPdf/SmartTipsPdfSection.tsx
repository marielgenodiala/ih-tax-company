"use client";

import { useMemo, useState } from "react";

export interface SmartTipsFilter {
  label?: string | null;
  slug?: string | null;
}

export interface SmartTipsCard {
  _key?: string;
  category?: string | null;
  title?: string | null;
  description?: string | null;
  pdfUrl?: string | null;
  pagesMeta?: string | null;
  dateMeta?: string | null;
  filterTags?: string[] | null;
}

export interface SmartTipsPdfSectionProps {
  filterLabel?: string | null;
  filters?: SmartTipsFilter[] | null;
  featuredTag?: string | null;
  featuredTitle?: string | null;
  featuredTitleItalic?: string | null;
  featuredDescription?: string | null;
  featuredPdfUrl?: string | null;
  featuredMetaPages?: string | null;
  featuredMetaUpdated?: string | null;
  featuredPdfPreviewTitle?: string | null;
  featuredPdfBadge?: string | null;
  downloadButtonLabel?: string | null;
  featuredFilterTags?: string[] | null;
  tipCards?: SmartTipsCard[] | null;
}

function matchesFilter(
  active: string,
  tags: string[] | null | undefined
): boolean {
  if (active === "all") return true;
  if (!tags?.length) return true;
  return tags.map((t) => t.toLowerCase()).includes(active.toLowerCase());
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function SmartTipsPdfSection({
  filterLabel = "Filter:",
  filters = [],
  featuredTag,
  featuredTitle,
  featuredTitleItalic,
  featuredDescription,
  featuredPdfUrl,
  featuredMetaPages = "8 pages · PDF",
  featuredMetaUpdated = "Updated May 2025",
  featuredPdfPreviewTitle = "EOFY CHECKLIST 2025",
  featuredPdfBadge = "Free PDF",
  downloadButtonLabel = "Download Free PDF",
  featuredFilterTags,
  tipCards = [],
}: SmartTipsPdfSectionProps) {
  const filterList = useMemo(() => {
    const list = Array.isArray(filters) ? filters.filter((f) => f?.slug && f?.label) : [];
    if (list.length === 0) {
      return [{ label: "All Resources", slug: "all" }];
    }
    return list;
  }, [filters]);

  const [activeFilter, setActiveFilter] = useState(
    () => filterList.find((f) => f.slug === "all")?.slug ?? filterList[0]?.slug ?? "all"
  );

  const cards = Array.isArray(tipCards) ? tipCards : [];
  if (!featuredPdfUrl?.trim() || cards.length === 0) {
    return null;
  }

  const showFeatured = matchesFilter(activeFilter, featuredFilterTags);

  const visibleCards = cards.filter((c) => matchesFilter(activeFilter, c.filterTags ?? undefined));

  return (
    <section className="smart-tips-pdf">
      <div className="container">
        <div className="filter-bar">
          <span className="filter-label">{filterLabel}</span>
          {filterList.map((f) => (
            <button
              key={f.slug!}
              type="button"
              className={`filter-btn${activeFilter === f.slug ? " active" : ""}`}
              onClick={() => setActiveFilter(f.slug!)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {showFeatured && (
          <div className="featured-card">
            <div className="featured-card-content">
              <div className="featured-card-top">
                {featuredTag?.trim() && (
                  <div className="featured-tag">
                    <div className="featured-tag-dot" />
                    {featuredTag.trim()}
                  </div>
                )}
                <h3 className="featured-title">
                  {featuredTitle?.trim()}
                  {featuredTitleItalic?.trim() ? (
                    <>
                      <br />
                      <em>{featuredTitleItalic.trim()}</em>
                    </>
                  ) : null}
                </h3>
                {featuredDescription?.trim() && (
                  <p className="featured-desc">{featuredDescription.trim()}</p>
                )}
              </div>
              <div className="featured-card-bottom">
                <div className="featured-meta">
                  <div className="meta-chip">
                    <DocIcon />
                    {featuredMetaPages}
                  </div>
                  <div className="meta-chip">
                    <ClockIcon />
                    {featuredMetaUpdated}
                  </div>
                </div>
                <a href={featuredPdfUrl} className="btn-download" download target="_blank" rel="noopener noreferrer">
                  <DownloadIcon />
                  {downloadButtonLabel}
                </a>
              </div>
            </div>
            <div className="featured-card-visual">
              <div className="pdf-preview">
                <div className="pdf-preview-header">
                  <div className="pdf-dots">
                    <div className="pdf-dot" />
                    <div className="pdf-dot" />
                    <div className="pdf-dot" />
                  </div>
                  <div className="pdf-preview-title">{featuredPdfPreviewTitle}</div>
                </div>
                <div className="pdf-preview-body">
                  <div className="pdf-line pdf-line--blue pdf-line--short pdf-line--hero" />
                  <div className="pdf-line pdf-line--full" />
                  <div className="pdf-line pdf-line--med" />
                  <div className="pdf-line pdf-line--full" />
                  <div className="pdf-line pdf-line--short" />
                  <div className="pdf-line pdf-line--spacer" />
                  <div className="pdf-line pdf-line--blue pdf-line--tall" />
                  <div className="pdf-line pdf-line--full" />
                  <div className="pdf-line pdf-line--med" />
                  <div className="pdf-line pdf-line--full" />
                  <div className="pdf-line pdf-line--spacer" />
                  <div className="pdf-line pdf-line--blue pdf-line--tall" />
                  <div className="pdf-line pdf-line--full" />
                  <div className="pdf-line pdf-line--short" />
                </div>
              </div>
              <div className="pdf-badge">{featuredPdfBadge}</div>
            </div>
          </div>
        )}

        <div className="tips-grid">
          {visibleCards.length === 0 && cards.length > 0 && (
            <p className="smart-tips-pdf__empty">No resources match this filter.</p>
          )}
          {visibleCards.map((card, i) => {
            const href = card.pdfUrl;
            if (!href) return null;
            return (
              <div className="tip-card" key={card._key ?? i}>
                <div className="tip-card-stripe" aria-hidden />
                <div className="tip-card-body">
                  <div className="tip-card-category">{card.category}</div>
                  <h4 className="tip-card-title">{card.title}</h4>
                  <p className="tip-card-desc">{card.description}</p>
                </div>
                <div className="tip-card-footer">
                  <div className="tip-card-meta">
                    <div className="tip-meta-item">
                      <DocIcon />
                      {card.pagesMeta ?? ""}
                    </div>
                    <div className="tip-meta-item">
                      <ClockIcon />
                      {card.dateMeta ?? ""}
                    </div>
                  </div>
                  <a href={href} className="tip-download-btn" download target="_blank" rel="noopener noreferrer">
                    <DownloadIcon />
                    Download
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
