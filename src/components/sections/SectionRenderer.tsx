import Hero from "./Hero";
import LogoCloud from "./LogoCloud";
import Stats from "./Stats";
import WhatYouNeed from "./WhatYouNeed";
import Services from "./Services";
import StatementBanner from "./StatementBanner";
import About from "./About";
import CtaBanner from "./CtaBanner";
import BlogPreview from "./BlogPreview";
import OpeningHours from "./OpeningHours";
import ContactForm from "./ContactForm";
import TeamGrid from "./TeamGrid";
import PageHero from "./PageHero";
import FeaturedBookOnline from "./FeaturedBookOnline";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Section {
  _type: string;
  _key: string;
  [key: string]: any;
}

const sectionComponents: Record<string, React.ComponentType<any>> = {
  navigationSection: Header,
  heroSection: Hero,
  pageHeroSection: PageHero,
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
  teamGridSection: TeamGrid,
  footerSection: Footer,
};

export default function SectionRenderer({ sections }: { sections: Section[] }) {
  if (!sections?.length) return null;

  return (
    <>
      {sections.map((section) => {
        const Component = sectionComponents[section._type];
        if (!Component) return null;

        const { _type, _key, ...props } = section;
        return <Component key={_key} {...props} />;
      })}
    </>
  );
}
