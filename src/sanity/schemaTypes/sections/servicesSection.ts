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
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Grid (default)", value: "grid" },
          {
            title: "Carousel cards",
            value: "carousel",
          },
        ],
      },
      initialValue: "grid",
      description: "Choose between the classic grid or the carousel layout.",
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
      hidden: ({ parent }) => parent?.variant === "carousel",
    }),
    defineField({
      name: "items",
      title: "Services (carousel)",
      type: "array",
      hidden: ({ parent }) => parent?.variant !== "carousel",
      of: [
        {
          type: "object",
          name: "serviceItem",
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
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "iconKey",
              title: "Icon (fallback when no image)",
              type: "string",
              options: {
                list: [
                  { title: "Tax", value: "tax" },
                  { title: "Management", value: "management" },
                  { title: "Audit", value: "audit" },
                  { title: "BAS", value: "bas" },
                  { title: "Bookkeeping", value: "bookkeeping" },
                  { title: "Planning", value: "planning" },
                  { title: "SMSF", value: "smsf" },
                  { title: "ASIC", value: "asic" },
                  { title: "Payroll", value: "payroll" },
                  { title: "Compliance", value: "compliance" },
                  { title: "Investment", value: "investment" },
                ],
              },
            }),
            defineField({
              name: "buttonLabel",
              title: "Button label",
              type: "string",
              initialValue: "Learn more",
            }),
            defineField({
              name: "buttonHref",
              title: "Button URL",
              type: "string",
              initialValue: "/contact",
            }),
          ],
          preview: {
            select: {
              title: "title",
            },
            prepare: ({ title }) => ({
              title: title || "Service",
            }),
          },
        },
      ],
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
