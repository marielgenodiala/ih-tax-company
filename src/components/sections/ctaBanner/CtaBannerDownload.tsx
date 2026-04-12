import RevealWrapper from "@/components/ui/RevealWrapper";
import { parseEmphasis } from "@/lib/normalizeHref";

function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface CtaBannerDownloadProps {
  heading?: string;
  pdfUrl?: string | null;
}

export default function CtaBannerDownload({
  heading = "Download our Tax Calendar FY 2026",
  pdfUrl,
}: CtaBannerDownloadProps) {
  const href = pdfUrl?.trim();
  if (!href) return null;

  return (
    <section className="cta-banner cta-banner--download">
      <div className="container cta-banner--download__row">
        <RevealWrapper className="cta-banner--download__inner">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-banner--download__link"
          >
            <h3 className="cta-banner--download__title">
              {parseEmphasis(heading)}
            </h3>
            <span className="cta-banner--download__icon-wrap" aria-hidden>
              <DownloadIcon className="cta-banner--download__icon" />
            </span>
          </a>
        </RevealWrapper>
      </div>
    </section>
  );
}
