import { defineField, defineType } from "sanity";
import { GoogleReviewsIcon } from "@/components/sanity-schema/SectionIcons";

export const googleReviewsSection = defineType({
  name: "googleReviewsSection",
  title: "Google Reviews",
  type: "object",
  icon: GoogleReviewsIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: "Optional label to distinguish sections.",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow",
      type: "string",
      initialValue: "Client Testimonials",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      initialValue: "What Our Clients",
    }),
    defineField({
      name: "headingItalic",
      title: "Heading (italic part)",
      type: "string",
      description: "Optional line shown in emphasis style.",
      initialValue: "Say About Us",
    }),
    defineField({
      name: "googleReviewsUrl",
      title: "Google Reviews Link",
      type: "url",
      description:
        "Link to your Google Business reviews (e.g. https://g.page/r/YOUR_PLACE_ID/review or your Google Maps reviews URL). When the client is ready, add this link.",
    }),
    defineField({
      name: "rating",
      title: "Average Rating",
      type: "number",
      description: "e.g. 4.9",
      initialValue: 4.9,
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: "reviewCount",
      title: "Review Count",
      type: "number",
      description: "e.g. 48. Leave blank to hide.",
    }),
    defineField({
      name: "reviewCountLabel",
      title: "Review Count Label",
      type: "string",
      initialValue: "Google reviews",
    }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [
        {
          type: "object",
          name: "review",
          title: "Review",
          fields: [
            defineField({
              name: "text",
              title: "Review Text",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "reviewerName",
              title: "Reviewer Name",
              type: "string",
              description: "e.g. James M.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "reviewerInitials",
              title: "Reviewer Initials",
              type: "string",
              description: "e.g. JM (for avatar). Leave blank to derive from name.",
            }),
            defineField({
              name: "stars",
              title: "Stars",
              type: "number",
              options: { list: [1, 2, 3, 4, 5] },
              initialValue: 5,
              validation: (Rule) => Rule.required().min(1).max(5),
            }),
            defineField({
              name: "timeAgo",
              title: "Time Ago",
              type: "string",
              description: "e.g. 2 months ago, 3 weeks ago",
            }),
          ],
          preview: {
            select: { reviewerName: "reviewerName", text: "text" },
            prepare: ({ reviewerName, text }: { reviewerName?: string; text?: string }) => ({
              title: reviewerName || "Unnamed",
              subtitle: text ? text.slice(0, 50) + "…" : "",
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare: ({ sectionLabel }) => ({
      title: sectionLabel ? `Google Reviews — ${sectionLabel}` : "Google Reviews",
      media: GoogleReviewsIcon,
    }),
  },
});
