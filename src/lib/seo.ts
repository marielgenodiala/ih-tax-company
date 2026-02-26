export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.ihprofessionals.com.au";

export const SITE_NAME = "I H Professionals & Co.";

/** Appended to all page titles when no custom SEO title is set. */
export const SITE_SUFFIX = "I H Professionals & Co. | Tax Agents Sydney";

export const DEFAULT_DESCRIPTION =
  "Tax Return, I H Professionals & Co. Pty Ltd, We have more than 15 years experience in accounting, tax and business advisory fields with a great range of business, individuals, SMSFs & Trusts. Located in the Sydney CBD and various locations across Sydney.";

export interface PageSeo {
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string[] | null;
  ogImage?: string | null;
}

export interface GlobalSeo {
  seoTitle?: string | null;
  seoDescription?: string | null;
  seoKeywords?: string[] | null;
  seoImage?: string | null;
}

/**
 * Resolve SEO fields for a page, merging page-level overrides with global defaults.
 *
 * Title rules:
 *  - If page has a custom metaTitle → use it as-is (absolute, no suffix added).
 *  - If empty → return null so the caller can use the document title + suffix via Next.js template.
 *
 * All other fields fall back: page → global → hardcoded default.
 */
export function resolveSeo(
  pageSeo: PageSeo | null | undefined,
  global: GlobalSeo | null | undefined
) {
  return {
    /** Custom title override. Null means "use document title + template suffix". */
    customTitle: pageSeo?.metaTitle || null,
    description:
      pageSeo?.metaDescription ||
      global?.seoDescription ||
      DEFAULT_DESCRIPTION,
    keywords: pageSeo?.metaKeywords || global?.seoKeywords || undefined,
    ogImage: pageSeo?.ogImage || global?.seoImage || null,
  };
}
