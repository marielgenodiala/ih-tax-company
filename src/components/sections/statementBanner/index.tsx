import StatementBannerDefault from "./Default";
import StatementBannerTitleContent from "./StatementBannerTitleContent";

export type StatementBannerVariant = "default" | "titleContent";

export interface StatementBannerSectionProps {
  _type?: "statementBannerSection";
  variant?: StatementBannerVariant;
  sectionLabel?: string;
  statement?: string;
  backgroundImage?: { asset?: { _ref: string } };
  title?: string;
  contentBlocks?: { _key?: string; text?: string }[] | null;
}

/**
 * Renders the appropriate statement banner variant.
 * - default: statement text over background image
 * - titleContent: solid dark banner with title + content blocks (no image)
 */
export default function StatementBanner(props: StatementBannerSectionProps) {
  const { variant, ...rest } = props;

  if (variant === "titleContent") {
    return (
      <StatementBannerTitleContent
        title={rest.title}
        contentBlocks={rest.contentBlocks}
      />
    );
  }

  return (
    <StatementBannerDefault
      statement={rest.statement}
      backgroundImage={rest.backgroundImage}
    />
  );
}

export { StatementBannerDefault, StatementBannerTitleContent };
