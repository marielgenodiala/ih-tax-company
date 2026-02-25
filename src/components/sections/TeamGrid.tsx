import Image from "next/image";
import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";
import { PersonIcon } from "@/lib/icons";
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

interface TeamGridProps {
  introLabel?: string;
  introHeading?: string;
  introText?: string;
  useTeamList?: boolean;
}

export default async function TeamGrid({
  introLabel,
  introHeading,
  introText,
  useTeamList = true,
}: TeamGridProps = {}) {
  const team: TeamMember[] = useTeamList
    ? await client.fetch(allTeamMembersQuery)
    : [];

  return (
    <section className="section">
      <div className="container">
        <RevealWrapper>
          <div className="team-intro">
            <span className="section-label">{introLabel || "Meet the Team"}</span>
            <h2>
              {introHeading ? (() => {
                const parts = parseEmphasis(introHeading);
                const result: (string | React.ReactElement)[] = [];
                let k = 0;
                parts.forEach((part) => {
                  if (React.isValidElement(part) && part.type === "em") {
                    result.push(React.createElement("br", { key: `tbr-${k++}` }));
                  }
                  result.push(part);
                });
                return result;
              })() : (
                <>
                  The People Behind
                  <br />
                  <em>I H Professionals</em>
                </>
              )}
            </h2>
            <p>
              {introText ||
                "Our team of certified accounting professionals works diligently and collaboratively to bring you individualized attention and effective, timely financial management solutions. At I H Professionals & Co Pty Ltd, we love what we do, which translates into positive client experiences. Schedule a consultation and see how you can benefit from working with us."}
            </p>
          </div>
        </RevealWrapper>
        {team.length > 0 && (
          <div className="team-grid">
            {team.map((member, i) => (
              <RevealWrapper key={member._id} delay={((i % 3 + 1) as 1 | 2 | 3)}>
                <Link href={`/team/${member.slug}`} className="team-card__link">
                  <div className="team-card team-card--linked">
                    <div className="team-card__image">
                      {member.image?.asset ? (
                        <Image
                          src={urlFor(member.image).width(440).auto("format").url()}
                          alt={member.imageAlt || member.name}
                          width={220}
                          height={220}
                          placeholder="empty"
                          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
                        />
                      ) : (
                        <div className="team-card__image-default">
                          <PersonIcon size={64} />
                        </div>
                      )}
                    </div>
                    <h3 className="team-card__name">{member.name}</h3>
                    <p className="team-card__role">{member.role}</p>
                    <span className="team-card__cta">View Profile →</span>
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
