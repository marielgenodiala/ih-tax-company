"use client";

import { useState } from "react";
import RevealWrapper from "@/components/ui/RevealWrapper";
import BookingModal from "@/components/ui/BookingModal";
import Footer from "@/components/layout/Footer";

const services = [
  {
    title: "Management Accounting",
    description:
      "Our advisors provide individualised services to help alleviate your financial uncertainty and stress. With many years of experience, our experts have the knowledge and expertise to handle any situation.",
    duration: "1 hr",
    price: "$19.99 USD",
  },
  {
    title: "Tax Accounting",
    description:
      "No matter what type of financial situation you have, our team of experts will provide the best course of action. We serve clients with both individual and business needs.",
    duration: "1 hr",
    price: "$19.99 USD",
  },
  {
    title: "Auditing",
    description:
      "We stay up-to-date on all the regulatory and legislative developments so you don\u2019t waste time and energy trying to make sense of all the accounting complexities.",
    duration: "1 hr",
    price: "$19.99 USD",
  },
];

export default function BookOnlinePage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <>
      <section
        className="page-hero"
        style={{ backgroundImage: "url('/images/accountingImage2.avif')" }}
      >
        <div className="container">
          <h1>Book Online</h1>
          <p>Select a service below to schedule your appointment.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="booking__list">
            {services.map((service, i) => (
              <RevealWrapper key={service.title} delay={((i + 1) as 1 | 2 | 3)}>
                <div className="booking-item">
                  <div className="booking-item__info">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <div className="booking-item__details">
                      <span className="booking-item__tag">{service.duration}</span>
                      <span className="booking-item__price">{service.price}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn--primary btn--arrow"
                    onClick={() => setSelectedService(service.title)}
                  >
                    Book Now
                  </button>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {selectedService && (
        <BookingModal
          serviceName={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}

      <Footer />
    </>
  );
}
