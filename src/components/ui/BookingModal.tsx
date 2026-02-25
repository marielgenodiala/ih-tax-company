"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface BookingModalProps {
  serviceName: string;
  onClose: () => void;
}

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
];

export default function BookingModal({ serviceName, onClose }: BookingModalProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("Full Name"),
          email: formData.get("Email"),
          service: serviceName,
          date: formData.get("Preferred Date"),
          time: formData.get("Preferred Time"),
        }),
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

          <>
            <h2 className="modal__title">Book an Appointment</h2>
            <p className="modal__subtitle">{serviceName}</p>
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__group">
                <label htmlFor="booking-name" className="form__label">Full Name</label>
                <input type="text" id="booking-name" name="Full Name" className="form__input" required />
              </div>
              <div className="form__group">
                <label htmlFor="booking-email" className="form__label">Email</label>
                <input type="email" id="booking-email" name="Email" className="form__input" required />
              </div>
              <div className="form__group">
                <label htmlFor="booking-date" className="form__label">Preferred Date</label>
                <input type="date" id="booking-date" name="Preferred Date" className="form__input" min={minDate} required />
              </div>
              <div className="form__group">
                <label htmlFor="booking-time" className="form__label">Preferred Time</label>
                <select id="booking-time" name="Preferred Time" className="form__select" required defaultValue="">
                  <option value="" disabled>Select a time</option>
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
              {status === "error" && (
                <p className="form-error">Something went wrong. Please try again.</p>
              )}
              <button
                type="submit"
                className="btn btn--primary btn--arrow"
                style={{ width: "100%", justifyContent: "center", marginTop: "var(--space-2)" }}
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending…" : "Book Now"}
              </button>
            </form>
          </>
      </div>
    </div>
  );
}
