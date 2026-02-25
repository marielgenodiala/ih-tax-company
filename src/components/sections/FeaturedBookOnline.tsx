"use client";

import { useState } from "react";
import RevealWrapper from "@/components/ui/RevealWrapper";
import BookingModal from "@/components/ui/BookingModal";
import { parseEmphasis } from "@/lib/normalizeHref";

interface FeaturedItem {
  title: string;
  description?: string;
  duration?: string;
  price?: string;
  buttonText?: string;
  buttonHref?: string;
}

interface FeaturedBookOnlineProps {
  subtitle?: string;
  title?: string;
  description?: string;
  consultationNote?: string;
  items?: FeaturedItem[];
}

export default function FeaturedBookOnline({
  subtitle,
  title,
  description,
  consultationNote,
  items = [],
}: FeaturedBookOnlineProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <>
      <section className="section">
        <div className="container">
          {(subtitle || title || description) && (
            <RevealWrapper>
              <div className="section__header">
                {subtitle && <span className="section-label">{subtitle}</span>}
                {title && <h2>{parseEmphasis(title)}</h2>}
                {description && <p>{description}</p>}
              </div>
            </RevealWrapper>
          )}
          <div className="booking__list">
            {items.map((item, i) => (
              <RevealWrapper key={item.title} delay={((i % 3 + 1) as 1 | 2 | 3)}>
                <div className="booking-item">
                  <div className="booking-item__info">
                    <h3>{item.title}</h3>
                    {item.description && <p>{item.description}</p>}
                    <div className="booking-item__details">
                      {item.duration && (
                        <span className="booking-item__tag">{item.duration}</span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn--primary btn--arrow"
                    onClick={() => setSelectedService(item.title)}
                  >
                    {item.buttonText || "Book Now"}
                  </button>
                </div>
              </RevealWrapper>
            ))}
          </div>
          {consultationNote && (
            <div className="booking-note">
              {consultationNote}
            </div>
          )}
        </div>
      </section>

      {selectedService && (
        <BookingModal
          serviceName={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
}
