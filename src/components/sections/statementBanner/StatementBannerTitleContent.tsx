import { parseEmphasis } from "@/lib/normalizeHref";
import RevealWrapper from "@/components/ui/RevealWrapper";

export interface ContentBlock {
  _key?: string;
  text?: string;
}

interface StatementBannerTitleContentProps {
  title?: string;
  contentBlocks?: ContentBlock[] | null;
}

export default function StatementBannerTitleContent({
  title,
  contentBlocks,
}: StatementBannerTitleContentProps) {
  const blocks = contentBlocks?.filter((b) => b?.text?.trim()) ?? [];

  return (
    <section className="statement statement--title-content">
      <div className="statement__title-content-inner container">
        {title && (
          <RevealWrapper>
            <h2 className="statement__title">{title}</h2>
          </RevealWrapper>
        )}
        {blocks.length > 0 && (
          <div className="statement__content-blocks">
            {blocks.map((block, i) => (
              <RevealWrapper
                key={block._key ?? i}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              >
                <p className="statement__content-block">
                  {parseEmphasis(block.text ?? "")}
                </p>
              </RevealWrapper>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
