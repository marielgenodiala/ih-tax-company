import { defineField, defineType } from "sanity";
import { FooterIcon } from "@/components/sanity-schema/SectionIcons";

export const footerSection = defineType({
  name: "footerSection",
  title: "Footer",
  type: "object",
  icon: FooterIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: "Optional label to identify this section in the list.",
    }),
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
    }),
    defineField({
      name: "companyDescription",
      title: "Company Description",
      type: "text",
      rows: 3,
      description: "Short description shown in the footer.",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
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
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
              description: 'Accepts any format: "www.facebook.com", "https://facebook.com", etc.',
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
      name: "quickLinks",
      title: "Quick Links",
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
              description: 'Accepts: "/", "/team", "team", "/#contact".',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
    defineField({
      name: "serviceLinks",
      title: "Service Links",
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
              description: 'Accepts: "/book-online", "book-online", etc.',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
    defineField({
      name: "newsletterEmail",
      title: "Newsletter Email",
      type: "string",
      description: "Email address for newsletter form submissions (formsubmit.co).",
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description: 'e.g. "© 2026 I H Professionals & Co. Pty Ltd. All rights reserved."',
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare({ sectionLabel }) {
      return {
        title: sectionLabel ? `Footer — ${sectionLabel}` : "Footer",
        media: FooterIcon,
      };
    },
  },
});
