import CtaBannerDefault from "./Default";
import CtaBannerTwoColumn from "./CtaBannerTwoColumn";

export type CtaBannerVariant = "default" | "twoColumn";

export interface CtaBannerSectionProps {
  _type?: "ctaBannerSection";
  variant?: CtaBannerVariant;
  sectionLabel?: string;
  subtitle?: string;
  heading?: string;
  text?: string;
  buttonText?: string;
  buttonHref?: string;
  backgroundType?: "darkBlue" | "linear" | "image";
  backgroundImage?: string | null;
}

/**
 * Renders the appropriate CTA banner variant.
 * - default: centered layout, primary background
 * - twoColumn: blue background, title + description left, button right, btn white
 */
export default function CtaBanner(props: CtaBannerSectionProps) {
  const { variant, ...rest } = props;

  if (variant === "twoColumn") {
    return (
      <CtaBannerTwoColumn
        heading={rest.heading}
        text={rest.text}
        buttonText={rest.buttonText}
        buttonHref={rest.buttonHref}
        backgroundType={rest.backgroundType}
        backgroundImage={rest.backgroundImage}
      />
    );
  }

  return (
    <CtaBannerDefault
      subtitle={rest.subtitle}
      heading={rest.heading}
      text={rest.text}
      buttonText={rest.buttonText}
      buttonHref={rest.buttonHref}
    />
  );
}

export { CtaBannerDefault, CtaBannerTwoColumn };
export { default as CtaBannerDownload } from "./CtaBannerDownload";
