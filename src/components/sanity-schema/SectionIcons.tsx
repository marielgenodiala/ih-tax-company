/* eslint-disable @next/next/no-img-element */
import React from "react";

function createSectionIcon(src: string, alt: string) {
  return function SectionIcon() {
    return (
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          borderRadius: "2px",
        }}
      />
    );
  };
}

export const HeroIcon = createSectionIcon(
  "/images/section-previews/hero.png",
  "Hero section"
);

export const LogoCloudIcon = createSectionIcon(
  "/images/section-previews/logo-cloud.png",
  "Logo Cloud section"
);

export const StatsIcon = createSectionIcon(
  "/images/section-previews/stats.png",
  "Stats section"
);

export const WhatYouNeedIcon = createSectionIcon(
  "/images/section-previews/what-you-need.png",
  "What You Need section"
);

export const ServicesIcon = createSectionIcon(
  "/images/section-previews/services.png",
  "Services section"
);

export const StatementBannerIcon = createSectionIcon(
  "/images/section-previews/statement-banner.png",
  "Statement Banner section"
);

export const AboutIcon = createSectionIcon(
  "/images/section-previews/about.png",
  "About section"
);

export const CtaBannerIcon = createSectionIcon(
  "/images/section-previews/cta-banner.png",
  "CTA Banner section"
);

export const BlogPreviewIcon = createSectionIcon(
  "/images/section-previews/blog-preview.png",
  "Blog Preview section"
);

export const OpeningHoursIcon = createSectionIcon(
  "/images/section-previews/opening-hours.png",
  "Opening Hours section"
);

export const ContactFormIcon = createSectionIcon(
  "/images/section-previews/contact-form.png",
  "Contact Form section"
);

export const TeamGridIcon = createSectionIcon(
  "/images/section-previews/team-grid.png",
  "Team Grid section"
);

export const NavigationIcon = createSectionIcon(
  "/images/section-previews/navigation.png",
  "Navigation section"
);

export const FooterIcon = createSectionIcon(
  "/images/section-previews/footer.png",
  "Footer section"
);

export const PageHeroIcon = createSectionIcon(
  "/images/section-previews/page-hero.png",
  "Page Hero section"
);

export const FeaturedBookOnlineIcon = createSectionIcon(
  "/images/section-previews/featured-book-online.png",
  "Featured Book Online section"
);
