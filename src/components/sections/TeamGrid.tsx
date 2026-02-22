import Image from "next/image";
import RevealWrapper from "@/components/ui/RevealWrapper";
import { client } from "@/sanity/lib/client";
import { allTeamMembersQuery } from "@/sanity/lib/queries";
import React from "react";
import { parseEmphasis } from "@/lib/normalizeHref";

interface TeamMember {
  name: string;
  role: string;
  image: string;
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
          <div className="grid grid--3">
            {team.map((member, i) => (
              <RevealWrapper key={member.name} delay={((i + 1) as 1 | 2 | 3)}>
                <div className="team-card">
                  <div className="team-card__image">
                    {member.image && (
                      <Image
                        src={member.image}
                        alt={member.imageAlt || member.name}
                        width={220}
                        height={220}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    )}
                  </div>
                  <h3 className="team-card__name">{member.name}</h3>
                  <p className="team-card__role">{member.role}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
