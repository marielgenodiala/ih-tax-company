import { parseEmphasis } from "@/lib/normalizeHref";

export interface HeroPageProps {
  title?: string;
  description?: string;
  backgroundImage?: string;
}

export default function HeroPage({
  title = "Page Title",
  description,
  backgroundImage,
}: HeroPageProps) {
  const bgUrl = backgroundImage || "/images/accountingImage2.avif";

  return (
    <section
      className="page-hero"
      style={{ backgroundImage: `url('${bgUrl}')` }}
    >
      <div className="container">
        <h1>{parseEmphasis(title)}</h1>
        {description && <p>{description}</p>}
      </div>
    </section>
  );
}
