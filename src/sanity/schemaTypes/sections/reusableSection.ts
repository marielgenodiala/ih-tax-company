import { defineField, defineType } from "sanity";

export const reusableSection = defineType({
  name: "reusableSection",
  title: "Reuse Section",
  type: "object",
  fields: [
    defineField({
      name: "template",
      title: "Section Template",
      type: "reference",
      to: [{ type: "sectionTemplate" }],
      description: "Select a saved section template to reuse.",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      templateName: "template.name",
      sectionType: "template.section.0._type",
    },
    prepare({ templateName, sectionType }) {
      return {
        title: `Reuse: ${templateName || "Select template"}`,
        subtitle: sectionType || "",
      };
    },
  },
});
