import { defineField, defineType } from "sanity";
import { FooterIcon } from "@/components/sanity-schema/SectionIcons";

const linkObject = {
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
      title: "URL",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label" },
  },
};

const socialLinkObject = {
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
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "platform", subtitle: "url" },
  },
};

export const footerTwoPartSection = defineType({
  name: "footerTwoPartSection",
  title: "Footer (Two Part)",
  type: "object",
  icon: FooterIcon,
  description:
    "Footer with upper block (logo, newsletter, contact, services, about, social) and lower bar (copyright, designed by). All data is specific to this section.",
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: "Optional label to identify this section in the list.",
    }),
    // ─── Row 1: Logo + Newsletter ─────────────────────────────────────
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
    }),
    defineField({
      name: "logoText",
      title: "Logo Text",
      type: "string",
      description: "Text shown next to the logo (e.g. company name).",
    }),
    defineField({
      name: "newsletterLabel",
      title: "Newsletter Label",
      type: "string",
      description: "Label above the newsletter form (e.g. Newsletter).",
    }),
    defineField({
      name: "newsletterPlaceholder",
      title: "Newsletter Email Placeholder",
      type: "string",
      initialValue: "Email address",
    }),
    defineField({
      name: "newsletterButtonText",
      title: "Newsletter Button Text",
      type: "string",
      initialValue: "Subscribe",
    }),
    defineField({
      name: "newsletterEmail",
      title: "Newsletter Form Email",
      type: "string",
      description: "Email address for newsletter form submissions (e.g. formsubmit.co).",
    }),
    // ─── Row 2: Contact, Services, About, Follow ─────────────────────
    defineField({
      name: "contactLabel",
      title: "Contact Us Label",
      type: "string",
      initialValue: "Contact us",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "contactNumber",
      title: "Contact Number",
      type: "string",
    }),
    defineField({
      name: "contactAddress",
      title: "Contact Address",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "servicesLabel",
      title: "Services Label",
      type: "string",
      initialValue: "Services",
    }),
    defineField({
      name: "serviceLinks",
      title: "Service Links",
      type: "array",
      of: [linkObject],
    }),
    defineField({
      name: "aboutLabel",
      title: "About Us Label",
      type: "string",
      initialValue: "About us",
    }),
    defineField({
      name: "aboutLinks",
      title: "About Links",
      type: "array",
      of: [linkObject],
    }),
    defineField({
      name: "followLabel",
      title: "Follow Us Label",
      type: "string",
      initialValue: "Follow us on",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [socialLinkObject],
    }),
    // ─── Lower bar ───────────────────────────────────────────────────
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description: "The copyright line (e.g. Company Name. All rights reserved.). « © 2026 » is added automatically.",
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare({ sectionLabel }) {
      return {
        title: sectionLabel ? `Footer (Two Part) — ${sectionLabel}` : "Footer (Two Part)",
        media: FooterIcon,
      };
    },
  },
});
