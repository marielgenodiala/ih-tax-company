import { defineField, defineType } from "sanity";
import { StatementBannerIcon } from "@/components/sanity-schema/SectionIcons";

export const statementBannerSection = defineType({
  name: "statementBannerSection",
  title: "Statement Banner",
  type: "object",
  icon: StatementBannerIcon,
  fields: [
    defineField({
      name: "variant",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { value: "default", title: "Default (statement + background image)" },
          { value: "titleContent", title: "Title + content blocks (solid dark banner)" },
        ],
      },
      initialValue: "default",
    }),
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: "Optional label to distinguish sections.",
    }),
    // —— Default variant only ——
    defineField({
      name: "statement",
      title: "Statement Text",
      type: "text",
      rows: 3,
      description: 'Use *asterisks* for italic emphasis.',
      initialValue: "I H Professionals & Co Pty Ltd provides *unparalleled personalised accounting services* to a broad range of clients across Australia. As your certified accountants, we ensure all of your financial decisions are made carefully and with your *best interests* in mind.",
      hidden: ({ parent }) => parent?.variant === "titleContent",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.variant === "titleContent",
    }),
    // —— Title + content variant only ——
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Main heading (e.g. “We Take Your Debt Relief Seriously”).",
      hidden: ({ parent }) => parent?.variant !== "titleContent",
    }),
    defineField({
      name: "contentBlocks",
      title: "Content blocks",
      type: "array",
      description: "One or more paragraphs of body text.",
      hidden: ({ parent }) => parent?.variant !== "titleContent",
      of: [
        {
          type: "object",
          name: "contentBlock",
          fields: [
            {
              name: "text",
              title: "Paragraph",
              type: "text",
              rows: 4,
              description: 'Use *asterisks* for italic emphasis.',
            },
          ],
          preview: {
            select: { text: "text" },
            prepare: ({ text }) => ({
              title: text ? `${String(text).slice(0, 50)}${String(text).length > 50 ? "…" : ""}` : "Paragraph",
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel", variant: "variant" },
    prepare: ({ sectionLabel, variant }) => ({
      title: sectionLabel ? `Statement Banner — ${sectionLabel}` : "Statement Banner",
      subtitle: variant === "titleContent" ? "Title + content" : "Default",
      media: StatementBannerIcon,
    }),
  },
});
