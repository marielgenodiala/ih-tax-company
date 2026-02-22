import { defineField, defineType } from "sanity";
import { LogoCloudIcon } from "@/components/sanity-schema/SectionIcons";

export const logoCloudSection = defineType({
  name: "logoCloudSection",
  title: "Logo Cloud",
  type: "object",
  icon: LogoCloudIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: "Optional label to distinguish sections.",
    }),
    defineField({
      name: "title",
      title: "Section Title",
      type: "string",
      description: 'Optional override. Defaults to "Registered & Accredited".',
    }),
    defineField({
      name: "logos",
      title: "Logos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Logo Image",
              type: "image",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "alt", media: "image" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare: ({ sectionLabel }) => ({
      title: sectionLabel ? `Logo Cloud — ${sectionLabel}` : "Logo Cloud",
      media: LogoCloudIcon,
    }),
  },
});
