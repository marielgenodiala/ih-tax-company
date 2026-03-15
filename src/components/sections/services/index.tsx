import Default, { type ServicesProps } from "./Default";
import Carousel, {
  type ServicesCarouselItem,
  type ServicesCarouselProps,
} from "./Carousel";

export interface ServicesSectionProps
  extends ServicesProps,
    ServicesCarouselProps {
  _type: string;
  variant?: "grid" | "carousel";
  items?: ServicesCarouselItem[];
}

export default function ServicesSection(props: ServicesSectionProps) {
  const {
    variant = "grid",
    subtitle,
    title,
    description,
    useServiceList,
    items,
  } = props;

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

  return (
    <Default
      subtitle={subtitle}
      title={title}
      description={description}
      useServiceList={useServiceList}
    />
  );
}

