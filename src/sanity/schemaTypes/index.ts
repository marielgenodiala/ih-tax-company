import { type SchemaTypeDefinition } from "sanity";
import { blogPost } from "./blogPost";
import { teamMember } from "./teamMember";
import { service } from "./service";
import { page } from "./page";
import { seoSettings } from "./seoSettings";
import { sectionTemplate } from "./sectionTemplate";
import { seoObject } from "./objects/seoObject";

// Section object types
import { heroSection } from "./sections/heroSection";
import { logoCloudSection } from "./sections/logoCloudSection";
import { statsSection } from "./sections/statsSection";
import { whatYouNeedSection } from "./sections/whatYouNeedSection";
import { servicesSection } from "./sections/servicesSection";
import { servicesHeaderSection } from "./sections/servicesHeaderSection";
import { statementBannerSection } from "./sections/statementBannerSection";
import { aboutSection } from "./sections/aboutSection";
import { ctaBannerSection } from "./sections/ctaBannerSection";
import { blogPreviewSection } from "./sections/blogPreviewSection";
import { openingHoursSection } from "./sections/openingHoursSection";
import { contactFormSection } from "./sections/contactFormSection";
import { teamGridSection } from "./sections/teamGridSection";
import { navigationSection } from "./sections/navigationSection";
import { footerSection } from "./sections/footerSection";
import { footerTwoPartSection } from "./sections/footerTwoPartSection";
import { pageHeroSection } from "./sections/pageHeroSection";
import { featuredBookOnlineSection } from "./sections/featuredBookOnlineSection";
import { contactPageSection } from "./sections/contactPageSection";
import { googleReviewsSection } from "./sections/googleReviewsSection";
import { reusableSection } from "./sections/reusableSection";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    page,
    blogPost,
    teamMember,
    service,
    seoSettings,
    sectionTemplate,
    // Objects
    seoObject,
    // Section objects
    heroSection,
    logoCloudSection,
    statsSection,
    whatYouNeedSection,
    servicesSection,
    servicesHeaderSection,
    statementBannerSection,
    aboutSection,
    ctaBannerSection,
    blogPreviewSection,
    openingHoursSection,
    contactFormSection,
    teamGridSection,
    navigationSection,
    footerSection,
    footerTwoPartSection,
    pageHeroSection,
    featuredBookOnlineSection,
    contactPageSection,
    googleReviewsSection,
    reusableSection,
  ],
};
