import { defineField, defineType } from "sanity";
import { CtaBannerIcon } from "@/components/sanity-schema/SectionIcons";

export const ctaBannerSection = defineType({
  name: "ctaBannerSection",
  title: "CTA Banner",
  type: "object",
  icon: CtaBannerIcon,
  fields: [
    defineField({
      name: "variant",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { value: "default", title: "Default (centered, primary colour)" },
          {
            value: "twoColumn",
            title: "Two column (blue, title left, button right)",
          },
        ],
      },
      initialValue: "default",
    }),
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
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: "Use *asterisks* for italic emphasis.",
      initialValue: "Ready to Get Started?",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      initialValue:
        "Get in touch with our team to discuss your tax and accounting needs.",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      initialValue: "Contact Us",
    }),
    defineField({
      name: "buttonHref",
      title: "Button Link",
      type: "string",
      description: 'Accepts: "/book-online", "/#contact", etc.',
      initialValue: "/#contact",
    }),
    defineField({
      name: "backgroundType",
      title: "Background (Two column only)",
      type: "string",
      options: {
        list: [
          { value: "darkBlue", title: "Dark blue (solid)" },
          { value: "linear", title: "Linear gradient" },
          { value: "image", title: "Image (with overlay)" },
        ],
      },
      initialValue: "darkBlue",
      hidden: ({ parent }) => parent?.variant !== "twoColumn",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      type: "image",
      options: { hotspot: true },
      description:
        "Used when Background is “Image”. Same overlay is applied on top.",
      hidden: ({ parent }) =>
        parent?.variant !== "twoColumn" || parent?.backgroundType !== "image",
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare: ({ sectionLabel }) => ({
      title: sectionLabel ? `CTA Banner — ${sectionLabel}` : "CTA Banner",
      media: CtaBannerIcon,
    }),
  },
});
