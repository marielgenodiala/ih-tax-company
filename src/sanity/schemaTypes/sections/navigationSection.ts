import { defineField, defineType } from "sanity";
import { NavigationIcon } from "@/components/sanity-schema/SectionIcons";

export const navigationSection = defineType({
  name: "navigationSection",
  title: "Navigation",
  type: "object",
  icon: NavigationIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: "Optional label to identify this section in the list (e.g. \"nav_1\").",
    }),
    defineField({
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Default (hamburger + slide-in)", value: "default" },
          { title: "Sticky (desktop dropdowns + optional top bar)", value: "sticky" },
        ],
      },
      initialValue: "default",
      description: "Navigation layout variant.",
    }),
    // ─── Shared: Logo (used by both default and sticky layouts) ───
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Navigation logo image. Used by both Default and Sticky layouts.",
    }),
    defineField({
      name: "logoText",
      title: "Logo Text",
      type: "string",
      description: "Text displayed next to the logo (e.g. \"I H Professionals & Co.\").",
      hidden: ({ parent }) => parent?.layout === "sticky",
    }),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      hidden: ({ parent }) => parent?.layout === "sticky",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "URL Path",
              type: "string",
              description: 'Accepts: "/", "/team", "team", "/book-online", "/#contact", "/home"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "exact",
              title: "Exact Match",
              type: "boolean",
              description: "Only highlight when URL matches exactly (use for Home, Contact).",
              initialValue: false,
            }),
            defineField({
              name: "noActive",
              title: "Never Highlight",
              type: "boolean",
              description: "Never show as active (use for anchor links like Contact).",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
    // ─── Sticky layout fields (hidden when layout is "default") ───
    defineField({
      name: "showTopBar",
      title: "Show Top Bar",
      type: "boolean",
      initialValue: true,
      description: "Show the thin bar above the nav (e.g. contact + quick links).",
      hidden: ({ parent }) => parent?.layout !== "sticky",
    }),
    defineField({
      name: "topBarLeftLinks",
      title: "Top Bar — Left Links",
      type: "array",
      description: "e.g. Email, Phone. Shown on the left of the top bar.",
      hidden: ({ parent }) => parent?.layout !== "sticky",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", title: "URL (mailto:, tel:, or path)", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "label" } },
        },
      ],
    }),
    defineField({
      name: "topBarRightLinks",
      title: "Top Bar — Right Links",
      type: "array",
      description: "e.g. Insights, Book Online. Shown on the right of the top bar.",
      hidden: ({ parent }) => parent?.layout !== "sticky",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", title: "URL Path", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "label" } },
        },
      ],
    }),
    defineField({
      name: "logoLine1",
      title: "Logo Text",
      type: "string",
      description: "Single line next to logo (e.g. \"I H Professionals & Co.\"). Used when no logo image is set.",
      initialValue: "I H Professionals & Co.",
      hidden: ({ parent }) => parent?.layout !== "sticky",
    }),
    defineField({
      name: "navItems",
      title: "Nav Items (with optional dropdowns)",
      type: "array",
      description: "Links and dropdowns. Each item can have children for a dropdown; per dropdown you can show a Services link.",
      hidden: ({ parent }) => parent?.layout !== "sticky",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "href", title: "URL (for simple link or dropdown trigger)", type: "string" }),
            defineField({
              name: "highlight",
              title: "Highlight (CTA button style)",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "children",
              title: "Dropdown Items",
              type: "array",
              description: "If set, this item becomes a dropdown (e.g. Taxation → Item1, Item2, Item3, optional Services link).",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
                    defineField({ name: "href", title: "URL", type: "string", validation: (r) => r.required() }),
                    defineField({ name: "desc", title: "Description (optional)", type: "string" }),
                  ],
                  preview: { select: { title: "label" } },
                },
              ],
            }),
            defineField({
              name: "showServicesLinkInDropdown",
              title: "Show Services link in this dropdown",
              type: "boolean",
              initialValue: false,
              description: "When on, a blue Services link appears inside this dropdown, below the dropdown items. Set the label and URL below.",
              hidden: ({ parent }) => !(Array.isArray(parent?.children) && parent.children.length > 0),
            }),
            defineField({
              name: "servicesLinkLabel",
              title: "Services link — Label",
              type: "string",
              description: "e.g. \"Our Services\" (arrow is added automatically).",
              initialValue: "Our Services",
              hidden: ({ parent }) => !parent?.showServicesLinkInDropdown,
            }),
            defineField({
              name: "servicesLinkUrl",
              title: "Services link — URL",
              type: "string",
              description: "e.g. \"/#services\" or \"/book-online\".",
              initialValue: "/#services",
              hidden: ({ parent }) => !parent?.showServicesLinkInDropdown,
            }),
          ],
          preview: { select: { title: "label" } },
        },
      ],
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare({ sectionLabel }) {
      return {
        title: sectionLabel ? `Navigation — ${sectionLabel}` : "Navigation",
        media: NavigationIcon,
      };
    },
  },
});
