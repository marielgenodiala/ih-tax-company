import { useCallback } from "react";
import type { DocumentActionComponent, DocumentBadgeComponent } from "sanity";
import { EyeOpenIcon } from "@sanity/icons";

function getSlugFromDoc(doc: Record<string, unknown> | null): string | undefined {
  if (!doc) return undefined;
  const rawSlug = doc.slug;
  if (typeof rawSlug === "object" && rawSlug !== null) {
    return (rawSlug as { current?: string }).current;
  }
  if (typeof rawSlug === "string") return rawSlug;
  return undefined;
}

function getPagePath(schemaType: string, slug: string | undefined): string | null {
  if (!slug) return null;
  if (schemaType === "page") {
    return slug === "home" ? "/" : `/${slug}`;
  }
  if (schemaType === "blogPost") {
    return `/blogs/${slug}`;
  }
  return null;
}

// Document action — clickable button in actions menu that opens page in new tab
export const ViewPageAction: DocumentActionComponent = (props) => {
  const { type: schemaType, published, draft } = props;
  const doc = draft || published;
  const slug = getSlugFromDoc(doc as Record<string, unknown> | null);
  const path = getPagePath(schemaType, slug);

  const onHandle = useCallback(() => {
    if (path) {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      window.open(`${origin}${path}`, "_blank");
    }
  }, [path]);

  if (!path) return null;

  return {
    label: `Open ${path}`,
    icon: EyeOpenIcon,
    onHandle,
  };
};

// Document badge — always visible label next to Publish button showing the URL
export const PageUrlBadge: DocumentBadgeComponent = (props) => {
  const { type: schemaType, published, draft } = props;
  const doc = draft || published;
  const slug = getSlugFromDoc(doc as Record<string, unknown> | null);
  const path = getPagePath(schemaType, slug);

  if (!path) return null;

  return {
    label: path,
    color: "primary",
  };
};
