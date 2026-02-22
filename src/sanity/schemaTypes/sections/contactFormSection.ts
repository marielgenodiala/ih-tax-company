import { defineField, defineType } from "sanity";
import { ContactFormIcon } from "@/components/sanity-schema/SectionIcons";

export const contactFormSection = defineType({
  name: "contactFormSection",
  title: "Contact Form",
  type: "object",
  icon: ContactFormIcon,
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
      initialValue: "Get in Touch",
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Use *asterisks* for blue italic emphasis.',
      initialValue: "Add Your Details, *Get Started Now*",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
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
            select: { title: "label", subtitle: "fieldType", required: "required", halfWidth: "halfWidth" },
            prepare({ title, subtitle, required, halfWidth }) {
              return {
                title,
                subtitle: `${subtitle}${required ? " · required" : ""}${halfWidth ? " · ½ width" : ""}`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      description: 'Submit button label. Defaults to "Submit".',
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare: ({ sectionLabel }) => ({
      title: sectionLabel ? `Contact Form — ${sectionLabel}` : "Contact Form",
      media: ContactFormIcon,
    }),
  },
});
