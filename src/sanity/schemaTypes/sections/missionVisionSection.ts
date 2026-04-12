import { defineField, defineType } from "sanity";
import { HeartIcon } from "@sanity/icons";

export const missionVisionSection = defineType({
  name: "missionVisionSection",
  title: "Mission & vision",
  type: "object",
  icon: HeartIcon,
  description:
    "Mission and vision cards, values grid. Use *asterisks* in the values heading for italic emphasis; blank lines in body text create new paragraphs.",
  fields: [
    defineField({
      name: "missionTag",
      title: "Mission — label",
      type: "string",
      initialValue: "Our Mission",
    }),
    defineField({
      name: "missionTitle",
      title: "Mission — title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "missionBody",
      title: "Mission — body",
      type: "text",
      rows: 8,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "missionQuote",
      title: "Mission — quote",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "visionTag",
      title: "Vision — label",
      type: "string",
      initialValue: "Our Vision",
    }),
    defineField({
      name: "visionTitle",
      title: "Vision — title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "visionBody",
      title: "Vision — body",
      type: "text",
      rows: 8,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "visionQuote",
      title: "Vision — quote",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "valuesHeading",
      title: "Values block — heading",
      type: "string",
      description: "Use *word* for italic, e.g. Our *Values*",
      initialValue: "Our *Values*",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "valuesIntro",
      title: "Values block — intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      validation: (rule) => rule.min(1),
      of: [
        {
          type: "object",
          name: "missionVisionValue",
          fields: [
            defineField({
              name: "iconKey",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Heart (care / client first)", value: "heart" },
                  { title: "Document (integrity)", value: "document" },
                  { title: "Clock (proactive / time)", value: "clock" },
                  { title: "Users (partnership)", value: "users" },
                  { title: "Star (excellence)", value: "star" },
                  { title: "Shield (accountability)", value: "shield" },
                ],
              },
              initialValue: "heart",
            }),
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
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
            prepare({ title, subtitle }) {
              return {
                title: title || "Value",
                subtitle: subtitle ? String(subtitle).slice(0, 72) : "",
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { mission: "missionTitle", vision: "visionTitle" },
    prepare({ mission, vision }) {
      return {
        title: "Mission & vision",
        subtitle:
          [mission, vision].filter(Boolean).join(" · ") || "Add content",
      };
    },
  },
});
