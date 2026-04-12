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
      name: "layout",
      title: "Layout",
      type: "string",
      options: {
        list: [
          { title: "Default (4-column grid)", value: "default" },
          { title: "Two Part", value: "twoPart" },
        ],
      },
      initialValue: "default",
      description: "Footer layout variant.",
    }),
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      hidden: ({ parent }) => parent?.layout === "twoPart",
    }),
    defineField({
      name: "companyDescription",
      title: "Company Description",
      type: "text",
      rows: 3,
      description: "Short description shown in the footer.",
      hidden: ({ parent }) => parent?.layout === "twoPart",
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
                  { title: "WhatsApp", value: "whatsapp" },
                  { title: "Red Note", value: "rednote" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
              description:
                'Accepts any format: "www.facebook.com", "https://facebook.com", etc.',
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
      name: "logoText",
      title: "Logo Text",
      type: "string",
      description: "Text next to the logo (Two Part layout).",
      hidden: ({ parent }) => parent?.layout !== "twoPart",
    }),
    defineField({
      name: "newsletterLabel",
      title: "Newsletter Label",
      type: "string",
      hidden: ({ parent }) => parent?.layout !== "twoPart",
    }),
    defineField({
      name: "newsletterPlaceholder",
      title: "Newsletter Email Placeholder",
      type: "string",
      initialValue: "Email address",
      hidden: ({ parent }) => parent?.layout !== "twoPart",
    }),
    defineField({
      name: "newsletterButtonText",
      title: "Newsletter Button Text",
      type: "string",
      initialValue: "Subscribe",
      hidden: ({ parent }) => parent?.layout !== "twoPart",
    }),
    defineField({
      name: "contactLabel",
      title: "Contact Us Label",
      type: "string",
      initialValue: "Contact us",
      hidden: ({ parent }) => parent?.layout !== "twoPart",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      hidden: ({ parent }) => parent?.layout !== "twoPart",
    }),
    defineField({
      name: "contactNumber",
      title: "Contact Number",
      type: "string",
      hidden: ({ parent }) => parent?.layout !== "twoPart",
    }),
    defineField({
      name: "contactAddress",
      title: "Contact Address",
      type: "text",
      rows: 2,
      hidden: ({ parent }) => parent?.layout !== "twoPart",
    }),
    defineField({
      name: "twoPartServicesLabel",
      title: "Services Label",
      type: "string",
      initialValue: "Services",
      hidden: ({ parent }) => parent?.layout !== "twoPart",
    }),
    defineField({
      name: "twoPartServiceLinks",
      title: "Service Links",
      type: "array",
      hidden: ({ parent }) => parent?.layout !== "twoPart",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "href", title: "URL", type: "string", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "label" } },
        },
      ],
    }),
    defineField({
      name: "twoPartAboutLabel",
      title: "About Us Label",
      type: "string",
      initialValue: "About us",
      hidden: ({ parent }) => parent?.layout !== "twoPart",
    }),
    defineField({
      name: "twoPartAboutLinks",
      title: "About Links",
      type: "array",
      hidden: ({ parent }) => parent?.layout !== "twoPart",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "href", title: "URL", type: "string", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "label" } },
        },
      ],
    }),
    defineField({
      name: "followLabel",
      title: "Follow Us Label",
      type: "string",
      initialValue: "Follow us on",
      hidden: ({ parent }) => parent?.layout !== "twoPart",
    }),
    defineField({
      name: "twoPartSocialLinks",
      title: "Social Media (Follow us)",
      type: "array",
      description: "Platform and URL for each social link. Only shown for Two Part layout.",
      hidden: ({ parent }) => parent?.layout !== "twoPart",
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
                  { title: "Red Note", value: "rednote" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        },
      ],
    }),
    defineField({
      name: "quickLinks",
      title: "Quick Links",
      type: "array",
      hidden: ({ parent }) => parent?.layout === "twoPart",
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
      hidden: ({ parent }) => parent?.layout === "twoPart",
      description:
        "Links to service sections on the Book Online page. The Index must match the Index field on each Featured Book Online item (e.g. tax-accounting, management-accounting, auditing).",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description:
                "Link text (e.g. Tax Accounting). Should match the Book Online item title.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "path",
              title: "Page Path",
              type: "string",
              initialValue: "/book-online",
              description: "Base path for the link (usually /book-online).",
            }),
            defineField({
              name: "index",
              title: "Index (anchor)",
              type: "string",
              description:
                "Must exactly match the Index on the Book Online page item (e.g. tax-accounting, management-accounting, auditing). No leading # needed.",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { label: "label", index: "index" },
            prepare({ label, index }) {
              return {
                title: label,
                subtitle: index ? `#${index}` : undefined,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "newsletterEmail",
      title: "Newsletter Email",
      type: "string",
      description:
        "Email address for newsletter form submissions (formsubmit.co).",
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description:
        'The copyright line (e.g. "I H Professionals & Co. Pty Ltd. All rights reserved."). « © 2026 » is added automatically in front.',
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
