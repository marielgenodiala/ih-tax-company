import { type SchemaTypeDefinition } from "sanity";
import { blogPost } from "./blogPost";
import { teamMember } from "./teamMember";
import { service } from "./service";
import { page } from "./page";
import { seoSettings } from "./seoSettings";
import { sectionTemplate } from "./sectionTemplate";

// Section object types
import { heroSection } from "./sections/heroSection";
import { logoCloudSection } from "./sections/logoCloudSection";
import { statsSection } from "./sections/statsSection";
import { whatYouNeedSection } from "./sections/whatYouNeedSection";
import { servicesSection } from "./sections/servicesSection";
import { statementBannerSection } from "./sections/statementBannerSection";
import { aboutSection } from "./sections/aboutSection";
import { ctaBannerSection } from "./sections/ctaBannerSection";
import { blogPreviewSection } from "./sections/blogPreviewSection";
import { openingHoursSection } from "./sections/openingHoursSection";
import { contactFormSection } from "./sections/contactFormSection";
import { teamGridSection } from "./sections/teamGridSection";
import { navigationSection } from "./sections/navigationSection";
import { footerSection } from "./sections/footerSection";
import { pageHeroSection } from "./sections/pageHeroSection";
import { featuredBookOnlineSection } from "./sections/featuredBookOnlineSection";
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
    // Section objects
    heroSection,
    logoCloudSection,
    statsSection,
    whatYouNeedSection,
    servicesSection,
    statementBannerSection,
    aboutSection,
    ctaBannerSection,
    blogPreviewSection,
    openingHoursSection,
    contactFormSection,
    teamGridSection,
    navigationSection,
    footerSection,
    pageHeroSection,
    featuredBookOnlineSection,
    reusableSection,
  ],
};
