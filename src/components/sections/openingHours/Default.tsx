import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";
import { normalizeHref, parseEmphasis } from "@/lib/normalizeHref";

const defaultHours = [
  { days: "Monday \u2013 Friday", hours: "9:00 AM \u2013 6:00 PM" },
  { days: "Saturday \u2013 Sunday", hours: "Closed" },
];

interface OpeningHoursProps {
  subtitle?: string;
  title?: string;
  address?: string;
  hours?: { days: string; hours: string }[];
  buttonText?: string;
  buttonHref?: string;
}

export default function OpeningHours({
  subtitle,
  title,
  address,
  hours,
  buttonText,
  buttonHref,
}: OpeningHoursProps = {}) {
  const scheduleItems = hours?.length ? hours : defaultHours;
  const addressText = address || "Level 17, 9 Castlereagh Street\nSydney NSW 2000";

  return (
    <section className="section section--light opening-hours">
      <div className="container">
        <div className="opening-hours__grid">
          <div className="opening-hours__text">
            <RevealWrapper direction="left">
              <span className="section-label">{subtitle || "Come Visit"}</span>
            </RevealWrapper>
            <RevealWrapper direction="left" delay={1}>
              <h2>{title ? parseEmphasis(title) : "Opening Hours"}</h2>
            </RevealWrapper>
            <RevealWrapper direction="left" delay={2}>
              <p>
                {addressText.split("\n").map((line, i) => (
                  <span key={i}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            </RevealWrapper>
          </div>
          <div className="opening-hours__schedule">
            {scheduleItems.map((item, i) => (
              <RevealWrapper
                key={item.days}
                direction="right"
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
              >
                <div className="opening-hours__row">
                  <span>{item.days}</span>
                  <span>{item.hours}</span>
                </div>
              </RevealWrapper>
            ))}
            <RevealWrapper direction="right" delay={2}>
              <Link
                href={normalizeHref(buttonHref || "/book-online")}
                className="btn btn--primary btn--arrow"
              >
                {buttonText || "Book an Appointment"}
              </Link>
            </RevealWrapper>
          </div>
        </div>
      </div>
    </section>
  );
}
