"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FacebookIcon,
  LinkedInIcon,
  InstagramIcon,
  TwitterIcon,
  YoutubeIcon,
  WhatsAppIcon,
  EmailIcon,
  PhoneIcon,
  MapPinIcon,
} from "@/lib/icons";
import { normalizeHref, normalizeSocialUrl } from "@/lib/normalizeHref";

interface SocialLink {
  platform: string;
  url: string;
}

interface FooterLink {
  label: string;
  href: string;
}

const socialIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  youtube: YoutubeIcon,
  whatsapp: WhatsAppIcon,
};

export interface FooterTwoPartProps {
  logo?: string | null;
  logoText?: string | null;
  newsletterLabel?: string | null;
  newsletterPlaceholder?: string | null;
  newsletterButtonText?: string | null;
  newsletterEmail?: string | null;
  contactLabel?: string | null;
  contactEmail?: string | null;
  contactNumber?: string | null;
  contactAddress?: string | null;
  servicesLabel?: string | null;
  serviceLinks?: FooterLink[] | null;
  aboutLabel?: string | null;
  aboutLinks?: FooterLink[] | null;
  followLabel?: string | null;
  socialLinks?: SocialLink[] | null;
  copyrightText?: string | null;
}

function ArrowRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5l10 7-10 7V5z" />
    </svg>
  );
}

function NewsletterBlock({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.get("email") }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/thank-you");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <form className="footer-2p__newsletter-form" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder={placeholder}
        className="footer-2p__newsletter-input"
        required
        disabled={status === "loading"}
      />
      <button
        type="submit"
        className="footer-2p__newsletter-btn"
        disabled={status === "loading"}
        aria-label="Subscribe"
      >
        {status === "loading" ? "…" : <ArrowRightIcon />}
      </button>
      {status === "error" && (
        <p className="footer-2p__newsletter-error">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}

export default function FooterTwoPart(props: FooterTwoPartProps) {
  const logoUrl = props.logo || null;
  const logoText = props.logoText ?? "";
  const newsletterLabel = props.newsletterLabel ?? "Newsletter";
  const newsletterPlaceholder = props.newsletterPlaceholder ?? "Email address";
  const newsletterButtonText = props.newsletterButtonText ?? "Subscribe";
  const contactLabel = props.contactLabel ?? "Contact us";
  const servicesLabel = props.servicesLabel ?? "Services";
  const aboutLabel = props.aboutLabel ?? "About us";
  const followLabel = props.followLabel ?? "Follow us on";
  const serviceLinks = props.serviceLinks ?? [];
  const aboutLinks = props.aboutLinks ?? [];
  const socialLinks = props.socialLinks ?? [];
  const copyrightText = props.copyrightText ?? "";

  return (
    <footer className="footer-2p">
      <div className="footer-2p__upper">
        <div className="container">
          <div className="footer-2p__row1">
            <Link href="/" className="footer-2p__brand">
              {logoUrl && (
                <div className="footer-2p__logo">
                  <Image
                    src={logoUrl}
                    alt={logoText || "Logo"}
                    width={40}
                    height={40}
                    style={{ height: "40px", width: "auto" }}
                  />
                </div>
              )}
              {logoText && (
                <span className="footer-2p__logo-text">{logoText}</span>
              )}
            </Link>
            <div className="footer-2p__newsletter">
              <p className="footer-2p__heading">{newsletterLabel}</p>
              <NewsletterBlock placeholder={newsletterPlaceholder} />
            </div>
          </div>
          <div className="footer-2p__row2">
            <div className="footer-2p__col footer-2p__col--contact">
              <p className="footer-2p__heading">{contactLabel}</p>
              {props.contactEmail && (
                <p className="footer-2p__contact-line">
                  <span className="footer-2p__contact-icon" aria-hidden>
                    <EmailIcon />
                  </span>
                  <a href={`mailto:${props.contactEmail}`}>
                    {props.contactEmail}
                  </a>
                </p>
              )}
              {props.contactNumber && (
                <p className="footer-2p__contact-line">
                  <span className="footer-2p__contact-icon" aria-hidden>
                    <PhoneIcon />
                  </span>
                  <a href={`tel:${props.contactNumber.replace(/\s/g, "")}`}>
                    {props.contactNumber}
                  </a>
                </p>
              )}
              {props.contactAddress && (
                <p className="footer-2p__contact-line footer-2p__address">
                  <span className="footer-2p__contact-icon" aria-hidden>
                    <MapPinIcon />
                  </span>
                  <span>{props.contactAddress}</span>
                </p>
              )}
            </div>
            <div className="footer-2p__col">
              <p className="footer-2p__heading">{servicesLabel}</p>
              <ul className="footer-2p__links">
                {serviceLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={normalizeHref(link.href)}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-2p__col">
              <p className="footer-2p__heading">{aboutLabel}</p>
              <ul className="footer-2p__links">
                {aboutLinks.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={normalizeHref(link.href)}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-2p__col">
              <p className="footer-2p__heading">{followLabel}</p>
              <div className="footer-2p__socials">
                {socialLinks.map((social, idx) => {
                  const Icon = socialIconMap[social.platform];
                  const label =
                    social.platform === "rednote" ? "Red Note" : social.platform;
                  return (
                    <a
                      key={`${social.platform}-${idx}`}
                      href={normalizeSocialUrl(social.url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="footer-2p__social-link"
                    >
                      {social.platform === "rednote" ? (
                        <Image
                          src="/images/red-note-logo.png"
                          alt=""
                          width={20}
                          height={20}
                          className="footer-2p__social-img"
                        />
                      ) : Icon ? (
                        <Icon />
                      ) : (
                        social.platform
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-2p__lower">
        <div className="container footer-2p__lower-inner">
          <span className="footer-2p__copyright">© 2026 {copyrightText}</span>
          <span className="footer-2p__designed">
            Designed by{" "}
            <a
              href="https://www.marielgenodiala.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-2p__designed-link"
            >
              MG.Web
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
