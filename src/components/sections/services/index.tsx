import Default, { type ServicesProps } from "./Default";
import Carousel, {
  type ServicesCarouselItem,
  type ServicesCarouselProps,
} from "./Carousel";
import ServicesWhoWeServe from "./ServicesWhoWeServe";
import ServicesExploreList, { type ServicesExploreListProps } from "./ServicesExploreList";
import ServicesPartnerGrid, { type PartnerCardItem } from "./ServicesPartnerGrid";

export interface ServicesSectionProps
  extends ServicesProps,
    ServicesCarouselProps {
  _type?: string;
  variant?: "grid" | "carousel" | "whoWeServe" | "exploreList" | "partnerGrid";
  items?: ServicesCarouselItem[];
  industryItems?: string[] | null;
  hasBackground?: boolean | null;
  exploreListItems?: ServicesExploreListProps["exploreListItems"];
  categoryLabel?: string | null;
  categoryTitle?: string | null;
  categoryDescription?: string | null;
  partnerCards?: PartnerCardItem[] | null;
}

export default function ServicesSection(props: ServicesSectionProps) {
  const {
    variant = "grid",
    subtitle,
    title,
    description,
    useServiceList,
    items,
    industryItems,
    exploreListItems,
    categoryLabel,
    categoryTitle,
    categoryDescription,
    partnerCards,
  } = props;

  if (variant === "partnerGrid") {
    return (
      <ServicesPartnerGrid
        categoryLabel={categoryLabel}
        categoryTitle={categoryTitle}
        categoryDescription={categoryDescription}
        partnerCards={partnerCards}
        hasBackground={props.hasBackground}
      />
    );
  }

  if (variant === "carousel") {
    return (
      <Carousel
        subtitle={subtitle}
        title={title}
        description={description}
        items={items}
      />
    );
  }

  if (variant === "whoWeServe") {
    return (
      <ServicesWhoWeServe
        subtitle={subtitle}
        title={title}
        description={description}
        industryItems={industryItems}
        hasBackground={props.hasBackground}
      />
    );
  }

  if (variant === "exploreList") {
    return (
      <ServicesExploreList
        subtitle={subtitle}
        title={title}
        description={description}
        exploreListItems={exploreListItems}
      />
    );
  }

  return (
    <Default
      subtitle={subtitle}
      title={title}
      description={description}
      useServiceList={useServiceList}
    />
  );
}

