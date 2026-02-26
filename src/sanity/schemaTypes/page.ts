import { defineField, defineType } from "sanity";
import { DocumentIcon } from "@sanity/icons";
import { PageUrlPreview } from "../components/PageUrlPreview";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      description:
        '"home" maps to /. Other slugs map to /slug (e.g. "team" → /team).',
      validation: (rule) =>
        rule.required().custom(async (slug, context) => {
          if (!slug?.current) return "Slug is required";
          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2024-01-01" });
          const id = document?._id?.replace(/^drafts\./, "") || "";
          const existing = await client.fetch(
            `count(*[_type == "page" && slug.current == $slug && !(_id in [$draftId, $publishedId])])`,
            {
              slug: slug.current,
              draftId: `drafts.${id}`,
              publishedId: id,
            }
          );
          return existing > 0 ? "A page with this slug already exists" : true;
        }),
    }),
    defineField({
      name: "pageUrl",
      title: "Page URL",
      type: "string",
      components: { input: PageUrlPreview },
      readOnly: true,
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        { type: "navigationSection" },
        { type: "heroSection" },
        { type: "pageHeroSection" },
        { type: "logoCloudSection" },
        { type: "statsSection" },
        { type: "whatYouNeedSection" },
        { type: "servicesSection" },
        { type: "featuredBookOnlineSection" },
        { type: "statementBannerSection" },
        { type: "aboutSection" },
        { type: "ctaBannerSection" },
        { type: "blogPreviewSection" },
        { type: "openingHoursSection" },
        { type: "contactFormSection" },
        { type: "teamGridSection" },
        { type: "footerSection" },
        { type: "reusableSection" },
      ],
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seoObject",
      description: "Override the default SEO for this page. Leave blank to use site defaults.",
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: slug === "home" ? "/" : `/${slug}`,
      };
    },
  },
});
