import { defineField, defineType } from "sanity";

export const seoObject = defineType({
  name: "seoObject",
  title: "SEO Settings",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Override the page title for search engines. Leave blank to use the default.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Override the meta description. Leave blank to use the default.",
    }),
    defineField({
      name: "metaKeywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Keywords for this specific page.",
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      description: "Image shown when shared on social media. Leave blank to use the default.",
      options: { hotspot: true },
    }),
  ],
});
