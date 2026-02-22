import { defineField, defineType } from "sanity";
import { OpeningHoursIcon } from "@/components/sanity-schema/SectionIcons";

export const openingHoursSection = defineType({
  name: "openingHoursSection",
  title: "Opening Hours",
  type: "object",
  icon: OpeningHoursIcon,
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
      initialValue: "Come Visit",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Use *asterisks* for blue italic emphasis.',
      initialValue: "Opening Hours",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 2,
      initialValue: "Level 17, 9 Castlereagh Street\nSydney NSW 2000",
    }),
    defineField({
      name: "hours",
      title: "Hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "days", title: "Days", type: "string" }),
            defineField({ name: "hours", title: "Hours", type: "string" }),
          ],
          preview: {
            select: { title: "days", subtitle: "hours" },
          },
        },
      ],
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
    }),
    defineField({
      name: "buttonHref",
      title: "Button Link",
      type: "string",
      description: 'Accepts: "/book-online", "/#contact", etc.',
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare: ({ sectionLabel }) => ({
      title: sectionLabel ? `Opening Hours — ${sectionLabel}` : "Opening Hours",
      media: OpeningHoursIcon,
    }),
  },
});
