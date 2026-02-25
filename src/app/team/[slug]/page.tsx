import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RevealWrapper from "@/components/ui/RevealWrapper";
import {
  PersonIcon,
  LinkedInIcon,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  EmailIcon,
} from "@/lib/icons";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  teamMemberBySlugQuery,
  allTeamMembersQuery,
  allTeamMemberSlugsQuery,
} from "@/sanity/lib/queries";

export const revalidate = 60;

interface TeamMemberPageProps {
  params: Promise<{ slug: string }>;
}

interface Social {
  platform: "linkedin" | "facebook" | "instagram" | "twitter" | "email";
  url: string;
}

interface SanityImage {
  asset: { _ref: string };
  hotspot?: { x: number; y: number; width: number; height: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

interface TeamMember {
  _id: string;
  name: string;
  slug: string;
  role?: string;
  position?: string;
  bio?: string;
  qualifications?: unknown[];
  workExperience?: unknown[];
  personalLife?: unknown[];
  socials?: Social[];
  image?: SanityImage;
  imageAlt?: string;
}

interface TeamMemberSummary {
  _id: string;
  name: string;
  slug: string;
  role?: string;
  image?: SanityImage;
  imageAlt?: string;
}

const profilePortableText: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
};

const socialIconMap: Record<string, React.ReactElement> = {
  linkedin: <LinkedInIcon />,
  facebook: <FacebookIcon />,
  instagram: <InstagramIcon />,
  twitter: <TwitterIcon />,
  email: <EmailIcon />,
};

const socialLabelMap: Record<string, string> = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
  twitter: "Twitter / X",
  email: "Email",
};

export async function generateStaticParams() {
  const slugs: { slug: string }[] = await client.fetch(allTeamMemberSlugsQuery);
  return slugs.filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: TeamMemberPageProps): Promise<Metadata> {
  const { slug } = await params;
  const member: TeamMember | null = await client.fetch(teamMemberBySlugQuery, { slug });
  if (!member) return { title: "Team Member Not Found" };
  return {
    title: `${member.name} | I H Professionals & Co.`,
    description: member.bio || `${member.name}${member.role ? ` — ${member.role}` : ""}`,
  };
}

export default async function TeamMemberPage({ params }: TeamMemberPageProps) {
  const { slug } = await params;

  const [member, allMembers]: [TeamMember | null, TeamMemberSummary[]] = await Promise.all([
    client.fetch(teamMemberBySlugQuery, { slug }),
    client.fetch(allTeamMembersQuery),
  ]);

  if (!member) notFound();

  const hasQualifications = member.qualifications && member.qualifications.length > 0;
  const hasWork = member.workExperience && member.workExperience.length > 0;
  const hasPersonal = member.personalLife && member.personalLife.length > 0;
  const hasSocials = member.socials && member.socials.length > 0;

  return (
    <>
      <Header />

      {/* ── Breadcrumb ── */}
      <div className="tp-breadcrumb">
        <div className="container">
          <Link href="/team" className="tp-breadcrumb__link">
            ← Back to Team
          </Link>
        </div>
      </div>

      {/* ── Hero header: name + role band ── */}
      <div className="tp-hero">
        <div className="container">
          <RevealWrapper>
            <div className="tp-hero__content">
              {member.position && (
                <span className="section-label">{member.position}</span>
              )}
              <h1 className="tp-hero__name">{member.name}</h1>
              {member.role && (
                <p className="tp-hero__role">{member.role}</p>
              )}
            </div>
          </RevealWrapper>
        </div>
      </div>

      {/* ── Main layout ── */}
      <section className="tp-main">
        <div className="container">
          <div className="tp-layout">

            {/* LEFT — sticky photo sidebar */}
            <RevealWrapper>
              <aside className="tp-sidebar">
                <div className="tp-photo">
                  {member.image?.asset ? (
                    <Image
                      src={urlFor(member.image).width(960).auto("format").url()}
                      alt={member.imageAlt || member.name}
                      width={480}
                      height={560}
                      placeholder="empty"
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                      priority
                    />
                  ) : (
                    <div className="tp-photo__default">
                      <PersonIcon size={96} />
                    </div>
                  )}
                </div>
              </aside>
            </RevealWrapper>

            {/* RIGHT — content */}
            <div className="tp-body">

              {/* Bio */}
              {member.bio && (
                <RevealWrapper>
                  <div className="tp-section">
                    <span className="section-label">About</span>
                    <p className="tp-section__text">{member.bio}</p>
                  </div>
                </RevealWrapper>
              )}

              {/* Qualifications */}
              {hasQualifications && (
                <RevealWrapper>
                  <div className="tp-section">
                    <span className="section-label">Qualifications</span>
                    <div className="tp-section__rich">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <PortableText value={member.qualifications as any} components={profilePortableText} />
                    </div>
                  </div>
                </RevealWrapper>
              )}

              {/* Work Experience */}
              {hasWork && (
                <RevealWrapper>
                  <div className="tp-section">
                    <span className="section-label">At I H Professionals</span>
                    <div className="tp-section__rich">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <PortableText value={member.workExperience as any} components={profilePortableText} />
                    </div>
                  </div>
                </RevealWrapper>
              )}

              {/* Personal life */}
              {hasPersonal && (
                <RevealWrapper>
                  <div className="tp-section">
                    <span className="section-label">Life Outside Work</span>
                    <div className="tp-section__rich">
                      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                      <PortableText value={member.personalLife as any} components={profilePortableText} />
                    </div>
                  </div>
                </RevealWrapper>
              )}

              {/* Social links */}
              {hasSocials && (
                <RevealWrapper>
                  <div className="tp-section">
                    <span className="section-label">Connect</span>
                    <div className="tp-socials">
                      {member.socials!.map((social, i) => (
                        <a
                          key={i}
                          href={social.platform === "email" ? `mailto:${social.url}` : social.url}
                          target={social.platform !== "email" ? "_blank" : undefined}
                          rel={social.platform !== "email" ? "noopener noreferrer" : undefined}
                          className="tp-socials__link"
                          aria-label={socialLabelMap[social.platform] || social.platform}
                        >
                          {socialIconMap[social.platform]}
                        </a>
                      ))}
                    </div>
                  </div>
                </RevealWrapper>
              )}

            </div>
          </div>
        </div>
      </section>

      {/* ── Team navigation strip ── */}
      {allMembers.length > 0 && (
        <nav className="team-nav">
          <div className="container">
            <p className="team-nav__label">Meet the Rest of the Team</p>
            <div className="team-nav__strip">
              {allMembers.map((m) => (
                <Link
                  key={m._id}
                  href={`/team/${m.slug}`}
                  className={`team-nav__item${m.slug === slug ? " team-nav__item--active" : ""}`}
                >
                  <div className="team-nav__avatar">
                    {m.image?.asset ? (
                      <Image
                        src={urlFor(m.image).width(144).auto("format").url()}
                        alt={m.imageAlt || m.name}
                        width={72}
                        height={72}
                        placeholder="empty"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div className="team-nav__avatar-default">
                        <PersonIcon size={28} />
                      </div>
                    )}
                  </div>
                  <span className="team-nav__name">{m.name.split(" ")[0]}</span>
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}

      <Footer />
    </>
  );
}
