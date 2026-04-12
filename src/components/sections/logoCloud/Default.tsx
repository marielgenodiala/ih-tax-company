import Image from "next/image";
import RevealWrapper from "@/components/ui/RevealWrapper";

interface LogoItem {
  image?: string;
  alt: string;
}

interface LogoCloudProps {
  title?: string;
  logos?: LogoItem[];
}

const defaultLogos = [
  { src: "/images/cpaLogo.avif", alt: "CPA Australia" },
  { src: "/images/taxAgentLogo.avif", alt: "Registered Tax Agent" },
];

export default function LogoCloud({ title, logos }: LogoCloudProps) {
  return (
    <section className="logo-cloud">
      <RevealWrapper>
        <h2 className="logo-cloud__title">
          {title || "Registered & Accredited"}
        </h2>
      </RevealWrapper>
      <div className="logo-cloud__grid">
        {logos?.length
          ? logos.map((logo, i) =>
              logo.image ? (
                <RevealWrapper
                  key={i}
                  delay={((i % 3) + 1) as 1 | 2 | 3}
                >
                  <Image
                    src={logo.image}
                    alt={logo.alt}
                    width={120}
                    height={100}
                    className="logo-cloud__logo"
                    style={{ height: "100px", width: "auto" }}
                  />
                </RevealWrapper>
              ) : null,
            )
          : defaultLogos.map((logo, i) => (
              <RevealWrapper
                key={logo.alt}
                delay={((i % 3) + 1) as 1 | 2 | 3}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={100}
                  className="logo-cloud__logo"
                  style={{ height: "100px", width: "auto" }}
                />
              </RevealWrapper>
            ))}
      </div>
    </section>
  );
}
