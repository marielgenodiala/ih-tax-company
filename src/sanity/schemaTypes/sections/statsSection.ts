import { defineField, defineType } from "sanity";
import { StatsIcon } from "@/components/sanity-schema/SectionIcons";

export const statsSection = defineType({
  name: "statsSection",
  title: "Stats",
  type: "object",
  icon: StatsIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: "Optional label to distinguish sections.",
    }),
    defineField({
      name: "variant",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Default (simple grid)", value: "default" },
          {
            title: "With partners (3 per row, short desc, partner logos)",
            value: "withPartners",
          },
        ],
      },
      initialValue: "default",
      description: "Stats section layout variant.",
    }),
    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "number", title: "Number", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: {
            select: { title: "number", subtitle: "label" },
          },
        },
      ],
    }),
    defineField({
      name: "shortDesc",
      title: "Short Description",
      type: "string",
      description: "Brief text shown below the stats (e.g. 'We Collaborate With 1500+ Companies').",
      hidden: ({ parent }) => parent?.variant !== "withPartners",
    }),
    defineField({
      name: "partners",
      title: "Partners",
      type: "array",
      description: "Partner logos/text displayed below the short description.",
      hidden: ({ parent }) => parent?.variant !== "withPartners",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              description: "Optional partner logo or icon.",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: "Partner name or label (e.g. 'Logoipsum').",
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "url",
              description: "Optional URL for the partner.",
            }),
          ],
          preview: {
            select: { title: "title", media: "image" },
            prepare: ({ title, media }) => ({
              title: title || "Partner",
              media,
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare: ({ sectionLabel }) => ({
      title: sectionLabel ? `Stats — ${sectionLabel}` : "Stats",
      media: StatsIcon,
    }),
  },
});
