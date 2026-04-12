"use client";

import Image from "next/image";
import RevealWrapper from "@/components/ui/RevealWrapper";
import { CountUpNumber } from "./Default";

const defaultStats = [
  { number: "10+", label: "Years Experience" },
  { number: "500+", label: "Tax Returns Lodged" },
  { number: "100%", label: "Client Satisfaction" },
  { number: "50+", label: "Business Clients" },
];

interface Partner {
  image?: string;
  title?: string;
  link?: string;
}

interface StatsWithPartnersProps {
  stats?: { number: string; label: string }[];
  shortDesc?: string;
  partners?: Partner[];
}

export default function StatsWithPartners({
  stats,
  shortDesc,
  partners,
}: StatsWithPartnersProps) {
  const items = stats?.length ? stats : defaultStats;

  return (
    <section className="stats stats--with-partners">
      {/* Top: full-width gray — stats */}
      <div className="stats-wp__gray-top">
        <div className="container">
          <div className="stats__grid stats__grid--3col">
            {items.map((stat, i) => (
              <RevealWrapper
                key={`${stat.label}-${i}`}
                delay={(i + 1) as 1 | 2 | 3 | 4}
              >
                <div className="stats__item">
                  <span className="stats__number">
                    <CountUpNumber value={stat.number} />
                  </span>
                  <span className="stats__label">{stat.label}</span>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: left half gray (short desc, lg rounded bottom-right) | right half white (partners) */}
      {(shortDesc || (partners?.length ?? 0) > 0) && (
        <div className="stats-wp__bottom-row">
          <div className="stats-wp__gray-part">
            <div className="container">
              {shortDesc && (
                <RevealWrapper>
                  <p className="stats__short-desc">{shortDesc}</p>
                </RevealWrapper>
              )}
            </div>
          </div>
          <div className="stats-wp__white-part">
            <div className="container">
              {partners?.length ? (
                <div className="stats__partners-row">
                  {partners.map((partner, i) => {
                    const content = (
                      <>
                        {partner.image && (
                          <div className="stats__partner-image">
                            <Image
                              src={partner.image}
                              alt={partner.title ?? ""}
                              width={32}
                              height={32}
                              className="stats__partner-img"
                            />
                          </div>
                        )}
                        {partner.title && (
                          <span className="stats__partner-title">
                            {partner.title}
                          </span>
                        )}
                      </>
                    );
                    const inner = partner.link ? (
                      <a
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="stats__partner-item"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="stats__partner-item">{content}</div>
                    );
                    return (
                      <RevealWrapper
                        key={i}
                        delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                      >
                        {inner}
                      </RevealWrapper>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
