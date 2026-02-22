"use client";

import { useState } from "react";
import RevealWrapper from "@/components/ui/RevealWrapper";
import BookingModal from "@/components/ui/BookingModal";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface BookableService {
  title: string;
  description: string;
  duration: string;
  price: string;
}

export default function BookOnlineClient({ services }: { services: BookableService[] }) {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <>
      <Header />
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
