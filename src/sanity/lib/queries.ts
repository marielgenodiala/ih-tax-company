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
  _type == "navigationSection" => {
    ...,
    "logo": logo.asset->url
  },
  _type == "footerSection" => {
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
  _type == "pageHeroSection" => {
    ...,
    "backgroundImage": backgroundImage.asset->url
  }
`;

export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
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
    "imageAlt": image.alt
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
    name,
    role,
    "image": image.asset->url,
    "imageAlt": image.alt
  }
`;

// ─── Services ─────────────────────────────────────────

export const allServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    title,
    description,
    icon,
    duration,
    price,
    isBookable
  }
`;

export const bookableServicesQuery = groq`
  *[_type == "service" && isBookable == true] | order(order asc) {
    title,
    description,
    duration,
    price
  }
`;
