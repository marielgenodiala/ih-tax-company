import BlogPreviewDefault from "./Default";
import BlogPreviewLatestNews from "./BlogPreviewLatestNews";

export type BlogPreviewVariant = "default" | "latestNews";

export interface BlogPreviewSectionProps {
  _type: "blogPreviewSection";
  variant?: BlogPreviewVariant;
  sectionLabel?: string;
  subtitle?: string;
  title?: string;
  description?: string;
  alignLeft?: boolean;
  useBlogList?: boolean;
  readMoreLabel?: string;
  viewAllLabel?: string;
}

/**
 * Renders the appropriate blog preview variant.
 * - default: 3 cards grid + optional header, "View All Posts"
 * - latestNews: featured (1) + 3 side cards (4 total from Sanity), "View All Blogs" CTA
 */
export default function BlogPreview(props: BlogPreviewSectionProps) {
  const { variant, ...rest } = props;

  if (variant === "latestNews") {
    return (
      <BlogPreviewLatestNews
        title={rest.title}
        viewAllLabel={rest.viewAllLabel}
        useBlogList={rest.useBlogList}
      />
    );
  }

  return (
    <BlogPreviewDefault
      subtitle={rest.subtitle}
      title={rest.title}
      description={rest.description}
      useBlogList={rest.useBlogList}
      alignLeft={rest.alignLeft}
      readMoreLabel={rest.readMoreLabel}
    />
  );
}

export { BlogPreviewDefault, BlogPreviewLatestNews };
