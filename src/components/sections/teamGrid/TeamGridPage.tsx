import Image from "next/image";
import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { allTeamMembersQuery } from "@/sanity/lib/queries";
import React from "react";
import { parseEmphasis } from "@/lib/normalizeHref";

interface SanityImage {
  asset: { _ref: string };
  hotspot?: { x: number; y: number; width: number; height: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

interface TeamMember {
  _id: string;
  name: string;
  slug: string;
  role: string;
  image: SanityImage | null;
  imageAlt: string;
}

interface TeamGridPageProps {
  introLabel?: string;
  introHeading?: string;
  introText?: string;
  useTeamList?: boolean;
}

function ArrowIcon() {
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

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function TeamGridPage({
  introLabel,
  introHeading,
  introText,
  useTeamList = true,
}: TeamGridPageProps = {}) {
  const team: TeamMember[] = useTeamList
    ? await client.fetch(allTeamMembersQuery)
    : [];

  return (
    <section className="section--compact team-page-section">
      <div className="team-page-section__inner container">
        {(introLabel?.trim() || introHeading?.trim() || introText?.trim()) && (
          <div className="team-page-header">
            {introLabel?.trim() && (
              <RevealWrapper>
                <div className="team-page-header__eyebrow">{introLabel}</div>
              </RevealWrapper>
            )}
            {introHeading?.trim() && (
              <RevealWrapper delay={introLabel?.trim() ? 1 : undefined}>
                <h2 className="team-page-header__title">
                  {(() => {
                    const parts = parseEmphasis(introHeading);
                    const result: (string | React.ReactElement)[] = [];
                    let k = 0;
                    parts.forEach((part) => {
                      if (React.isValidElement(part) && part.type === "em") {
                        result.push(
                          React.createElement("br", { key: `tbr-${k++}` }),
                        );
                      }
                      result.push(part);
                    });
                    return result;
                  })()}
                </h2>
              </RevealWrapper>
            )}
            {introText?.trim() && (
              <RevealWrapper
                delay={
                  introLabel?.trim() && introHeading?.trim()
                    ? 2
                    : introLabel?.trim() || introHeading?.trim()
                      ? 1
                      : undefined
                }
              >
                <p className="team-page-header__desc">{introText}</p>
              </RevealWrapper>
            )}
          </div>
        )}
        {team.length > 0 && (
          <div className="team-page-grid">
            {team.map((member, i) => (
              <RevealWrapper
                key={member._id}
                delay={((i % 3) + 1) as 1 | 2 | 3}
              >
                <Link
                  href={`/team/${member.slug}`}
                  className="team-page-card team-page-card--link"
                >
                  <div className="team-page-card__photo">
                    {member.image?.asset ? (
                      <Image
                        src={urlFor(member.image)
                          .width(440)
                          .auto("format")
                          .url()}
                        alt={member.imageAlt || member.name}
                        width={440}
                        height={260}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center top",
                        }}
                      />
                    ) : (
                      <div className="team-page-card__initials">
                        {getInitials(member.name)}
                      </div>
                    )}
                    <div
                      className="team-page-card__photo-overlay"
                      aria-hidden
                    />
                  </div>
                  <div className="team-page-card__body">
                    <div className="team-page-card__name">{member.name}</div>
                    <div className="team-page-card__rule" aria-hidden />
                    {member.role && (
                      <div className="team-page-card__position">
                        {member.role}
                      </div>
                    )}
                    <span className="team-page-card__btn">
                      View Profile <ArrowIcon />
                    </span>
                  </div>
                </Link>
              </RevealWrapper>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
