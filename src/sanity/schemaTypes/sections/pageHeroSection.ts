import { defineField, defineType } from "sanity";
import { PageHeroIcon } from "@/components/sanity-schema/SectionIcons";

export const pageHeroSection = defineType({
  name: "pageHeroSection",
  title: "Page Hero",
  type: "object",
  icon: PageHeroIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: "Optional label to distinguish sections.",
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
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare: ({ sectionLabel }) => ({
      title: sectionLabel ? `Page Hero — ${sectionLabel}` : "Page Hero",
      media: PageHeroIcon,
    }),
  },
});
