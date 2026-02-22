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
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Navigation logo image.",
    }),
    defineField({
      name: "logoText",
      title: "Logo Text",
      type: "string",
      description: "Text displayed next to the logo (e.g. \"I H Professionals & Co.\").",
    }),
    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
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
