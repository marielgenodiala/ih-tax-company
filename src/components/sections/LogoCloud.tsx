import Image from "next/image";
import RevealWrapper from "@/components/ui/RevealWrapper";

export default function LogoCloud() {
  return (
    <RevealWrapper>
      <section className="logo-cloud">
        <h2 className="logo-cloud__title">Registered &amp; Accredited</h2>
        <div className="logo-cloud__grid">
          <Image
            src="/images/cpaLogo.avif"
            alt="CPA Australia"
            width={120}
            height={100}
            className="logo-cloud__logo"
            style={{ height: "100px", width: "auto" }}
          />
          <Image
            src="/images/taxAgentLogo.avif"
            alt="Registered Tax Agent"
            width={120}
            height={100}
            className="logo-cloud__logo"
            style={{ height: "100px", width: "auto" }}
          />
        </div>
      </section>
    </RevealWrapper>
  );
}
