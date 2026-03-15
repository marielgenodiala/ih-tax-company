import HeroSection from "./hero";
import NavSection from "./nav";
import FooterSection from "./footer";
import FooterTwoPart from "./footer/FooterTwoPart";
import LogoCloud from "./logoCloud";
import Stats from "./stats";
import WhatYouNeed from "./whatYouNeed";
import Services from "./services";
import FeaturedBookOnline from "./featuredBookOnline";
import StatementBanner from "./statementBanner";
import About from "./about";
import CtaBanner from "./ctaBanner";
import BlogPreview from "./blogPreview";
import OpeningHours from "./openingHours";
import ContactForm from "./contactForm";
import ContactPageSection from "./contactPage";
import TeamGrid from "./teamGrid";
import GoogleReviews from "./googleReviews";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Section {
  _type: string;
  _key: string;
  [key: string]: any;
}

const sectionComponents: Record<string, React.ComponentType<any>> = {
  navigationSection: NavSection,
  heroSection: HeroSection,
  pageHeroSection: HeroSection,
  logoCloudSection: LogoCloud,
  statsSection: Stats,
  whatYouNeedSection: WhatYouNeed,
  servicesSection: Services,
  featuredBookOnlineSection: FeaturedBookOnline,
  statementBannerSection: StatementBanner,
  aboutSection: About,
  ctaBannerSection: CtaBanner,
  blogPreviewSection: BlogPreview,
  openingHoursSection: OpeningHours,
  contactFormSection: ContactForm,
  contactPageSection: ContactPageSection,
  teamGridSection: TeamGrid,
  googleReviewsSection: GoogleReviews,
  footerSection: FooterSection,
  footerTwoPartSection: FooterTwoPart,
};

export default function SectionRenderer({ sections }: { sections: Section[] }) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section) => {
        const Component = sectionComponents[section._type];
        if (!Component) return null;

        const { _type, _key, ...props } = section;
        return <Component key={_key} _type={_type} {...props} />;
      })}
    </>
  );
}
