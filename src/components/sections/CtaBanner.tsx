import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";

interface CtaBannerProps {
  heading?: string;
  text?: string;
  buttonText?: string;
  buttonHref?: string;
}

export default function CtaBanner({
  heading = "Ready to Get Started?",
  text = "Get in touch with our team to discuss your tax and accounting needs.",
  buttonText = "Contact Us",
  buttonHref = "/#contact",
}: CtaBannerProps) {
  return (
    <section className="cta-banner">
      <div className="container">
        <RevealWrapper>
          <h2>{heading}</h2>
        </RevealWrapper>
        <RevealWrapper delay={1}>
          <p>{text}</p>
        </RevealWrapper>
        <RevealWrapper delay={2}>
          <Link href={buttonHref} className="btn btn--white btn--arrow">
            {buttonText}
          </Link>
        </RevealWrapper>
      </div>
    </section>
  );
}
