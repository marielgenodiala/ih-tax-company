import HeroHome from "./HeroHome";
import HeroHomeFullscreen from "./HeroHomeFullscreen";
import HeroPage from "./HeroPage";
import type { HeroHomeProps } from "./HeroHome";
import type { HeroHomeFullscreenProps } from "./HeroHomeFullscreen";

export type HeroVariant = "home" | "homeFullscreen" | "page";

export interface HeroSectionProps {
  _type: "heroSection" | "pageHeroSection";
  variant?: HeroVariant;
  [key: string]: unknown;
}

/**
 * Renders the appropriate hero variant. Add new variants here and in Sanity when needed.
 * - heroSection + variant "home" → HeroHome (landing hero with CTAs)
 * - heroSection + variant "homeFullscreen" → HeroHomeFullscreen (full viewport, swiping background images)
 * - pageHeroSection → HeroPage (simple title + description)
 */
export default function HeroSection(props: HeroSectionProps) {
  const { _type, variant, ...rest } = props;

  if (_type === "pageHeroSection" || variant === "page") {
    return (
      <HeroPage
        title={rest.title as string}
        description={rest.description as string}
        backgroundImage={rest.backgroundImage as string}
      />
    );
  }

  if (variant === "homeFullscreen") {
    return (
      <HeroHomeFullscreen
        subtitle={rest.subtitle as string}
        title={rest.title as string}
        description={rest.description as string}
        backgroundImages={
          rest.backgroundImages as HeroHomeFullscreenProps["backgroundImages"]
        }
        ctaPrimaryLabel={rest.ctaPrimaryLabel as string | undefined}
        ctaPrimaryHref={rest.ctaPrimaryHref as string | undefined}
        ctaSecondaryLabel={rest.ctaSecondaryLabel as string | undefined}
        ctaSecondaryHref={rest.ctaSecondaryHref as string | undefined}
      />
    );
  }

  return (
    <HeroHome
      subtitle={rest.subtitle as string}
      title={rest.title as string}
      description={rest.description as string}
      backgroundImage={rest.backgroundImage as HeroHomeProps["backgroundImage"]}
      ctaPrimaryLabel={rest.ctaPrimaryLabel as string | undefined}
      ctaPrimaryHref={rest.ctaPrimaryHref as string | undefined}
      ctaSecondaryLabel={rest.ctaSecondaryLabel as string | undefined}
      ctaSecondaryHref={rest.ctaSecondaryHref as string | undefined}
    />
  );
}

// Re-export variants for direct use or future variant field in CMS
export { HeroHome, HeroHomeFullscreen, HeroPage };
