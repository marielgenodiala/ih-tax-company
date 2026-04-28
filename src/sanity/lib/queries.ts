import { groq } from "next-sanity";

// ─── SEO Settings ────────────────────────────────────

export const seoSettingsQuery = groq`
  *[_type == "seoSettings"][0] {
    seoTitle,
    seoDescription,
    "seoImage": seoImage.asset->url,
    seoKeywords
  }
`;

// ─── Pages ───────────────────────────────────────────

// Helper fragment for resolving section image URLs
const sectionImageResolvers = `
  _type == "heroSection" => {
    ...,
    "servicesBackgroundImage": servicesBackgroundImage.asset->url,
    "backgroundImage": backgroundImage.asset->url,
    "backgroundImages": backgroundImages[].asset->url
  },
  _type == "navigationSection" => {
    ...,
    "logo": logo.asset->url
  },
  _type == "footerSection" => {
    ...,
    "logo": logo.asset->url
  },
  _type == "footerTwoPartSection" => {
    ...,
    "logo": logo.asset->url
  },
  _type == "logoCloudSection" => {
    ...,
    logos[] {
      ...,
      "image": image.asset->url
    }
  },
  _type == "statsSection" => {
    ...,
    "backgroundImage": backgroundImage.asset->url,
    partners[] {
      ...,
      "image": image.asset->url
    }
  },
  _type == "pageHeroSection" => {
    ...,
    "backgroundImage": backgroundImage.asset->url
  },
  _type == "servicesSection" => {
    ...,
    partnerCards[] {
      ...,
      "image": image.asset->url
    },
    exploreListItems[] {
      ...,
      "image": image.asset->url
    }
  },
  _type == "ctaBannerSection" => {
    ...,
    "backgroundImage": backgroundImage.asset->url
  },
  _type == "ctaBannerDownloadSection" => {
    ...,
    "pdfUrl": pdfFile.asset->url
  },
  _type == "missionVisionSection" => { ... },
  _type == "smartTipsPdfSection" => {
    ...,
    "featuredPdfUrl": featuredPdf.asset->url,
    tipCards[] {
      ...,
      "pdfUrl": pdfFile.asset->url
    }
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    "seo": seo {
      metaTitle,
      metaDescription,
      metaKeywords,
      "ogImage": ogImage.asset->url
    },
    "sections": sections[] {
      // For reusable sections, unwrap the template's section data
      _type == "reusableSection" => template->.section[0] {
        _type,
        _key,
        ...,
        ${sectionImageResolvers}
      },
      // For normal sections, pass through with image resolution
      _type != "reusableSection" => {
        _type,
        _key,
        ...,
        ${sectionImageResolvers}
      }
    }
  }
`;

export const allPageSlugsQuery = groq`
  *[_type == "page" && slug.current != "home"] { "slug": slug.current }
`;

// ─── Blog Posts ───────────────────────────────────────

export const allBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(date desc) {
    title,
    "slug": slug.current,
    date,
    category,
    readingTime,
    excerpt,
    "image": image.asset->url,
    "imageAlt": image.alt
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    date,
    category,
    readingTime,
    excerpt,
    content,
    "image": image.asset->url,
    "imageAlt": image.alt,
    "seo": seo {
      metaTitle,
      metaDescription,
      metaKeywords,
      "ogImage": ogImage.asset->url
    }
  }
`;

export const latestBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(date desc) [0..2] {
    title,
    "slug": slug.current,
    date,
    category,
    readingTime,
    excerpt,
    "image": image.asset->url,
    "imageAlt": image.alt
  }
`;

export const latestFourBlogPostsQuery = groq`
  *[_type == "blogPost"] | order(date desc) [0..3] {
    title,
    "slug": slug.current,
    date,
    category,
    readingTime,
    excerpt,
    "image": image.asset->url,
    "imageAlt": image.alt
  }
`;

export const recentPostsQuery = groq`
  *[_type == "blogPost" && slug.current != $slug] | order(date desc) [0..2] {
    title,
    "slug": slug.current,
    date,
    "image": image.asset->url,
    "imageAlt": image.alt
  }
`;

export const blogPostSlugsQuery = groq`
  *[_type == "blogPost"] { "slug": slug.current }
`;

// ─── Team Members ─────────────────────────────────────

export const allTeamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    "slug": coalesce(slug.current, _id),
    role,
    position,
    "image": image { asset, hotspot, crop },
    "imageAlt": image.alt
  }
`;

export const teamMemberBySlugQuery = groq`
  *[_type == "teamMember" && (slug.current == $slug || _id == $slug)][0] {
    _id,
    name,
    "slug": coalesce(slug.current, _id),
    role,
    position,
    bio,
    qualifications,
    workExperience,
    personalLife,
    socials,
    "image": image { asset, hotspot, crop },
    "imageAlt": image.alt,
    "imageUrl": image.asset->url,
    "seo": seo {
      metaTitle,
      metaDescription,
      metaKeywords,
      "ogImage": ogImage.asset->url
    }
  }
`;

export const allTeamMemberSlugsQuery = groq`
  *[_type == "teamMember"] { "slug": coalesce(slug.current, _id) }
`;

// ─── Nav & Footer from section templates (for blog/team pages) ───
// Navigation v2 and Main Footer v2 live in sectionTemplate docs, not in page sections.

export const navigationV2Query = groq`
  *[_type == "sectionTemplate" && name == "Main Navigation v2"][0].section[0] {
    _type, _key, layout, "logo": logo.asset->url, logoLine1, showTopBar, topBarLeftLinks, topBarRightLinks, navItems
  }
`;

export const footerV2Query = groq`
  *[_type == "sectionTemplate" && name == "Main Footer v2"][0].section[0] {
    _type, _key, layout, "logo": logo.asset->url, logoText, newsletterLabel, newsletterPlaceholder, newsletterButtonText, newsletterEmail,
    contactLabel, contactEmail, contactNumber, contactAddress,
    twoPartServicesLabel, twoPartServiceLinks, twoPartAboutLabel, twoPartAboutLinks, followLabel, twoPartSocialLinks, copyrightText
  }
`;

// ─── Services ─────────────────────────────────────────

/** Services for book-online page (same as allServices; duration/price removed from schema) */
export const bookableServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    title,
    description,
    categorySegment,
    "slug": slug.current
  }
`;

export const allServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    title,
    description,
    categorySegment,
    "slug": slug.current
  }
`;

export const allServicePathsQuery = groq`
  *[_type == "service" && defined(categorySegment) && defined(slug.current)] {
    "category": categorySegment,
    "slug": slug.current
  }
`;

export const serviceByPathQuery = groq`
  *[
    _type == "service" &&
    categorySegment == $category &&
    slug.current == $slug &&
][0] {
    title,
    "slug": slug.current,
    categorySegment,
    description,
    "sections": sections[] {
      // Match pageBySlugQuery behavior: unwrap reusableSection and resolve images
      _type == "reusableSection" => template->.section[0] {
        _type,
        _key,
        ...,
        ${sectionImageResolvers}
      },
      _type != "reusableSection" => {
        _type,
        _key,
        ...,
        ${sectionImageResolvers}
      }
    },
    "seo": seo {
      metaTitle,
      metaDescription,
      metaKeywords,
      "ogImage": ogImage.asset->url
    }
  }
`;
