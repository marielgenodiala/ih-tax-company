import { defineField, defineType } from "sanity";
import { PageUrlPreview } from "../components/PageUrlPreview";

export const blogPost = defineType({
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageUrl",
      title: "Page URL",
      type: "string",
      components: { input: PageUrlPreview },
      readOnly: true,
    }),
    defineField({
      name: "date",
      title: "Publication Date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Resources", value: "Resources" },
          { title: "Grants", value: "Grants" },
          { title: "Rebates", value: "Rebates" },
          { title: "Support Packages", value: "Support Packages" },
        ],
      },
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time",
      type: "string",
      description: 'e.g. "3 Min"',
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    validation: (rule) =>
                      rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
                  },
                  {
                    name: "blank",
                    type: "boolean",
                    title: "Open in new tab",
                    initialValue: true,
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        },
        {
          name: "contactBlock",
          title: "Contact Block",
          type: "object",
          fields: [
            defineField({
              name: "companyName",
              title: "Company Name",
              type: "string",
              initialValue: "I H Professionals & Co Pty Ltd",
            }),
            defineField({
              name: "address",
              title: "Address",
              type: "string",
              initialValue: "Level 17, 9 Castlereagh Street SYDNEY NSW 2000",
            }),
            defineField({
              name: "email",
              title: "Email",
              type: "string",
              initialValue: "info@ihprofessionals.com.au",
            }),
            defineField({
              name: "website",
              title: "Website",
              type: "string",
              initialValue: "www.ihprofessionals.com",
            }),
            defineField({
              name: "phone",
              title: "Phone",
              type: "string",
              initialValue: "02 8041 8276",
            }),
          ],
          preview: {
            prepare: () => ({ title: "Contact Block" }),
          },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Date (Newest)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      media: "image",
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date,
        media,
      };
    },
  },
});
