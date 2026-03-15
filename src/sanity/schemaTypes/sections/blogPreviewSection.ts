import { defineField, defineType } from "sanity";
import { BlogPreviewIcon } from "@/components/sanity-schema/SectionIcons";

export const blogPreviewSection = defineType({
  name: "blogPreviewSection",
  title: "Blog Preview",
  type: "object",
  icon: BlogPreviewIcon,
  fields: [
    defineField({
      name: "variant",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { value: "default", title: "Default (3 cards grid + header)" },
          { value: "latestNews", title: "Latest News (featured + 3 side cards, 4 total)" },
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
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Small label above the heading.",
      initialValue: "Latest Insights",
      hidden: ({ parent }) => parent?.variant === "latestNews",
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
      hidden: ({ parent }) => parent?.variant === "latestNews",
    }),
    defineField({
      name: "alignLeft",
      title: "Align Left",
      type: "boolean",
      description: "Align the header text to the left instead of centered.",
      initialValue: false,
      hidden: ({ parent }) => parent?.variant === "latestNews",
    }),
    defineField({
      name: "useBlogList",
      title: "Use Blog List from Sanity",
      type: "boolean",
      description: "When enabled, automatically fetches and displays latest blog posts.",
      initialValue: true,
    }),
    defineField({
      name: "readMoreLabel",
      title: "Read more button label",
      type: "string",
      description: "Label for the link on each blog card (e.g. Read more).",
      initialValue: "Read more",
      hidden: ({ parent }) => parent?.variant === "latestNews",
    }),
    defineField({
      name: "viewAllLabel",
      title: "View all button label",
      type: "string",
      description: "Label for the link below the grid (Latest News layout only).",
      initialValue: "View All Blogs",
      hidden: ({ parent }) => parent?.variant !== "latestNews",
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel", variant: "variant" },
    prepare: ({ sectionLabel, variant }) => ({
      title: sectionLabel ? `Blog Preview — ${sectionLabel}` : "Blog Preview",
      subtitle: variant === "latestNews" ? "Latest News" : "Default",
      media: BlogPreviewIcon,
    }),
  },
});
