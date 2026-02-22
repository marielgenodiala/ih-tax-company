import Image from "next/image";
import RevealWrapper from "@/components/ui/RevealWrapper";
import { urlFor } from "@/sanity/lib/image";
import { parseEmphasis } from "@/lib/normalizeHref";

interface WhatYouNeedProps {
  subtitle?: string;
  label?: string;
  heading?: string;
  description?: string;
  text1?: string;
  text2?: string;
  useServiceList?: boolean;
  image?: { asset?: { _ref: string } };
}

export default function WhatYouNeed({
  subtitle,
  label,
  heading,
  description,
  text1,
  text2,
  image,
}: WhatYouNeedProps = {}) {
  const imgSrc = image?.asset?._ref
    ? urlFor(image).width(600).url()
    : "/images/accountingImage.avif";

  // subtitle takes priority, fallback to label for backwards compatibility
  const sectionLabel = subtitle || label || "Inside Business";

  return (
    <section className="section what-you-need">
      <div className="container">
        <div className="what-you-need__grid">
          <RevealWrapper direction="left">
            <div className="what-you-need__text">
              <span className="section-label">{sectionLabel}</span>
              <h2>
                {heading ? parseEmphasis(heading) : (
                  <>
                    We don&apos;t just handle accounting &mdash; we help your business{" "}
                    <em>grow</em>
                  </>
                )}
              </h2>
              {description && <p>{description}</p>}
              <p>
                {text1 ||
                  (!description
                    ? "We are committed to forming close partnerships with our clients. This way we can understand your unique situation and customise the assistance we provide to suit your needs."
                    : undefined)}
              </p>
              {(text2 || !description) && (
                <p>
                  {text2 ||
                    "Our enthusiasm for our work means you are provided with a friendly team of professionals who are eager to use their expertise to help you succeed."}
                </p>
              )}
            </div>
          </RevealWrapper>
          <RevealWrapper direction="right">
            <div className="what-you-need__image">
              <Image
                src={imgSrc}
                alt="Professional accounting services"
                width={600}
                height={450}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
