import { defineField, defineType } from "sanity";
import { FeaturedBookOnlineIcon } from "@/components/sanity-schema/SectionIcons";

export const featuredBookOnlineSection = defineType({
  name: "featuredBookOnlineSection",
  title: "Featured Book Online",
  type: "object",
  icon: FeaturedBookOnlineIcon,
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
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Wrap text in *asterisks* for blue italic emphasis, e.g. "guide to *success*"',
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "items",
      title: "Featured Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
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
              rows: 3,
            }),
            defineField({
              name: "duration",
              title: "Duration",
              type: "string",
              description: 'e.g. "1 hr"',
            }),
            defineField({
              name: "price",
              title: "Price",
              type: "string",
              description: 'e.g. "$19.99 USD"',
            }),
            defineField({
              name: "buttonText",
              title: "Button Text",
              type: "string",
              initialValue: "Book Now",
            }),
            defineField({
              name: "buttonHref",
              title: "Button Link",
              type: "string",
              description: 'e.g. "/book-online", "/#contact"',
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "price" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare: ({ sectionLabel }) => ({
      title: sectionLabel
        ? `Featured Book Online — ${sectionLabel}`
        : "Featured Book Online",
      media: FeaturedBookOnlineIcon,
    }),
  },
});
