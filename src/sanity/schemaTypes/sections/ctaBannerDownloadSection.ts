import { defineField, defineType } from "sanity";
import { CtaBannerIcon } from "@/components/sanity-schema/SectionIcons";

export const ctaBannerDownloadSection = defineType({
  name: "ctaBannerDownloadSection",
  title: "CTA Banner (Download PDF)",
  type: "object",
  icon: CtaBannerIcon,
  description:
    "Title and PDF only — opens the file in a new tab (view or download).",
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: "Optional label to distinguish sections in the list.",
    }),
    defineField({
      name: "heading",
      title: "Title",
      type: "string",
      description: "e.g. Download our Tax Calendar FY 2026. Use *asterisks* for italic.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pdfFile",
      title: "PDF file",
      type: "file",
      options: {
        accept: "application/pdf",
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel", heading: "heading" },
    prepare({ sectionLabel, heading }) {
      return {
        title: sectionLabel
          ? `CTA Download — ${sectionLabel}`
          : "CTA Banner (Download PDF)",
        subtitle: heading || "Add title and PDF",
      };
    },
  },
});
