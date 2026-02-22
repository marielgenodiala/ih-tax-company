import { defineField, defineType } from "sanity";
import { AboutIcon } from "@/components/sanity-schema/SectionIcons";

export const aboutSection = defineType({
  name: "aboutSection",
  title: "About",
  type: "object",
  icon: AboutIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: "Optional label to distinguish sections.",
    }),
    defineField({
      name: "label",
      title: "Section Label Text",
      type: "string",
      initialValue: "Our Way",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: 'Use *asterisks* for blue italic emphasis.',
      initialValue: "Your business advisor, tax planner, and guide to *success*",
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
      name: "buttonText",
      title: "Button Text",
      type: "string",
    }),
    defineField({
      name: "buttonHref",
      title: "Button Link",
      type: "string",
      description: 'Accepts: "/team", "team", "/book-online", "/#contact".',
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
      title: sectionLabel ? `About — ${sectionLabel}` : "About",
      media: AboutIcon,
    }),
  },
});
