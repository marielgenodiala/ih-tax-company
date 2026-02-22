import { defineField, defineType } from "sanity";
import { CtaBannerIcon } from "@/components/sanity-schema/SectionIcons";

export const ctaBannerSection = defineType({
  name: "ctaBannerSection",
  title: "CTA Banner",
  type: "object",
  icon: CtaBannerIcon,
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
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      description: 'Use *asterisks* for italic emphasis.',
      initialValue: "Ready to Get Started?",
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      initialValue: "Get in touch with our team to discuss your tax and accounting needs.",
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
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare: ({ sectionLabel }) => ({
      title: sectionLabel ? `CTA Banner — ${sectionLabel}` : "CTA Banner",
      media: CtaBannerIcon,
    }),
  },
});
