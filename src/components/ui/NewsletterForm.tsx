"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewsletterForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.get("email") }),
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
    <form className="footer__newsletter" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email address"
        className="form__input"
        required
        disabled={status === "loading"}
      />
      <button type="submit" className="btn btn--primary" disabled={status === "loading"}>
        {status === "loading" ? "…" : "Subscribe"}
      </button>
      {status === "error" && (
        <p style={{ color: "#f87171", fontSize: "0.75rem", margin: "4px 0 0" }}>
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
