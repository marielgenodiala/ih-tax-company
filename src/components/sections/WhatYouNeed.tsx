import Image from "next/image";
import RevealWrapper from "@/components/ui/RevealWrapper";

export default function WhatYouNeed() {
  return (
    <section className="section what-you-need">
      <div className="container">
        <div className="what-you-need__grid">
          <RevealWrapper direction="left">
            <div className="what-you-need__text">
              <span className="section-label">Inside Business</span>
              <h2>
                We don&apos;t just handle accounting &mdash; we help your business{" "}
                <em>grow</em>
              </h2>
              <p>
                We are committed to forming close partnerships with our clients. This
                way we can understand your unique situation and customise the
                assistance we provide to suit your needs.
              </p>
              <p>
                Our enthusiasm for our work means you are provided with a friendly
                team of professionals who are eager to use their expertise to help you
                succeed.
              </p>
            </div>
          </RevealWrapper>
          <RevealWrapper direction="right">
            <div className="what-you-need__image">
              <Image
                src="/images/accountingImage.avif"
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
