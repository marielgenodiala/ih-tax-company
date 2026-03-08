import { defineField, defineType } from "sanity";
import { ContactPageIcon } from "@/components/sanity-schema/SectionIcons";

export const contactPageSection = defineType({
  name: "contactPageSection",
  title: "Contact Page",
  type: "object",
  icon: ContactPageIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: "Optional label to distinguish this section.",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Small label above the heading.",
      initialValue: "Contact Us",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Use *asterisks* for blue italic emphasis.',
      initialValue: "Get in *Touch*",
    }),
    defineField({
      name: "formTitle",
      title: "Form title",
      type: "string",
      description: "Heading for the left column (e.g. Send a Message).",
      initialValue: "Send a Message",
    }),
    defineField({
      name: "formIntro",
      title: "Form intro",
      type: "text",
      rows: 2,
      description: "Short text above the form.",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Twitter / X", value: "twitter" },
                  { title: "YouTube", value: "youtube" },
                  { title: "WhatsApp", value: "whatsapp" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
              description: "Full URL (e.g. https://facebook.com/..., https://wa.me/61...).",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      description: "Display and link for click-to-call.",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Display and mailto link.",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 2,
      initialValue: "Level 17/9 Castlereagh St\nSydney NSW 2000, Australia",
    }),
    defineField({
      name: "hours",
      title: "Opening Hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "days", title: "Days", type: "string" }),
            defineField({ name: "hours", title: "Hours", type: "string" }),
          ],
          preview: {
            select: { title: "days", subtitle: "hours" },
          },
        },
      ],
      initialValue: [
        { days: "Monday – Friday", hours: "9:00 AM – 6:00 PM" },
        { days: "Saturday – Sunday", hours: "Closed" },
      ],
    }),
    defineField({
      name: "formFields",
      title: "Form Fields",
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
              name: "fieldType",
              title: "Field Type",
              type: "string",
              options: {
                list: [
                  { title: "Text", value: "text" },
                  { title: "Email", value: "email" },
                  { title: "Phone", value: "tel" },
                  { title: "Textarea", value: "textarea" },
                  { title: "Number", value: "number" },
                ],
              },
              initialValue: "text",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "required",
              title: "Required",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "halfWidth",
              title: "Half Width",
              type: "boolean",
              description: "Display side by side with the next half-width field.",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "fieldType" },
            prepare({ title, subtitle }) {
              return { title, subtitle };
            },
          },
        },
      ],
    }),
    defineField({
      name: "buttonText",
      title: "Submit Button Text",
      type: "string",
      initialValue: "Submit",
    }),
    defineField({
      name: "mapLinkUrl",
      title: "Map Link",
      type: "string",
      description:
        "Google Maps link (e.g. https://maps.app.goo.gl/...). Used to generate the embedded map.",
      initialValue: "https://maps.app.goo.gl/LUDiCG9ptQwejxQJA",
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "Map Embed URL (optional)",
      type: "string",
      description:
        "If you have the embed URL from Google Maps (Share → Embed a map), paste the iframe src here. Otherwise leave blank to use the Map Link.",
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare: ({ sectionLabel }) => ({
      title: sectionLabel ? `Contact Page — ${sectionLabel}` : "Contact Page",
      media: ContactPageIcon,
    }),
  },
});
