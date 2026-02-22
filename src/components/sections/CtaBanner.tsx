import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";
import { normalizeHref, parseEmphasis } from "@/lib/normalizeHref";

interface CtaBannerProps {
  subtitle?: string;
  heading?: string;
  text?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CtaBanner({
  subtitle,
  heading = "Ready to Get Started?",
  text = "Get in touch with our team to discuss your tax and accounting needs.",
  buttonText = "Contact Us",
  buttonHref = "/#contact",
}: CtaBannerProps) {
  return (
    <section className="cta-banner">
      <div className="container">
        {subtitle && (
          <RevealWrapper>
            <span className="section-label">{subtitle}</span>
          </RevealWrapper>
        )}
        <RevealWrapper>
          <h2>{parseEmphasis(heading)}</h2>
        </RevealWrapper>
        <RevealWrapper delay={1}>
          <p>{text}</p>
        </RevealWrapper>
        <RevealWrapper delay={2}>
          <Link href={normalizeHref(buttonHref)} className="btn btn--white btn--arrow">
            {buttonText}
          </Link>
        </RevealWrapper>
      </div>
    </section>
  );
}
