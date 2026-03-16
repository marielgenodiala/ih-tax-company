import { defineField, defineType } from "sanity";
import { PageHeroIcon } from "@/components/sanity-schema/SectionIcons";

export const pageHeroSection = defineType({
  name: "pageHeroSection",
  title: "Page Hero",
  type: "object",
  icon: PageHeroIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: "Optional label to distinguish sections.",
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Page (title + description)", value: "page" },
          { title: "Services (banner + breadcrumb + CTAs)", value: "services" },
        ],
      },
      initialValue: "page",
      description: "Page hero variant.",
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
              description: "One word or phrase for this step only (e.g. Home, Accounting). Do not type « Home > Accounting » — add a separate item for each step.",
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
      description: "Small label above title (e.g. Our Services).",
      hidden: ({ parent }) => parent?.variant !== "services",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Wrap text in *asterisks* for blue italic emphasis, e.g. "guide to *success*"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ctaPrimaryLabel",
      title: "Primary button — Label",
      type: "string",
      hidden: ({ parent }) => parent?.variant !== "services",
    }),
    defineField({
      name: "ctaPrimaryHref",
      title: "Primary button — URL",
      type: "string",
      hidden: ({ parent }) => parent?.variant !== "services",
    }),
    defineField({
      name: "ctaSecondaryLabel",
      title: "Secondary button — Label",
      type: "string",
      hidden: ({ parent }) => parent?.variant !== "services",
    }),
    defineField({
      name: "ctaSecondaryHref",
      title: "Secondary button — URL",
      type: "string",
      hidden: ({ parent }) => parent?.variant !== "services",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.variant === "services",
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel", variant: "variant" },
    prepare: ({ sectionLabel, variant }) => ({
      title: sectionLabel ? `Page Hero — ${sectionLabel}` : "Page Hero",
      subtitle: variant === "services" ? "Services banner" : undefined,
      media: PageHeroIcon,
    }),
  },
});
