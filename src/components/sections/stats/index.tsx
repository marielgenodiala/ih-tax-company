import StatsDefault from "./Default";
import StatsWithPartners from "./StatsWithPartners";
import FullWidthImageStats from "./FullWidthImageStats";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface StatsSectionProps {
  _type?: "statsSection";
  variant?: "default" | "withPartners" | "fullWidthImage";
  stats?: { number: string; label: string }[];
  shortDesc?: string;
  partners?: { image?: string; title?: string; link?: string }[];
  // full-width image variant
  backgroundImage?: string | null;
  title?: string | null;
  body?: string | null;
  [key: string]: any;
}

/**
 * Renders the appropriate stats variant.
 * - variant "default" → StatsDefault (simple grid)
 * - variant "withPartners" → StatsWithPartners (3 per row, gray-400 bg, short desc, partners)
 * - variant "fullWidthImage" → FullWidthImageStats (image strip + overlayed stats)
 */
export default function Stats(props: StatsSectionProps) {
  const { variant, stats, shortDesc, partners, backgroundImage, title, body } = props;

  if (variant === "withPartners") {
    return (
      <StatsWithPartners
        stats={stats}
        shortDesc={shortDesc}
        partners={partners}
      />
    );
  }

  if (variant === "fullWidthImage") {
    return (
      <FullWidthImageStats
        backgroundImage={backgroundImage}
        title={title}
        body={body}
        stats={stats}
        ctaLabel={props.ctaLabel}
        ctaHref={props.ctaHref}
      />
    );
  }

  return <StatsDefault stats={stats} />;
}
