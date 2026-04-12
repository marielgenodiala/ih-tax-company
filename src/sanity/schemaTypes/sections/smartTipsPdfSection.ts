import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";

const filterItem = {
  type: "object",
  name: "smartTipsFilter",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Filter key",
      type: "string",
      description:
        'Lowercase slug, e.g. "all", "tax", "business". Cards use the same key in “Filter tags”.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "slug" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title || "Filter", subtitle };
    },
  },
};

const tipCard = {
  type: "object",
  name: "smartTipsCard",
  fields: [
    defineField({
      name: "category",
      title: "Category line",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pdfFile",
      title: "PDF file",
      type: "file",
      options: { accept: "application/pdf" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pagesMeta",
      title: "Pages meta (e.g. 5 pages)",
      type: "string",
      initialValue: "5 pages",
    }),
    defineField({
      name: "dateMeta",
      title: "Date / year meta (e.g. 2025)",
      type: "string",
      initialValue: "2025",
    }),
    defineField({
      name: "filterTags",
      title: "Filter tags",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Which filters show this card (slugs from Filters). Leave empty to show for every filter.",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return { title: title || "Tip card", subtitle };
    },
  },
};

export const smartTipsPdfSection = defineType({
  name: "smartTipsPdfSection",
  title: "Smart Tips (PDF)",
  type: "object",
  icon: DocumentIcon,
  description:
    "Filter bar, featured PDF, and a grid of downloadable PDFs (one upload per card). Colours follow site branding.",
  fields: [
    defineField({
      name: "filterLabel",
      title: "Filter row label",
      type: "string",
      initialValue: "Filter:",
    }),
    defineField({
      name: "filters",
      title: "Filters",
      type: "array",
      of: [filterItem],
      validation: (rule) => rule.min(1),
      initialValue: [
        { label: "All Resources", slug: "all" },
        { label: "Tax", slug: "tax" },
        { label: "Business", slug: "business" },
        { label: "Cashflow", slug: "cashflow" },
        { label: "Compliance", slug: "compliance" },
        { label: "Super", slug: "super" },
      ],
    }),
    defineField({
      name: "featuredTag",
      title: "Featured — tag line",
      type: "string",
      description: 'e.g. "Featured Guide · Tax Planning"',
    }),
    defineField({
      name: "featuredTitle",
      title: "Featured — title (line 1)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featuredTitleItalic",
      title: "Featured — title (italic line)",
      type: "string",
      description: "Second line, shown in italic accent colour.",
    }),
    defineField({
      name: "featuredDescription",
      title: "Featured — description",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featuredPdf",
      title: "Featured — PDF",
      type: "file",
      options: { accept: "application/pdf" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featuredMetaPages",
      title: "Featured — pages meta",
      type: "string",
      initialValue: "8 pages · PDF",
    }),
    defineField({
      name: "featuredMetaUpdated",
      title: "Featured — updated meta",
      type: "string",
      initialValue: "Updated May 2025",
    }),
    defineField({
      name: "featuredPdfPreviewTitle",
      title: "Featured — PDF mock header text",
      type: "string",
      initialValue: "EOFY CHECKLIST 2025",
    }),
    defineField({
      name: "featuredPdfBadge",
      title: "Featured — corner badge",
      type: "string",
      initialValue: "Free PDF",
    }),
    defineField({
      name: "downloadButtonLabel",
      title: "Featured — primary button label",
      type: "string",
      initialValue: "Download Free PDF",
    }),
    defineField({
      name: "featuredFilterTags",
      title: "Featured — filter tags",
      type: "array",
      of: [{ type: "string" }],
      description: "Which filters show the featured block; empty = all.",
    }),
    defineField({
      name: "tipCards",
      title: "Tip cards",
      type: "array",
      of: [tipCard],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: { title: "featuredTitle" },
    prepare({ title }: { title?: string }) {
      return {
        title: "Smart Tips (PDF)",
        subtitle: title || "Add featured title",
      };
    },
  },
});
