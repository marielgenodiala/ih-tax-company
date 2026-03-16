import { parseEmphasis } from "@/lib/normalizeHref";

export interface HeroPageProps {
  title?: string;
  description?: string;
  backgroundImage?: string;
}

export default function HeroPage({
  title,
  description,
  backgroundImage,
}: HeroPageProps) {
  const bgUrl = backgroundImage || "/images/accountingImage2.avif";
  const hasTitle = Boolean(title?.trim());
  const hasDescription = Boolean(description?.trim());

  return (
    <section
      className="page-hero"
      style={{ backgroundImage: `url('${bgUrl}')` }}
    >
      <div className="container">
        {hasTitle && <h1>{parseEmphasis(title!)}</h1>}
        {hasDescription && <p>{description}</p>}
      </div>
    </section>
  );
}
