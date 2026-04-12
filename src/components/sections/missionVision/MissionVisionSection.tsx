import type { ReactNode } from "react";
import RevealWrapper from "@/components/ui/RevealWrapper";
import { parseEmphasis } from "@/lib/normalizeHref";

function splitBodyParagraphs(text: string | null | undefined): string[] {
  if (!text?.trim()) return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Reference: .mv-card-icon svg — 22×22px (fixed so flex/grid never stretches). */
function MvvCardIconSvg({ children }: { children: ReactNode }) {
  return (
    <svg
      className="mission-vision__svg mission-vision__svg--card"
      width={22}
      height={22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {children}
    </svg>
  );
}

/** Reference: .value-icon-wrap svg — 20×20px */
function MvvValueIconSvg({ children }: { children: ReactNode }) {
  return (
    <svg
      className="mission-vision__svg mission-vision__svg--value"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const MissionIcon = () => (
  <MvvCardIconSvg>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="21.17" y1="8" x2="12" y2="8" />
    <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
    <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
  </MvvCardIconSvg>
);

const VisionIcon = () => (
  <MvvCardIconSvg>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </MvvCardIconSvg>
);

const valueIcons: Record<string, React.ReactNode> = {
  heart: (
    <MvvValueIconSvg>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </MvvValueIconSvg>
  ),
  document: (
    <MvvValueIconSvg>
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </MvvValueIconSvg>
  ),
  clock: (
    <MvvValueIconSvg>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </MvvValueIconSvg>
  ),
  users: (
    <MvvValueIconSvg>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </MvvValueIconSvg>
  ),
  star: (
    <MvvValueIconSvg>
      <polygon
        fill="none"
        points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
      />
    </MvvValueIconSvg>
  ),
  shield: (
    <MvvValueIconSvg>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </MvvValueIconSvg>
  ),
};

export interface MissionVisionValue {
  _key?: string;
  iconKey?: string | null;
  title?: string | null;
  description?: string | null;
}

export interface MissionVisionSectionProps {
  missionTag?: string | null;
  missionTitle?: string | null;
  missionBody?: string | null;
  missionQuote?: string | null;
  visionTag?: string | null;
  visionTitle?: string | null;
  visionBody?: string | null;
  visionQuote?: string | null;
  valuesHeading?: string | null;
  valuesIntro?: string | null;
  values?: MissionVisionValue[] | null;
}

export default function MissionVisionSection({
  missionTag,
  missionTitle,
  missionBody,
  missionQuote,
  visionTag,
  visionTitle,
  visionBody,
  visionQuote,
  valuesHeading,
  valuesIntro,
  values = [],
}: MissionVisionSectionProps) {
  const valueList = Array.isArray(values) ? values : [];
  if (!missionTitle?.trim() || !visionTitle?.trim() || valueList.length === 0) {
    return null;
  }

  const missionParas = splitBodyParagraphs(missionBody);
  const visionParas = splitBodyParagraphs(visionBody);

  return (
    <section className="mission-vision">
      <div className="mission-vision__inner container">
        <div className="mission-vision__mv-grid">
          <RevealWrapper delay={1}>
            <article className="mission-vision__mv-card mission-vision__mv-card--mission">
              <div className="mission-vision__mv-icon">
                <MissionIcon />
              </div>
              <div className="mission-vision__mv-tag">
                {missionTag || "Our Mission"}
              </div>
              <h3 className="mission-vision__mv-title">{missionTitle}</h3>
              <div className="mission-vision__mv-body">
                {missionParas.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {missionQuote?.trim() && (
                <div className="mission-vision__mv-quote">
                  {missionQuote.trim()}
                </div>
              )}
            </article>
          </RevealWrapper>
          <RevealWrapper delay={2}>
            <article className="mission-vision__mv-card mission-vision__mv-card--vision">
              <div className="mission-vision__mv-icon">
                <VisionIcon />
              </div>
              <div className="mission-vision__mv-tag">
                {visionTag || "Our Vision"}
              </div>
              <h3 className="mission-vision__mv-title">{visionTitle}</h3>
              <div className="mission-vision__mv-body">
                {visionParas.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {visionQuote?.trim() && (
                <div className="mission-vision__mv-quote">
                  {visionQuote.trim()}
                </div>
              )}
            </article>
          </RevealWrapper>
        </div>

        <div className="mission-vision__values">
          <div className="mission-vision__values-header">
            <RevealWrapper>
              <h3 className="mission-vision__values-heading">
                {valuesHeading?.trim()
                  ? parseEmphasis(valuesHeading.trim())
                  : parseEmphasis("Our *Values*")}
              </h3>
            </RevealWrapper>
            {valuesIntro?.trim() ? (
              <RevealWrapper delay={1}>
                <p className="mission-vision__values-intro">
                  {valuesIntro.trim()}
                </p>
              </RevealWrapper>
            ) : null}
          </div>
          <div className="mission-vision__values-grid">
            {valueList.map((item, i) => (
              <RevealWrapper
                key={item._key ?? i}
                delay={(Math.min(i, 3) + 1) as 1 | 2 | 3 | 4}
              >
                <div className="mission-vision__value-item">
                  <div className="mission-vision__value-number">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mission-vision__value-icon-wrap">
                    {valueIcons[item.iconKey ?? ""] ?? valueIcons.heart}
                  </div>
                  {item.title && (
                    <div className="mission-vision__value-name">
                      {item.title}
                    </div>
                  )}
                  {item.description && (
                    <p className="mission-vision__value-desc">
                      {item.description}
                    </p>
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
