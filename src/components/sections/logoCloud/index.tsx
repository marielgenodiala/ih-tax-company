import Default from "./Default";
import LogoCloudCarousel from "./CarouselLoop";

interface LogoItem {
  image?: string;
  alt: string;
  buttonLabel?: string;
  buttonHref?: string;
}

interface LogoCloudSectionProps {
  _type?: "logoCloudSection";
  variant?: "default" | "loopCarousel";
  title?: string;
  logos?: LogoItem[];
}

export default function LogoCloudSection(props: LogoCloudSectionProps) {
  const { variant = "default", title, logos } = props;

  if (variant === "loopCarousel") {
    return <LogoCloudCarousel title={title} logos={logos} />;
  }

  return <Default title={title} logos={logos} />;
}
