"use client";

import { useEffect } from "react";

interface BookingModalProps {
  serviceName: string;
  onClose: () => void;
}

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
];

export default function BookingModal({ serviceName, onClose }: BookingModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Get tomorrow's date as the minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2 className="modal__title">Book an Appointment</h2>
        <p className="modal__subtitle">{serviceName}</p>
        <form
          className="form"
          action="https://formsubmit.co/marielgenodiala.work@gmail.com"
          method="POST"
        >
          <input type="hidden" name="_next" value="/thank-you" />
          <input
            type="hidden"
            name="_subject"
            value={`New Booking Request: ${serviceName} — IH Professionals`}
          />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="Service" value={serviceName} />

          <div className="form__group">
            <label htmlFor="booking-name" className="form__label">
              Full Name
            </label>
            <input
              type="text"
              id="booking-name"
              name="Full Name"
              className="form__input"
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="booking-email" className="form__label">
              Email
            </label>
            <input
              type="email"
              id="booking-email"
              name="Email"
              className="form__input"
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="booking-date" className="form__label">
              Preferred Date
            </label>
            <input
              type="date"
              id="booking-date"
              name="Preferred Date"
              className="form__input"
              min={minDate}
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="booking-time" className="form__label">
              Preferred Time
            </label>
            <select
              id="booking-time"
              name="Preferred Time"
              className="form__select"
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select a time
              </option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="btn btn--primary btn--arrow"
            style={{ width: "100%", justifyContent: "center", marginTop: "var(--space-2)" }}
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
}
