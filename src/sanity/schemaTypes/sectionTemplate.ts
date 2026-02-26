import { defineField, defineType } from "sanity";
import { ComponentIcon } from "@sanity/icons";

export const sectionTemplate = defineType({
  name: "sectionTemplate",
  title: "Section Template",
  type: "document",
  icon: ComponentIcon,
  description: "Reusable section templates that can be referenced from any page.",
  fields: [
    defineField({
      name: "name",
      title: "Template Name",
      type: "string",
      description: 'A name to identify this template (e.g. "Main Navigation", "Default Footer").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "section",
      title: "Section",
      type: "array",
      of: [
        { type: "navigationSection" },
        { type: "heroSection" },
        { type: "pageHeroSection" },
        { type: "logoCloudSection" },
        { type: "statsSection" },
        { type: "whatYouNeedSection" },
        { type: "servicesSection" },
        { type: "featuredBookOnlineSection" },
        { type: "statementBannerSection" },
        { type: "aboutSection" },
        { type: "ctaBannerSection" },
        { type: "blogPreviewSection" },
        { type: "openingHoursSection" },
        { type: "contactFormSection" },
        { type: "teamGridSection" },
        { type: "footerSection" },
      ],
      validation: (rule) => rule.max(1).required(),
      description: "The section data to reuse. Only one section per template.",
    }),
  ],
  preview: {
    select: { title: "name", sectionType: "section.0._type" },
    prepare({ title, sectionType }) {
      return {
        title: title || "Untitled Template",
        subtitle: sectionType || "No section",
      };
    },
  },
});
