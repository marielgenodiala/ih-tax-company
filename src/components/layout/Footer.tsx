import Link from "next/link";
import Image from "next/image";
import { FacebookIcon, LinkedInIcon } from "@/lib/icons";
import { normalizeHref, normalizeSocialUrl } from "@/lib/normalizeHref";

interface SocialLink {
  platform: string;
  url: string;
}

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  companyName?: string;
  companyDescription?: string;
  logo?: string;
  socialLinks?: SocialLink[];
  quickLinks?: FooterLink[];
  serviceLinks?: FooterLink[];
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
  { label: "Tax Accounting", href: "/book-online" },
  { label: "Management Accounting", href: "/book-online" },
  { label: "Auditing", href: "/book-online" },
];

const socialIconMap: Record<string, React.ComponentType> = {
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
};

export default function Footer(props: FooterProps) {
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
  const quick = props.quickLinks?.length
    ? props.quickLinks
    : defaultQuickLinks;
  const services = props.serviceLinks?.length
    ? props.serviceLinks
    : defaultServiceLinks;
  const email =
    props.newsletterEmail || "marielgenodiala.work@gmail.com";
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
            <h4 className="footer__heading">{name}</h4>
            <p>{description}</p>
            <div className="footer__socials">
              {socials.map((social) => {
                const Icon = socialIconMap[social.platform];
                return (
                  <a
                    key={social.platform}
                    href={normalizeSocialUrl(social.url)}
                    target="_blank"
                    rel="noopener"
                    aria-label={social.platform}
                  >
                    {Icon ? <Icon /> : social.platform}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__links">
              {quick.map((link) => (
                <li key={link.href}>
                  <Link href={normalizeHref(link.href)}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Services</h4>
            <ul className="footer__links">
              {services.map((link) => (
                <li key={link.label}>
                  <Link href={normalizeHref(link.href)}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__col">
            <h4 className="footer__heading">Newsletter</h4>
            <p>Get the latest tax tips and updates delivered to your inbox.</p>
            <form
              className="footer__newsletter"
              action={`https://formsubmit.co/${email}`}
              method="POST"
            >
              <input type="hidden" name="_next" value="/thank-you" />
              <input
                type="hidden"
                name="_subject"
                value="New Newsletter Subscription — IH Professionals"
              />
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="form__input"
                required
              />
              <button type="submit" className="btn btn--primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="footer__bottom">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
