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

function renderField(field: FormField) {
  const name = toFieldName(field.label);
  const id = `contact-${name}`;

  if (field.fieldType === "textarea") {
    return (
      <div key={name} className="form__group">
        <label htmlFor={id} className="form__label">
          {field.label}
        </label>
        <textarea
          id={id}
          name={name}
          className="form__input"
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

export default function ContactForm({
  subtitle,
  title,
  description,
  formFields,
  buttonText,
}: ContactFormProps = {}) {
  const fields = formFields?.length ? formFields : defaultFields;

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact__grid">
          <RevealWrapper direction="left">
            <div className="contact__info">
              <span className="section-label">{subtitle || "Get in Touch"}</span>
              <h2>
                {title ? parseEmphasis(title) : (
                  <>
                    Add Your Details, <em>Get Started Now</em>
                  </>
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
              <form
                className="form"
                action="https://formsubmit.co/marielgenodiala.work@gmail.com"
                method="POST"
              >
                <input type="hidden" name="_next" value="/thank-you" />
                <input
                  type="hidden"
                  name="_subject"
                  value="New Contact Form Submission — IH Professionals"
                />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                {groupFields(fields).map((row, i) => {
                  if (Array.isArray(row)) {
                    return (
                      <div
                        key={i}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: "var(--space-4)",
                        }}
                      >
                        {renderField(row[0])}
                        {renderField(row[1])}
                      </div>
                    );
                  }
                  return renderField(row);
                })}
                <button
                  type="submit"
                  className="btn btn--primary btn--arrow"
                  style={{ width: "100%", justifyContent: "center" }}
                >
                  {buttonText || "Submit"}
                </button>
              </form>
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
