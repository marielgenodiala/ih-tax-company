import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="hero "
      style={{ backgroundImage: "url('/images/heroImage.avif')" }}
    >
      <div className="hero__overlay"></div>
      <div className="container hero__content !px-4 lg:!px-20">
        <p className="hero__subtitle">
          Registered Tax Agent &middot; Business Consultant &middot; Sydney NSW
        </p>
        <h1 className="hero__title">
          Feel the <em>I H Professionals</em>
          <br />
          Difference
        </h1>
        <p className="hero__text">
          The care your accounting needs. We provide unparalleled personalised
          accounting services to individuals and businesses across Australia.
        </p>
        <div className="hero__cta-group">
          <Link href="/book-online" className="btn btn--primary btn--arrow">
            Book a Consultation
          </Link>
          <Link
            href="#services"
            className="btn btn--outline"
            style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}
          >
            Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
