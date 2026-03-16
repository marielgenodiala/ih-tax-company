import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const servicesHeaderSection = defineType({
  name: "servicesHeaderSection",
  title: "Services Header",
  type: "object",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Default (title + visual / accreditation)", value: "default" },
          { title: "Intro with value pillars", value: "introWithPillars" },
          { title: "Service Lead + checklist", value: "leadChecklist" },
        ],
      },
      initialValue: "default",
    }),
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: "e.g. About Our Accounting, Why We Partner",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Use *asterisks* for blue italic emphasis.',
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Content under the title. For Service Lead + checklist, use normal paragraphs and a Quote block for the highlighted callout.",
    }),
    defineField({
      name: "visualLabel",
      title: "Visual label",
      type: "string",
      description: "Text inside the right-side visual box (e.g. Accounting).",
      hidden: ({ parent }) => parent?.variant !== "default",
    }),
    defineField({
      name: "accredBadgeTitle",
      title: "Accreditation badge — Title",
      type: "string",
      description: "e.g. Registered & Accredited",
      hidden: ({ parent }) => parent?.variant !== "default",
    }),
    defineField({
      name: "accredChips",
      title: "Accreditation chips",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g. CPA Australia, TPB Registered",
      hidden: ({ parent }) => parent?.variant !== "default",
    }),
    defineField({
      name: "valuePillars",
      title: "Value pillars",
      type: "array",
      description: "For Intro with value pillars variant. Up to 4 pillars.",
      hidden: ({ parent }) => parent?.variant !== "introWithPillars",
      of: [
        {
          type: "object",
          name: "valuePillar",
          fields: [
            defineField({
              name: "iconKey",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Shield (value)", value: "shield" },
                  { title: "Check (quality)", value: "check" },
                  { title: "Clock (reliability)", value: "clock" },
                  { title: "Lightbulb (innovation)", value: "lightbulb" },
                ],
              },
            }),
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: title || "Pillar" }) },
        },
      ],
    }),
    // Lead content + checklist variant (Bookkeeping service style)
    defineField({
      name: "checklistHeading",
      title: "Checklist heading",
      type: "string",
      description: 'e.g. "What’s Included".',
      hidden: ({ parent }) => parent?.variant !== "leadChecklist",
      initialValue: "What's Included",
    }),
    defineField({
      name: "checklistSubheading",
      title: "Checklist subheading",
      type: "string",
      description: 'Short line under the heading (e.g. "Everything you need, handled end-to-end").',
      hidden: ({ parent }) => parent?.variant !== "leadChecklist",
      initialValue: "Everything you need, handled end-to-end",
    }),
    defineField({
      name: "checklistItems",
      title: "Checklist items",
      type: "array",
      description: "Items in the 'What’s Included' checklist column.",
      hidden: ({ parent }) => parent?.variant !== "leadChecklist",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Item title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "description",
              title: "Item description",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "title" },
            prepare: ({ title }) => ({
              title: title || "Checklist item",
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel", title: "title", variant: "variant" },
    prepare: ({ sectionLabel, title, variant }) => ({
      title: sectionLabel || "Services Header",
      subtitle: variant === "introWithPillars" ? "Intro + pillars" : title ? undefined : "About Our Accounting",
      media: DocumentIcon,
    }),
  },
});
