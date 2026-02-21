import RevealWrapper from "@/components/ui/RevealWrapper";

export default function ContactForm() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact__grid">
          <RevealWrapper direction="left">
            <div className="contact__info">
              <span className="section-label">Get in Touch</span>
              <h2>
                Add Your Details, <em>Get Started Now</em>
              </h2>
              <p>
                Let us know how we can help. Fill in the form and a member of our
                team will be in touch to discuss how we can assist you.
              </p>
            </div>
          </RevealWrapper>
          <RevealWrapper direction="right">
            <div className="contact__form">
              <form className="form" action="https://formsubmit.co/marielgenodiala.work@gmail.com" method="POST">
                <input type="hidden" name="_next" value="/thank-you" />
                <input type="hidden" name="_subject" value="New Contact Form Submission — IH Professionals" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                  <div className="form__group">
                    <label htmlFor="firstname" className="form__label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      className="form__input"
                      required
                    />
                  </div>
                  <div className="form__group">
                    <label htmlFor="lastname" className="form__label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      className="form__input"
                      required
                    />
                  </div>
                </div>
                <div className="form__group">
                  <label htmlFor="email" className="form__label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form__input"
                    required
                  />
                </div>
                <div className="form__group">
                  <label htmlFor="phone" className="form__label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form__input"
                  />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                  <div className="form__group">
                    <label htmlFor="company" className="form__label">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="form__input"
                    />
                  </div>
                  <div className="form__group">
                    <label htmlFor="position" className="form__label">
                      Position
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      className="form__input"
                    />
                  </div>
                </div>

                <div className="form__group">
                  <label htmlFor="address" className="form__label">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    className="form__input"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn--primary btn--arrow"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  Submit
                </button>
              </form>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
