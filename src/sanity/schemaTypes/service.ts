import { defineField, defineType } from "sanity";
import { TagIcon } from "@sanity/icons";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "categorySegment",
      title: "Category URL Segment",
      type: "string",
      description:
        'Top-level URL segment for this service (e.g. "accounting", "taxation"). Final URL will be /{categorySegment}/{slug}.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Service Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      description:
        'Slug for the service name (e.g. "bookkeeping-services", "bas-and-ias-lodgement"). Final URL will be /{categorySegment}/{slug}.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "sections",
      title: "Page Sections",
      type: "array",
      description:
        "Sections that make up this service page (hero, content blocks, FAQs, contact, etc.).",
      of: [
        { type: "navigationSection" },
        { type: "heroSection" },
        { type: "pageHeroSection" },
        { type: "logoCloudSection" },
        { type: "statsSection" },
        { type: "whatYouNeedSection" },
        { type: "servicesSection" },
        { type: "servicesHeaderSection" },
        { type: "missionVisionSection" },
        { type: "smartTipsPdfSection" },
        { type: "featuredBookOnlineSection" },
        { type: "statementBannerSection" },
        { type: "aboutSection" },
        { type: "ctaBannerSection" },
        { type: "ctaBannerDownloadSection" },
        { type: "blogPreviewSection" },
        { type: "openingHoursSection" },
        { type: "contactFormSection" },
        { type: "contactPageSection" },
        { type: "teamGridSection" },
        { type: "googleReviewsSection" },
        { type: "footerSection" },
        { type: "footerTwoPartSection" },
        { type: "reusableSection" },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seoObject",
      description:
        "Optional SEO overrides for this service page. Leave blank to fall back to global SEO settings.",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "price",
    },
  },
});
