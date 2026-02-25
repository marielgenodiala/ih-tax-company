import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
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
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Tax", value: "tax" },
          { title: "Management", value: "management" },
          { title: "Audit", value: "audit" },
          { title: "BAS & IAS", value: "bas" },
          { title: "Bookkeeping", value: "bookkeeping" },
          { title: "Planning", value: "planning" },
          { title: "SMSF", value: "smsf" },
          { title: "ASIC / Corporate", value: "asic" },
          { title: "Payroll", value: "payroll" },
          { title: "Compliance", value: "compliance" },
          { title: "Investment", value: "investment" },
        ],
      },
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
      name: "isBookable",
      title: "Show on Book Online page",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "price",
    },
  },
});
