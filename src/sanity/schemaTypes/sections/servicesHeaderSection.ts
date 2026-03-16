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
      description: "Paragraphs below the title.",
    }),
    defineField({
      name: "visualLabel",
      title: "Visual label",
      type: "string",
      description: "Text inside the right-side visual box (e.g. Accounting).",
      hidden: ({ parent }) => parent?.variant === "introWithPillars",
    }),
    defineField({
      name: "accredBadgeTitle",
      title: "Accreditation badge — Title",
      type: "string",
      description: "e.g. Registered & Accredited",
      hidden: ({ parent }) => parent?.variant === "introWithPillars",
    }),
    defineField({
      name: "accredChips",
      title: "Accreditation chips",
      type: "array",
      of: [{ type: "string" }],
      description: "e.g. CPA Australia, TPB Registered",
      hidden: ({ parent }) => parent?.variant === "introWithPillars",
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
