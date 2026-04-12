import Image from "next/image";
import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";
import { urlFor } from "@/sanity/lib/image";
import { normalizeHref, parseEmphasis } from "@/lib/normalizeHref";

interface AboutProps {
  label?: string;
  heading?: string;
  text1?: string;
  text2?: string;
  buttonText?: string;
  buttonHref?: string;
  image?: { asset?: { _ref: string } };
}

export default function About({
  label,
  heading,
  text1,
  text2,
  buttonText,
  buttonHref,
  image,
}: AboutProps = {}) {
  const imgSrc = image?.asset?._ref
    ? urlFor(image).width(600).url()
    : "/images/businessImage.avif";

  return (
    <section className="section section--compact about">
      <div className="container">
        <div className="about__grid">
          <RevealWrapper direction="left">
            <div className="about__image">
              <Image
                src={imgSrc}
                alt="Our approach to accounting"
                width={600}
                height={450}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </RevealWrapper>
          <div className="about__text">
            <RevealWrapper direction="right">
              <span className="about__label">{label || "Our Way"}</span>
            </RevealWrapper>
            <RevealWrapper direction="right" delay={1}>
              <h2>
                {heading ? parseEmphasis(heading) : (
                  <>
                    Your business advisor, tax planner, and guide to{" "}
                    <em>success</em>
                  </>
                )}
              </h2>
            </RevealWrapper>
            <RevealWrapper direction="right" delay={2}>
              <p>
                {text1 ||
                  "While the company is large enough to offer a comprehensive range of services across the broad accounting and financial spectrum, it remains small enough to ensure that all clients have direct and immediate access to senior persons for consultation and advice."}
              </p>
            </RevealWrapper>
            <RevealWrapper direction="right" delay={3}>
              <p>
                {text2 ||
                  "Our clients include the various professions and range from restaurant to developers, travel agency, technology, educational institution, real estate agency, online retailer, importer and exporter, brokerage services and more across Australia."}
              </p>
            </RevealWrapper>
            <RevealWrapper direction="right" delay={4}>
              <Link
                href={normalizeHref(buttonHref || "/team")}
                className="btn btn--outline"
              >
                {buttonText || "Meet the Team"}
              </Link>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
