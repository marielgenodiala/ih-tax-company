import { defineField, defineType } from "sanity";
import { HeroIcon } from "@/components/sanity-schema/SectionIcons";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  icon: HeroIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: 'Optional label to distinguish sections (e.g. "hero_1").',
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Home (with CTAs)", value: "home" },
          {
            title: "Home fullscreen (swiping background images)",
            value: "homeFullscreen",
          },
          { title: "Services (banner + breadcrumb + CTAs)", value: "services" },
        ],
      },
      initialValue: "home",
      description: "Hero visual/layout variant.",
    }),
    defineField({
      name: "breadcrumb",
      title: "Breadcrumb",
      type: "array",
      description: "Add one item per step. Example: 1) Label « Home », URL « / » 2) Label « Accounting », URL empty (current page). Shows as: Home › Accounting",
      hidden: ({ parent }) => parent?.variant !== "services",
      of: [
        {
          type: "object",
          name: "breadcrumbItem",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "One word or phrase for this step only (e.g. Home, Accounting, Bookkeeping). Do not type « Home > Accounting » here — add a separate item for each.",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "string",
              description: "Link for this step. Leave empty only for the current page (usually the last item). Use / for home.",
            }),
          ],
          preview: { select: { label: "label" }, prepare: ({ label }) => ({ title: label || "Item" }) },
        },
      ],
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      description: "Small label above title (e.g. Our Services). For Services variant.",
      hidden: ({ parent }) => parent?.variant !== "services",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      initialValue: "Registered Tax Agent · Business Consultant · Sydney NSW",
      hidden: ({ parent }) => parent?.variant === "services",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "text",
      rows: 2,
      description:
        "Use *asterisks* for italic emphasis. Press Enter for a line break.",
      initialValue: "Feel the *I H Professionals*\nDifference",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      initialValue:
        "The care your accounting needs. We provide unparalleled personalised accounting services to individuals and businesses across Australia.",
    }),
    defineField({
      name: "ctaPrimaryLabel",
      title: "Primary button — Label",
      type: "string",
      initialValue: "Book a Consultation",
    }),
    defineField({
      name: "ctaPrimaryHref",
      title: "Primary button — URL",
      type: "string",
      initialValue: "/book-online",
    }),
    defineField({
      name: "ctaSecondaryLabel",
      title: "Secondary button — Label",
      type: "string",
      initialValue: "Our Services",
    }),
    defineField({
      name: "ctaSecondaryHref",
      title: "Secondary button — URL",
      type: "string",
      initialValue: "#services",
    }),
    defineField({
      name: "servicesBackgroundType",
      title: "Services background",
      type: "string",
      options: {
        list: [
          { title: "Blue (default)", value: "blue" },
          { title: "Image", value: "image" },
        ],
      },
      initialValue: "blue",
      hidden: ({ parent }) => parent?.variant !== "services",
    }),
    defineField({
      name: "servicesBackgroundImage",
      title: "Services background image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) =>
        parent?.variant !== "services" ||
        parent?.servicesBackgroundType !== "image",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.variant === "homeFullscreen" || parent?.variant === "services",
    }),
    defineField({
      name: "backgroundImages",
      title: "Background Images (carousel)",
      type: "array",
      description:
        "Images auto-swipe as the hero background. Used when variant is Home fullscreen.",
      hidden: ({ parent }) => parent?.variant !== "homeFullscreen",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      validation: (rule) =>
        rule.custom((val, ctx) => {
          const parent = ctx.parent as { variant?: string } | undefined;
          if (
            parent?.variant === "homeFullscreen" &&
            (!val || (Array.isArray(val) && val.length === 0))
          )
            return "Add at least one image for the fullscreen hero.";
          return true;
        }),
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare: ({ sectionLabel }) => ({
      title: sectionLabel ? `Hero — ${sectionLabel}` : "Hero",
      media: HeroIcon,
    }),
  },
});
