"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import RevealWrapper from "@/components/ui/RevealWrapper";
import { parseEmphasis } from "@/lib/normalizeHref";

interface FormField {
  label: string;
  fieldType: string;
  required?: boolean;
  halfWidth?: boolean;
}

interface ContactFormProps {
  subtitle?: string;
  title?: string;
  description?: string;
  formFields?: FormField[];
  buttonText?: string;
}

const defaultFields: FormField[] = [
  { label: "First Name", fieldType: "text", required: true, halfWidth: true },
  { label: "Last Name", fieldType: "text", required: true, halfWidth: true },
  { label: "Email", fieldType: "email", required: true },
  { label: "Phone", fieldType: "tel", required: false },
  { label: "Company", fieldType: "text", required: false },
  { label: "Address", fieldType: "text", required: false },
];

function toFieldName(label: string) {
  return label.toLowerCase().replace(/\s+/g, "_");
}

function groupFields(fields: FormField[]) {
  const rows: (FormField | [FormField, FormField])[] = [];
  let i = 0;
  while (i < fields.length) {
    if (fields[i].halfWidth && i + 1 < fields.length && fields[i + 1].halfWidth) {
      rows.push([fields[i], fields[i + 1]]);
      i += 2;
    } else {
      rows.push(fields[i]);
      i++;
    }
  }
  return rows;
}

function renderField(field: FormField) {
  const name = toFieldName(field.label);
  const id = `contact-${name}`;

  if (field.fieldType === "textarea") {
    return (
      <div key={name} className="form__group">
        <label htmlFor={id} className="form__label">{field.label}</label>
        <textarea id={id} name={name} className="form__input" rows={4} required={field.required} />
      </div>
    );
  }

  return (
    <div key={name} className="form__group">
      <label htmlFor={id} className="form__label">{field.label}</label>
      <input type={field.fieldType || "text"} id={id} name={name} className="form__input" required={field.required} />
    </div>
  );
}

export default function ContactForm({
  subtitle,
  title,
  description,
  formFields,
  buttonText,
}: ContactFormProps = {}) {
  const fields = formFields?.length ? formFields : defaultFields;
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

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
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact__grid">
          <RevealWrapper direction="left">
            <div className="contact__info">
              <span className="section-label">{subtitle || "Get in Touch"}</span>
              <h2>
                {title ? parseEmphasis(title) : (
                  <>Add Your Details, <em>Get Started Now</em></>
                )}
              </h2>
              <p>
                {description ||
                  "Let us know how we can help. Fill in the form and a member of our team will be in touch to discuss how we can assist you."}
              </p>
            </div>
          </RevealWrapper>
          <RevealWrapper direction="right">
            <div className="contact__form">
              <form className="form" ref={formRef} onSubmit={handleSubmit}>
                {groupFields(fields).map((row, i) => {
                  if (Array.isArray(row)) {
                    return (
                      <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)" }}>
                        {renderField(row[0])}
                        {renderField(row[1])}
                      </div>
                    );
                  }
                  return renderField(row);
                })}
                {status === "error" && (
                  <p className="form-error">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  className="btn btn--primary btn--arrow"
                  style={{ width: "100%", justifyContent: "center" }}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Sending…" : (buttonText || "Submit")}
                </button>
              </form>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
