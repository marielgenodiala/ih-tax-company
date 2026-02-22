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
    <RevealWrapper>
      <section className="logo-cloud">
        <h2 className="logo-cloud__title">{title || "Registered & Accredited"}</h2>
        <div className="logo-cloud__grid">
          {logos?.length
            ? logos.map((logo, i) =>
                logo.image ? (
                  <Image
                    key={i}
                    src={logo.image}
                    alt={logo.alt}
                    width={120}
                    height={100}
                    className="logo-cloud__logo"
                    style={{ height: "100px", width: "auto" }}
                  />
                ) : null
              )
            : defaultLogos.map((logo) => (
                <Image
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={100}
                  className="logo-cloud__logo"
                  style={{ height: "100px", width: "auto" }}
                />
              ))}
        </div>
      </section>
    </RevealWrapper>
  );
}
