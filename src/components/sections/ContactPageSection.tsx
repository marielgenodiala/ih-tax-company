"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import RevealWrapper from "@/components/ui/RevealWrapper";
import {
  parseEmphasis,
  normalizeHref,
  normalizeSocialUrl,
} from "@/lib/normalizeHref";
import {
  FacebookIcon,
  LinkedInIcon,
  InstagramIcon,
  TwitterIcon,
  WhatsAppIcon,
  YoutubeIcon,
  PhoneIcon,
  EmailIcon,
  ShareIcon,
} from "@/lib/icons";

interface FormField {
  label: string;
  fieldType: string;
  required?: boolean;
  halfWidth?: boolean;
}

interface HoursItem {
  days: string;
  hours: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface ContactPageSectionProps {
  sectionLabel?: string;
  subtitle?: string;
  title?: string;
  formTitle?: string;
  formIntro?: string;
  formFields?: FormField[];
  buttonText?: string;
  socialLinks?: SocialLink[];
  phone?: string;
  email?: string;
  hours?: HoursItem[];
  mapLinkUrl?: string;
  mapEmbedUrl?: string;
}

const defaultFormFields: FormField[] = [
  { label: "Name", fieldType: "text", required: true },
  { label: "Email Address", fieldType: "email", required: true },
  { label: "Phone Number", fieldType: "tel", required: false },
  { label: "Message", fieldType: "textarea", required: false },
];

const defaultHours: HoursItem[] = [
  { days: "Monday – Friday", hours: "9:00 AM – 6:00 PM" },
  { days: "Saturday – Sunday", hours: "Closed" },
];

const socialIconMap: Record<string, React.ComponentType> = {
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  youtube: YoutubeIcon,
  whatsapp: WhatsAppIcon,
};

function toFieldName(label: string) {
  return label.toLowerCase().replace(/\s+/g, "_");
}

function groupFields(fields: FormField[]) {
  const rows: (FormField | [FormField, FormField])[] = [];
  let i = 0;
  while (i < fields.length) {
    if (
      fields[i].halfWidth &&
      i + 1 < fields.length &&
      fields[i + 1].halfWidth
    ) {
      rows.push([fields[i], fields[i + 1]]);
      i += 2;
    } else {
      rows.push(fields[i]);
      i++;
    }
  }
  return rows;
}

function renderFormField(field: FormField) {
  const name = toFieldName(field.label);
  const id = `contact-page-${name}`;

  if (field.fieldType === "textarea") {
    return (
      <div key={name} className="form__group">
        <label htmlFor={id} className="form__label">
          {field.label}
        </label>
        <textarea
          id={id}
          name={name}
          className="form__input form__textarea"
          rows={4}
          required={field.required}
        />
      </div>
    );
  }

  return (
    <div key={name} className="form__group">
      <label htmlFor={id} className="form__label">
        {field.label}
      </label>
      <input
        type={field.fieldType || "text"}
        id={id}
        name={name}
        className="form__input"
        required={field.required}
      />
    </div>
  );
}

export default function ContactPageSection({
  subtitle,
  title,
  formTitle,
  formIntro,
  formFields,
  buttonText = "Submit",
  socialLinks,
  phone,
  email,
  hours,
  mapLinkUrl,
  mapEmbedUrl,
}: ContactPageSectionProps) {
  const fields = formFields?.length ? formFields : defaultFormFields;
  const scheduleItems = hours?.length ? hours : defaultHours;
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [resolvedEmbedUrl, setResolvedEmbedUrl] = useState<string | null>(null);
  const [mapEmbedLoading, setMapEmbedLoading] = useState(false);

  const mapSrc = mapEmbedUrl || resolvedEmbedUrl;

  useEffect(() => {
    if (mapEmbedUrl || !mapLinkUrl) return;
    setMapEmbedLoading(true);
    fetch(`/api/map-embed?url=${encodeURIComponent(mapLinkUrl)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.embedUrl) setResolvedEmbedUrl(data.embedUrl);
      })
      .catch(() => {})
      .finally(() => setMapEmbedLoading(false));
  }, [mapLinkUrl, mapEmbedUrl]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const collected = fields.map((f) => ({
      label: f.label,
      value: String(formData.get(toFieldName(f.label)) || ""),
    }));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: collected }),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/thank-you");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="section contact-page" id="contact">
      <div className="container">
        {(subtitle || title) && (
          <RevealWrapper>
            <div className="contact-page__header">
              {subtitle && <span className="section-label">{subtitle}</span>}
              {title && (
                <h2 className="contact-page__title">{parseEmphasis(title)}</h2>
              )}
            </div>
          </RevealWrapper>
        )}
        <div className="contact-page__grid">
          {/* Right: 3 cards + Opening hours (centered with form) */}

          <RevealWrapper direction="left">
            <div className="contact-page__form">
              <h3 className="contact-page__heading">{formTitle}</h3>
              {formIntro && (
                <p className="contact-page__form-intro">{formIntro}</p>
              )}
              <form className="form" ref={formRef} onSubmit={handleSubmit}>
                {groupFields(fields).map((row, i) => {
                  if (Array.isArray(row)) {
                    return (
                      <div
                        key={i}
                        className="form__row"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "var(--space-4)",
                        }}
                      >
                        {renderFormField(row[0])}
                        {renderFormField(row[1])}
                      </div>
                    );
                  }
                  return renderFormField(row);
                })}
                {status === "error" && (
                  <p className="form-error">
                    Something went wrong. Please try again.
                  </p>
                )}
                <button
                  type="submit"
                  className="btn btn--primary btn--arrow"
                  style={{ width: "100%", justifyContent: "center" }}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending…" : buttonText}
                </button>
              </form>
            </div>
          </RevealWrapper>
          <RevealWrapper direction="right">
            <div className="contact-page__info">
              <h3 className="contact-page__heading">Contacts</h3>

              <div className="contact-page__cards">
                {phone && (
                  <div className="contact-page__card">
                    <div className="contact-page__card-head">
                      <span className="contact-page__card-icon" aria-hidden>
                        <PhoneIcon />
                      </span>
                      <span className="contact-page__card-label">Phone</span>
                    </div>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="contact-page__card-link"
                    >
                      {phone}
                    </a>
                  </div>
                )}
                {email && (
                  <div className="contact-page__card contact-page__card--email">
                    <div className="contact-page__card-head">
                      <span className="contact-page__card-icon" aria-hidden>
                        <EmailIcon />
                      </span>
                      <span className="contact-page__card-label">Email</span>
                    </div>
                    <a
                      href={`mailto:${email}`}
                      className="contact-page__card-link contact-page__card-link--email"
                    >
                      <span className="contact-page__card-email-text">
                        {email}
                      </span>
                    </a>
                  </div>
                )}
                {socialLinks && socialLinks.length > 0 && (
                  <div className="contact-page__card">
                    <div className="contact-page__card-head">
                      <span className="contact-page__card-icon" aria-hidden>
                        <ShareIcon />
                      </span>
                      <span className="contact-page__card-label">Socials</span>
                    </div>
                    <div className="contact-page__socials">
                      {socialLinks.map((social) => {
                        const Icon = socialIconMap[social.platform];
                        return (
                          <a
                            key={social.platform}
                            href={normalizeSocialUrl(social.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="contact-page__social-link"
                            aria-label={social.platform}
                          >
                            {Icon && <Icon />}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <h3 className="contact-page__heading contact-page__hours-title">
                Opening Hours
              </h3>
              <div className="contact-page__hours">
                {scheduleItems.map((item) => (
                  <div key={item.days} className="contact-page__row">
                    <span>{item.days}</span>
                    <span>{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </RevealWrapper>
        </div>
      </div>

      {(mapLinkUrl || mapEmbedUrl) && (
        <div className="container contact-page__map-container">
          {mapEmbedLoading ? (
            <div className="contact-page__map-wrap contact-page__map-loading">
              <span className="contact-page__map-loading-text">
                Loading map…
              </span>
            </div>
          ) : mapSrc ? (
            mapLinkUrl ? (
              <a
                href={normalizeHref(mapLinkUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-page__map-wrap"
              >
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office location map"
                  className="contact-page__map-iframe"
                />
              </a>
            ) : (
              <div className="contact-page__map-wrap">
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office location map"
                  className="contact-page__map-iframe"
                />
              </div>
            )
          ) : null}
        </div>
      )}
    </section>
  );
}
