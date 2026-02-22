import { defineField, defineType } from "sanity";
import { ServicesIcon } from "@/components/sanity-schema/SectionIcons";

export const servicesSection = defineType({
  name: "servicesSection",
  title: "Services",
  type: "object",
  icon: ServicesIcon,
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
      initialValue: "Services",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Use *asterisks* for blue italic emphasis.',
      initialValue: "What You Need",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      initialValue: "Comprehensive taxation and accounting solutions tailored to your needs.",
    }),
    defineField({
      name: "useServiceList",
      title: "Use Service List from Sanity",
      type: "boolean",
      description: "When enabled, automatically fetches and displays services from the Services collection.",
      initialValue: true,
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare: ({ sectionLabel }) => ({
      title: sectionLabel ? `Services — ${sectionLabel}` : "Services",
      media: ServicesIcon,
    }),
  },
});
