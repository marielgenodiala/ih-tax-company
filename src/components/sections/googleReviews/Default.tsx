"use client";

import { useCallback, useEffect, useState } from "react";
import { parseEmphasis } from "@/lib/normalizeHref";
import { normalizeHref } from "@/lib/normalizeHref";
import RevealWrapper from "@/components/ui/RevealWrapper";

const AUTO_ADVANCE_MS = 7000;
const BREAKPOINT_MD = 768;
const BREAKPOINT_LG = 1024;

const StarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" aria-hidden>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" aria-hidden>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

function getInitials(name: string, fallback?: string): string {
  if (fallback?.trim()) return fallback.trim().slice(0, 2).toUpperCase();
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.trim().slice(0, 2).toUpperCase() || "??";
}

/** Google-style avatar colors: deterministic per name, like real Google reviews */
const AVATAR_COLORS = [
  "#4285f4", "#ea4335", "#fbbc05", "#34a853", "#5c6bc0",
  "#ab47bc", "#26a69a", "#ef5350", "#66bb6a", "#ffa726",
  "#42a5f5", "#7e57c2", "#26c6da", "#ec407a", "#8d6e63",
];

function getAvatarColor(name: string): string {
  const str = (name || "?").trim().toLowerCase();
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

export interface GoogleReviewItem {
  text?: string;
  reviewerName?: string;
  reviewerInitials?: string;
  stars?: number;
  timeAgo?: string;
}

export interface GoogleReviewsProps {
  sectionLabel?: string;
  eyebrow?: string;
  heading?: string;
  headingItalic?: string;
  googleReviewsUrl?: string;
  rating?: number;
  reviewCount?: number;
  reviewCountLabel?: string;
  reviews?: GoogleReviewItem[];
}

export default function GoogleReviews({
  eyebrow = "Client Testimonials",
  heading = "What Our Clients",
  headingItalic = "Say About Us",
  googleReviewsUrl,
  rating = 4.9,
  reviewCount,
  reviewCountLabel = "Google reviews",
  reviews = [],
}: GoogleReviewsProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [perPage, setPerPage] = useState(2);

  useEffect(() => {
    const mqSmall = window.matchMedia(`(max-width: ${BREAKPOINT_MD - 1}px)`);
    const mqLarge = window.matchMedia(`(min-width: ${BREAKPOINT_LG}px)`);
    const update = () => {
      if (mqSmall.matches) setPerPage(1);
      else if (mqLarge.matches) setPerPage(3);
      else setPerPage(2);
    };
    update();
    mqSmall.addEventListener("change", update);
    mqLarge.addEventListener("change", update);
    return () => {
      mqSmall.removeEventListener("change", update);
      mqLarge.removeEventListener("change", update);
    };
  }, []);

  const canNavigate = reviews.length > perPage;

  const goNext = useCallback(() => {
    setStartIndex((i) => (i + 1) % reviews.length);
  }, [reviews.length]);

  const goPrev = useCallback(() => {
    setStartIndex((i) => (i - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  const goTo = useCallback((i: number) => {
    setStartIndex(i);
  }, []);

  useEffect(() => {
    if (!canNavigate) return;
    const timer = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [canNavigate, goNext]);

  // Slide by 1: show perPage items starting from startIndex, wrapping around
  const visibleReviews = Array.from({ length: Math.min(perPage, reviews.length) }, (_, i) =>
    reviews[(startIndex + i) % reviews.length]
  );

  const viewAllUrl = googleReviewsUrl ? normalizeHref(googleReviewsUrl) : null;

  return (
    <section className="google-reviews" aria-labelledby="google-reviews-title">
      <div className="container">
        <RevealWrapper>
          <div className="google-reviews__header">
            <div>
              {/* {eyebrow && (
              <div className="google-reviews__eyebrow">{eyebrow}</div>
            )} */}
              <h2 id="google-reviews-title" className="google-reviews__title">
                {heading}
                {headingItalic && (
                  <>
                    <br />
                    <em>{headingItalic}</em>
                  </>
                )}
              </h2>
            </div>

            <div className="google-reviews__header-right">
              {reviewCount ? (
                <div className="google-reviews__score-card">
                  <span className="google-reviews__g-badge" aria-hidden>G</span>
                  <div className="google-reviews__score-divider" />
                  <span className="google-reviews__score-big">{rating}</span>
                  <div>
                    <div className="google-reviews__stars-row" aria-hidden>
                      {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} />)}
                    </div>
                    <div className="google-reviews__score-sub">
                      <strong>{reviewCount} {reviewCountLabel}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="google-reviews__score-card google-reviews__score-card--no-count">
                  <span className="google-reviews__score-big">{rating}</span>
                  <div className="google-reviews__stars-row" aria-hidden>
                    {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} />)}
                  </div>
                </div>
              )}

              {viewAllUrl && (
                <a
                  href={viewAllUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="google-reviews__link"
                >
                  View all on Google
                  <ExternalLinkIcon />
                </a>
              )}
            </div>
          </div>

          {reviews.length > 0 ? (
            <>
              <div className="google-reviews__grid">
                {visibleReviews.map((review, idx) => {
                  const stars = Math.min(5, Math.max(1, review.stars ?? 5));
                  const reviewerName = review.reviewerName || "Reviewer";
                  const initials = getInitials(
                    reviewerName,
                    review.reviewerInitials,
                  );
                  const avatarColor = getAvatarColor(reviewerName);
                  return (
                    <article
                      key={`${startIndex}-${idx}-${reviewerName}`}
                      className="google-reviews__card"
                    >
                      <div className="google-reviews__quote" aria-hidden>
                        "
                      </div>
                      <div className="google-reviews__card-stars" aria-hidden>
                        {Array.from({ length: stars }, (_, i) => (
                          <StarIcon key={i} />
                        ))}
                      </div>
                      <p className="google-reviews__card-text">
                        {review.text ? parseEmphasis(review.text) : null}
                      </p>
                      <div className="google-reviews__reviewer">
                        <div
                          className="google-reviews__avatar"
                          style={{ backgroundColor: avatarColor }}
                        >
                          {initials}
                        </div>
                        <div>
                          <div className="google-reviews__rev-name">
                            {reviewerName}
                          </div>
                          <div className="google-reviews__rev-meta">
                            {/* <span className="google-reviews__g-label">
                              <span className="google-reviews__g-letter">G</span>{" "}
                              Google Review
                            </span> */}
                            {review.timeAgo && (
                              <>
                                <span>{review.timeAgo}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {canNavigate && (
                <div className="google-reviews__controls">
                  <button
                    type="button"
                    className="google-reviews__ctrl-btn"
                    onClick={goPrev}
                    aria-label="Previous reviews"
                  >
                    <ChevronLeft />
                  </button>
                  <div className="google-reviews__dots" role="tablist">
                    {Array.from({ length: reviews.length }, (_, i) => (
                      <button
                        key={i}
                        type="button"
                        role="tab"
                        aria-selected={i === startIndex}
                        aria-label={`Item ${i + 1}`}
                        className={`google-reviews__dot ${i === startIndex ? "on" : ""}`}
                        onClick={() => goTo(i)}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="google-reviews__ctrl-btn"
                    onClick={goNext}
                    aria-label="Next reviews"
                  >
                    <ChevronRight />
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="google-reviews__empty">
              Add reviews in Sanity to display them here. When the client is
              ready, add the Google Reviews link in the section settings.
            </p>
          )}
        </RevealWrapper>
      </div>
    </section>
  );
}
