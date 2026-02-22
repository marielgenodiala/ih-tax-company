import { defineField, defineType } from "sanity";
import { StatementBannerIcon } from "@/components/sanity-schema/SectionIcons";

export const statementBannerSection = defineType({
  name: "statementBannerSection",
  title: "Statement Banner",
  type: "object",
  icon: StatementBannerIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: "Optional label to distinguish sections.",
    }),
    defineField({
      name: "statement",
      title: "Statement Text",
      type: "text",
      rows: 3,
      description: 'Use *asterisks* for italic emphasis.',
      initialValue: "I H Professionals & Co Pty Ltd provides *unparalleled personalised accounting services* to a broad range of clients across Australia. As your certified accountants, we ensure all of your financial decisions are made carefully and with your *best interests* in mind.",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare: ({ sectionLabel }) => ({
      title: sectionLabel ? `Statement Banner — ${sectionLabel}` : "Statement Banner",
      media: StatementBannerIcon,
    }),
  },
});
