import { defineField, defineType } from "sanity";
import { WhatYouNeedIcon } from "@/components/sanity-schema/SectionIcons";

export const whatYouNeedSection = defineType({
  name: "whatYouNeedSection",
  title: "What You Need",
  type: "object",
  icon: WhatYouNeedIcon,
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
      initialValue: "Inside Business",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: 'Use *asterisks* for blue italic emphasis.',
      initialValue: "We don't just handle accounting — we help your business *grow*",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "text1",
      title: "Paragraph 1",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "text2",
      title: "Paragraph 2",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "useServiceList",
      title: "Use Service List from Sanity",
      type: "boolean",
      description: "When enabled, automatically fetches and displays services from the Services collection.",
      initialValue: false,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare: ({ sectionLabel }) => ({
      title: sectionLabel ? `What You Need — ${sectionLabel}` : "What You Need",
      media: WhatYouNeedIcon,
    }),
  },
});
