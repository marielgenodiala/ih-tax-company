import Link from "next/link";
import RevealWrapper from "@/components/ui/RevealWrapper";

export default function OpeningHours() {
  return (
    <section className="section section--light opening-hours">
      <div className="container">
        <div className="opening-hours__grid">
          <RevealWrapper direction="left">
            <div className="opening-hours__text">
              <span className="section-label">Come Visit</span>
              <h2>Opening Hours</h2>
              <p>
                Level 17, 9 Castlereagh Street
                <br />
                Sydney NSW 2000
              </p>
            </div>
          </RevealWrapper>
          <RevealWrapper direction="right">
            <div className="opening-hours__schedule">
              <div className="opening-hours__row">
                <span>Monday &ndash; Friday</span>
                <span>9:00 AM &ndash; 6:00 PM</span>
              </div>
              <div className="opening-hours__row">
                <span>Saturday &ndash; Sunday</span>
                <span>Closed</span>
              </div>
              <Link href="/book-online" className="btn btn--primary btn--arrow">
                Book an Appointment
              </Link>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
