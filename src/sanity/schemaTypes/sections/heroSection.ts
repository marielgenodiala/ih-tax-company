import { defineField, defineType } from "sanity";
import { HeroIcon } from "@/components/sanity-schema/SectionIcons";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero",
  type: "object",
  icon: HeroIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: 'Optional label to distinguish sections (e.g. "hero_1").',
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      initialValue: "Registered Tax Agent · Business Consultant · Sydney NSW",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "text",
      rows: 2,
      description: 'Use *asterisks* for italic emphasis. Press Enter for a line break.',
      initialValue: "Feel the *I H Professionals*\nDifference",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      initialValue: "The care your accounting needs. We provide unparalleled personalised accounting services to individuals and businesses across Australia.",
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
      title: sectionLabel ? `Hero — ${sectionLabel}` : "Hero",
      media: HeroIcon,
    }),
  },
});
