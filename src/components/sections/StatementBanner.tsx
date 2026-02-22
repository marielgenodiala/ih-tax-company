import RevealWrapper from "@/components/ui/RevealWrapper";
import { urlFor } from "@/sanity/lib/image";
import { parseEmphasis } from "@/lib/normalizeHref";

interface StatementBannerProps {
  statement?: string;
  backgroundImage?: { asset?: { _ref: string } };
}

export default function StatementBanner({
  statement,
  backgroundImage,
}: StatementBannerProps = {}) {
  const bgUrl = backgroundImage?.asset?._ref
    ? urlFor(backgroundImage).width(1920).url()
    : "/images/meetingRoomChairImage.avif";

  return (
    <section
      className="statement"
      style={{ backgroundImage: `url('${bgUrl}')` }}
    >
      <div className="container">
        <RevealWrapper>
          <p className="statement__text">
            {statement ? parseEmphasis(statement) : (
              <>
                I H Professionals &amp; Co Pty Ltd provides{" "}
                <em>unparalleled personalised accounting services</em> to a broad range
                of clients across Australia. As your certified accountants, we ensure all
                of your financial decisions are made carefully and with your{" "}
                <em>best interests</em> in mind.
              </>
            )}
          </p>
        </RevealWrapper>
      </div>
    </section>
  );
}
