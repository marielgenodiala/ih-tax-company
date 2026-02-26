import { defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons";

const richTextFields = [
  {
    type: "block" as const,
    styles: [
      { title: "Normal", value: "normal" },
      { title: "H3", value: "h3" },
    ],
    marks: {
      decorators: [
        { title: "Bold", value: "strong" },
        { title: "Italic", value: "em" },
      ],
    },
  },
];

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      description: "Auto-generated from name. Used for the profile page URL: /team/[slug]",
    }),
    defineField({
      name: "role",
      title: "Role / Credentials",
      type: "string",
      description: 'e.g. "Partner, MTax, BCom, RTA, JP"',
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "string",
      description: "Their functional role at IH.",
      options: {
        list: [
          { title: "Partner", value: "Partner" },
          { title: "Tax Accountant", value: "Tax Accountant" },
          { title: "SMSF Accountant", value: "SMSF Accountant" },
          { title: "Bookkeeper", value: "Bookkeeper" },
          { title: "Business Consultant", value: "Business Consultant" },
          { title: "Admin / Client Services", value: "Admin / Client Services" },
          { title: "Call Centre", value: "Call Centre" },
          { title: "Associate", value: "Associate" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "bio",
      title: "Short Bio",
      type: "text",
      rows: 3,
      description: "A short intro paragraph shown at the top of the profile page.",
    }),
    defineField({
      name: "qualifications",
      title: "Qualifications",
      type: "array",
      of: richTextFields,
      description: "Academic degrees, certifications, registrations (e.g. MTax, BCom, CPA, RTA).",
    }),
    defineField({
      name: "workExperience",
      title: "At I H Professionals",
      type: "array",
      of: richTextFields,
      description: "What they do at IH — their role, specialties, and day-to-day responsibilities.",
    }),
    defineField({
      name: "personalLife",
      title: "Life Outside Work",
      type: "array",
      of: richTextFields,
      description: "What they enjoy away from work — helps clients connect on a personal level.",
    }),
    defineField({
      name: "socials",
      title: "Social Media & Contact",
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
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "Twitter / X", value: "twitter" },
                  { title: "Email", value: "email" },
                ],
              },
            }),
            defineField({
              name: "url",
              title: "URL or Email Address",
              type: "string",
              description: "Full URL (https://...) or email address for the Email platform",
            }),
          ],
          preview: {
            select: { title: "platform", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seoObject",
      description: "Override the default SEO for this team member's profile page.",
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "position",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle || "Team Member", media };
    },
  },
});
