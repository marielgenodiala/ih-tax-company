import FooterSection from "@/components/sections/footer";
import FooterTwoPart from "@/components/sections/footer/FooterTwoPart";

export interface FooterProps {
  /** When provided (e.g. from Sanity "Main Footer v2"), this footer section is used. */
  footerSection?: Record<string, unknown> | null;
}

export default function Footer({ footerSection }: FooterProps = {}) {
  if (footerSection && Object.keys(footerSection).length > 0) {
    return <FooterSection _type="footerSection" {...footerSection} />;
  }
  return <FooterTwoPart />;
}
