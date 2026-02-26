import type { StructureResolver } from "sanity/structure";

const SEO_SETTINGS_ID = "seoSettings";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // Singleton
      S.listItem()
        .title("Default SEO Settings")
        .id("seoSettings")
        .child(
          S.document().schemaType("seoSettings").documentId(SEO_SETTINGS_ID)
        ),
      S.divider(),
      // Content
      S.listItem()
        .title("Pages")
        .schemaType("page")
        .child(S.documentTypeList("page").title("Pages")),
      S.listItem()
        .title("Reusable Section Templates")
        .schemaType("sectionTemplate")
        .child(S.documentTypeList("sectionTemplate").title("Reusable Section Templates")),
      S.divider(),
      S.listItem()
        .title("Blog Posts")
        .schemaType("blogPost")
        .child(S.documentTypeList("blogPost").title("Blog Posts")),
      S.listItem()
        .title("Team Members")
        .schemaType("teamMember")
        .child(S.documentTypeList("teamMember").title("Team Members")),
      S.listItem()
        .title("Services")
        .schemaType("service")
        .child(S.documentTypeList("service").title("Services")),
    ]);
