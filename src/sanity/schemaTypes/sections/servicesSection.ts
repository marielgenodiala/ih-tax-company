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
          { title: "Grid (What We Offer)", value: "grid" },
          { title: "Carousel cards", value: "carousel" },
          { title: "Who We Serve (industries)", value: "whoWeServe" },
          { title: "Services Explore List", value: "exploreList" },
          { title: "Partner grid (cards with category)", value: "partnerGrid" },
        ],
      },
      initialValue: "grid",
      description: "Grid = service cards; Who We Serve = industry list; Explore List = cards with features + Explore button; Partner grid = category header + partner cards.",
    }),
    defineField({
      name: "exploreListItems",
      title: "Explore list items",
      type: "array",
      description: "For Services Explore List variant. Each card: title, description, features list, and Explore button.",
      hidden: ({ parent }) => parent?.variant !== "exploreList",
      of: [
        {
          type: "object",
          name: "exploreListItem",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "image",
              title: "Card image",
              type: "image",
              options: { hotspot: true },
              description: "Image shown at the top of the card. Recommended size: 600×400 or similar.",
            }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
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
              name: "features",
              title: "Features",
              type: "array",
              of: [{ type: "string" }],
              description: "Bullet points shown under the description.",
            }),
            defineField({ name: "buttonLabel", title: "Button label", type: "string", initialValue: "Explore Service" }),
            defineField({ name: "buttonHref", title: "Button URL", type: "string", initialValue: "#" }),
          ],
          preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: title || "Service card" }) },
        },
      ],
    }),
    defineField({
      name: "industryItems",
      title: "Industry items",
      type: "array",
      of: [{ type: "string" }],
      description: "For Who We Serve variant. e.g. Restaurants & Hospitality, Technology.",
      hidden: ({ parent }) => parent?.variant !== "whoWeServe",
    }),
    defineField({
      name: "hasBackground",
      title: "Section has background",
      type: "boolean",
      description: "When on, section uses off-white background.",
      initialValue: false,
      hidden: ({ parent }) => parent?.variant !== "whoWeServe" && parent?.variant !== "partnerGrid",
    }),
    defineField({
      name: "categoryLabel",
      title: "Category label",
      type: "string",
      description: "e.g. Category 01. For Partner grid variant.",
      hidden: ({ parent }) => parent?.variant !== "partnerGrid",
    }),
    defineField({
      name: "categoryTitle",
      title: "Category title",
      type: "string",
      description: "e.g. Professional Service Partners.",
      hidden: ({ parent }) => parent?.variant !== "partnerGrid",
    }),
    defineField({
      name: "categoryDescription",
      title: "Category description",
      type: "text",
      rows: 2,
      description: "Short description under the category header.",
      hidden: ({ parent }) => parent?.variant !== "partnerGrid",
    }),
    defineField({
      name: "partnerCards",
      title: "Partner cards",
      type: "array",
      hidden: ({ parent }) => parent?.variant !== "partnerGrid",
      of: [
        {
          type: "object",
          name: "partnerCard",
          fields: [
            defineField({
              name: "image",
              title: "Logo / image",
              type: "image",
              options: { hotspot: true },
              description: "Optional. If no image, a badge is generated from the title (e.g. Mortgage Broking Partner → MBG).",
            }),
            defineField({
              name: "logoVariant",
              title: "Logo colour variant",
              type: "string",
              options: {
                list: [
                  { title: "Default (navy/blue)", value: "v1" },
                  { title: "Teal", value: "v2" },
                  { title: "Navy", value: "v3" },
                  { title: "Green", value: "v4" },
                  { title: "Purple", value: "v5" },
                  { title: "Orange", value: "v6" },
                  { title: "Mint", value: "v7" },
                  { title: "Slate blue", value: "v8" },
                ],
              },
              initialValue: "v1",
            }),
            defineField({ name: "category", title: "Category", type: "string", description: "e.g. Finance & Lending" }),
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({
              name: "tags",
              title: "Tags",
              type: "array",
              of: [{ type: "string" }],
              description: "e.g. Home Loans, Investment",
            }),
            defineField({
              name: "linkLabel",
              title: "Link label",
              type: "string",
              initialValue: "Visit",
            }),
            defineField({ name: "linkHref", title: "Link URL", type: "string", initialValue: "#" }),
          ],
          preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: title || "Partner card" }) },
        },
      ],
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Small label above the heading.",
      initialValue: "Services",
      hidden: ({ parent }) => parent?.variant === "partnerGrid",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Use *asterisks* for blue italic emphasis.',
      initialValue: "What You Need",
      hidden: ({ parent }) => parent?.variant === "partnerGrid",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      initialValue: "Comprehensive taxation and accounting solutions tailored to your needs.",
      hidden: ({ parent }) => parent?.variant === "partnerGrid",
    }),
    defineField({
      name: "useServiceList",
      title: "Use Service List from Sanity",
      type: "boolean",
      description: "When enabled, automatically fetches and displays services from the Services collection.",
      initialValue: true,
      hidden: ({ parent }) =>
        parent?.variant === "carousel" ||
        parent?.variant === "whoWeServe" ||
        parent?.variant === "exploreList" ||
        parent?.variant === "partnerGrid",
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
