import Link from "next/link";
import Image from "next/image";
import { FacebookIcon, LinkedInIcon, WeChatIcon } from "@/lib/icons";
import { normalizeHref, normalizeSocialUrl } from "@/lib/normalizeHref";
import NewsletterForm from "@/components/ui/NewsletterForm";

interface SocialLink {
  platform: string;
  url: string;
}

interface FooterLink {
  label: string;
  href: string;
}

/** Service links from Sanity use path + index (anchor) to match Book Online section IDs */
interface ServiceLinkInput {
  label: string;
  href?: string;
  path?: string;
  index?: string;
}

function toServiceHref(link: ServiceLinkInput): string {
  if (link.index != null && link.index !== "") {
    const path = (link.path || "/book-online").replace(/\/$/, "");
    const anchor = link.index.startsWith("#") ? link.index : `#${link.index}`;
    return `${path}${anchor}`;
  }
  return link.href ?? "/book-online";
}

export interface FooterDefaultProps {
  companyName?: string;
  companyDescription?: string;
  logo?: string;
  socialLinks?: SocialLink[];
  quickLinks?: FooterLink[];
  serviceLinks?: ServiceLinkInput[];
  newsletterEmail?: string;
  copyrightText?: string;
}

const defaultQuickLinks: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Team", href: "/team" },
  { label: "Book Online", href: "/book-online" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/#contact" },
];

const defaultServiceLinks: FooterLink[] = [
  { label: "Tax Accounting", href: "/book-online#tax-accounting" },
  {
    label: "Management Accounting",
    href: "/book-online#management-accounting",
  },
  { label: "Auditing", href: "/book-online#auditing" },
];

const socialIconMap: Record<string, React.ComponentType> = {
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  wechat: WeChatIcon,
};

export default function FooterDefault(props: FooterDefaultProps) {
  const name = props.companyName || "I H Professionals & Co.";
  const description =
    props.companyDescription ||
    "A registered tax agent firm providing taxation and general accounting services for individuals and businesses across Australia.";
  const logoUrl = props.logo || "/images/brandlogo-new.png";
  const socials = props.socialLinks?.length
    ? props.socialLinks
    : [
        { platform: "facebook", url: "https://www.facebook.com" },
        { platform: "linkedin", url: "https://www.linkedin.com" },
      ];
  const quick = props.quickLinks?.length ? props.quickLinks : defaultQuickLinks;
  const services: FooterLink[] = props.serviceLinks?.length
    ? props.serviceLinks.map((link) => ({
        label: link.label,
        href: toServiceHref(link),
      }))
    : defaultServiceLinks;
  const copyright =
    props.copyrightText ||
    "\u00A9 2026 I H Professionals & Co. Pty Ltd. All rights reserved.";

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col">
            <div className="footer__logo">
              <Image
                src={logoUrl}
                alt={`${name} logo`}
                width={32}
                height={32}
                style={{ height: "32px", width: "auto" }}
              />
            </div>
            <p className="footer__heading">{name}</p>
            <p>{description}</p>
            <div className="footer__socials">
              {socials.map((social, idx) => {
                const Icon = socialIconMap[social.platform];
                const label =
                  social.platform === "rednote" ? "Red Note" : social.platform;
                return (
                  <a
                    key={`${social.platform}-${idx}`}
                    href={normalizeSocialUrl(social.url)}
                    target="_blank"
                    rel="noopener"
                    aria-label={label}
                  >
                    {social.platform === "rednote" ? (
                      <Image
                        src="/images/red-note-logo.png"
                        alt=""
                        width={20}
                        height={20}
                        className="footer__social-img"
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
          <div className="footer__col">
            <p className="footer__heading">Quick Links</p>
            <ul className="footer__links">
              {quick.map((link) => (
                <li key={link.href}>
                  <Link href={normalizeHref(link.href)}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <p className="footer__heading">Services</p>
            <ul className="footer__links">
              {services.map((link) => (
                <li key={link.label}>
                  <Link href={normalizeHref(link.href)}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <p className="footer__heading">Newsletter</p>
            <p>Get the latest tax tips and updates delivered to your inbox.</p>
            <NewsletterForm />
          </div>
        </div>
        <div className="footer__bottom">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
