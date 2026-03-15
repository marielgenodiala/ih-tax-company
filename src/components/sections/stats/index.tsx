import StatsDefault from "./Default";
import StatsWithPartners from "./StatsWithPartners";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface StatsSectionProps {
  _type?: "statsSection";
  variant?: "default" | "withPartners";
  stats?: { number: string; label: string }[];
  shortDesc?: string;
  partners?: { image?: string; title?: string; link?: string }[];
  [key: string]: any;
}

/**
 * Renders the appropriate stats variant.
 * - variant "default" → StatsDefault (simple grid)
 * - variant "withPartners" → StatsWithPartners (3 per row, gray-400 bg, short desc, partners)
 */
export default function Stats(props: StatsSectionProps) {
  const { variant, stats, shortDesc, partners } = props;

  if (variant === "withPartners") {
    return (
      <StatsWithPartners
        stats={stats}
        shortDesc={shortDesc}
        partners={partners}
      />
    );
  }

  return <StatsDefault stats={stats} />;
}
