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
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare: ({ sectionLabel }) => ({
      title: sectionLabel ? `Stats — ${sectionLabel}` : "Stats",
      media: StatsIcon,
    }),
  },
});
