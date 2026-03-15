import FooterDefault from "./FooterDefault";
import FooterTwoPart from "./FooterTwoPart";
import type { FooterDefaultProps } from "./FooterDefault";
import type { FooterTwoPartProps } from "./FooterTwoPart";

export type FooterLayout = "default" | "twoPart";

export interface FooterSectionProps extends FooterDefaultProps {
  _type: string;
  layout?: FooterLayout;
  [key: string]: unknown;
}

/**
 * Renders the appropriate footer layout. Add new layouts here and in Sanity when needed.
 */
export default function FooterSection(props: FooterSectionProps) {
  const { layout = "default", ...rest } = props;

  if (layout === "twoPart") {
    const twoPartProps: FooterTwoPartProps = {
      logo: rest.logo,
      logoText: rest.logoText,
      newsletterLabel: rest.newsletterLabel,
      newsletterPlaceholder: rest.newsletterPlaceholder,
      newsletterButtonText: rest.newsletterButtonText,
      newsletterEmail: rest.newsletterEmail,
      contactLabel: rest.contactLabel,
      contactEmail: rest.contactEmail,
      contactNumber: rest.contactNumber,
      contactAddress: rest.contactAddress,
      servicesLabel: rest.twoPartServicesLabel,
      serviceLinks: rest.twoPartServiceLinks,
      aboutLabel: rest.twoPartAboutLabel,
      aboutLinks: rest.twoPartAboutLinks,
      followLabel: rest.followLabel,
      socialLinks: rest.twoPartSocialLinks ?? rest.socialLinks,
      copyrightText: rest.copyrightText,
    };
    return <FooterTwoPart {...twoPartProps} />;
  }

  return <FooterDefault {...(rest as FooterDefaultProps)} />;
}

export { FooterDefault, FooterTwoPart };
