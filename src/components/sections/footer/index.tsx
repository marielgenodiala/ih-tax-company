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
      logoText: rest.logoText as string | null | undefined,
      newsletterLabel: rest.newsletterLabel as string | null | undefined,
      newsletterPlaceholder: rest.newsletterPlaceholder as string | null | undefined,
      newsletterButtonText: rest.newsletterButtonText as string | null | undefined,
      newsletterEmail: rest.newsletterEmail as string | null | undefined,
      contactLabel: rest.contactLabel as string | null | undefined,
      contactEmail: rest.contactEmail as string | null | undefined,
      contactNumber: rest.contactNumber as string | null | undefined,
      contactAddress: rest.contactAddress as string | null | undefined,
      contactAddress2: rest.contactAddress2 as string | null | undefined,
      servicesLabel: rest.twoPartServicesLabel as string | null | undefined,
      serviceLinks: rest.twoPartServiceLinks as FooterTwoPartProps["serviceLinks"],
      aboutLabel: rest.twoPartAboutLabel as string | null | undefined,
      aboutLinks: rest.twoPartAboutLinks as FooterTwoPartProps["aboutLinks"],
      followLabel: rest.followLabel as string | null | undefined,
      socialLinks: (rest.twoPartSocialLinks ?? rest.socialLinks) as FooterTwoPartProps["socialLinks"],
      copyrightText: rest.copyrightText as string | null | undefined,
    };
    return <FooterTwoPart {...twoPartProps} />;
  }

  return <FooterDefault {...(rest as FooterDefaultProps)} />;
}

export { FooterDefault, FooterTwoPart };
