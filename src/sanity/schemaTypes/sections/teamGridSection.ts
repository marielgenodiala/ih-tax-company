import { defineField, defineType } from "sanity";
import { TeamGridIcon } from "@/components/sanity-schema/SectionIcons";

export const teamGridSection = defineType({
  name: "teamGridSection",
  title: "Team Grid",
  type: "object",
  icon: TeamGridIcon,
  fields: [
    defineField({
      name: "sectionLabel",
      title: "Section Label",
      type: "string",
      description: "Optional label to distinguish sections.",
    }),
    defineField({
      name: "introLabel",
      title: "Section Label Text",
      type: "string",
      initialValue: "Meet the Team",
    }),
    defineField({
      name: "introHeading",
      title: "Heading",
      type: "string",
      description: 'Use *asterisks* for blue italic emphasis.',
      initialValue: "The People Behind *I H Professionals*",
    }),
    defineField({
      name: "introText",
      title: "Intro Text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "useTeamList",
      title: "Use Team List from Sanity",
      type: "boolean",
      description: "When enabled, automatically fetches and displays team members from the Team Members collection.",
      initialValue: true,
    }),
  ],
  preview: {
    select: { sectionLabel: "sectionLabel" },
    prepare: ({ sectionLabel }) => ({
      title: sectionLabel ? `Team Grid — ${sectionLabel}` : "Team Grid",
      media: TeamGridIcon,
    }),
  },
});
