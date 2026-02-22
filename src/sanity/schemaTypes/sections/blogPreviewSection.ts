import { defineField, defineType } from "sanity";
import { BlogPreviewIcon } from "@/components/sanity-schema/SectionIcons";

export const blogPreviewSection = defineType({
  name: "blogPreviewSection",
  title: "Blog Preview",
  type: "object",
  icon: BlogPreviewIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: "Optional label to distinguish sections.",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Small label above the heading.",
      initialValue: "Latest Insights",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Use *asterisks* for blue italic emphasis.',
      initialValue: "From Our Blog",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      initialValue: "Stay informed with the latest tax tips and business updates.",
    }),
    defineField({
      name: "alignLeft",
      title: "Align Left",
      type: "boolean",
      description: "Align the header text to the left instead of centered.",
      initialValue: false,
    }),
    defineField({
      name: "useBlogList",
      title: "Use Blog List from Sanity",
      type: "boolean",
      description: "When enabled, automatically fetches and displays latest blog posts.",
      initialValue: true,
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare: ({ sectionLabel }) => ({
      title: sectionLabel ? `Blog Preview — ${sectionLabel}` : "Blog Preview",
      media: BlogPreviewIcon,
    }),
  },
});
