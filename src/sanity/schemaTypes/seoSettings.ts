import { defineField, defineType } from "sanity";

export const seoSettings = defineType({
  name: "seoSettings",
  title: "SEO Settings",
  type: "document",
  fields: [
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "The default title tag for the site (e.g. \"I H Professionals & Co. | Tax Agents Sydney\").",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Default meta description for search engines.",
    }),
    defineField({
      name: "seoImage",
      title: "SEO Image",
      type: "image",
      description: "Default Open Graph image for social sharing.",
      options: { hotspot: true },
    }),
    defineField({
      name: "seoKeywords",
      title: "SEO Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Keywords for search engine optimization.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "SEO Settings" }),
  },
});
