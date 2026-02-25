"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface HeroImageModalProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
}

export default function HeroImageModal({
  src,
  alt,
  width,
  height,
  style,
}: HeroImageModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const modal = (
    <div
      onClick={close}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "zoom-out",
      }}
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close image"
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          background: "rgba(255,255,255,0.15)",
          border: "1px solid rgba(255,255,255,0.35)",
          color: "#fff",
          borderRadius: "50%",
          width: "2.5rem",
          height: "2.5rem",
          fontSize: "1.1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
        }}
      >
        ✕
      </button>

      <div
        onClick={(e) => e.stopPropagation()}
        style={{ cursor: "default", padding: "1rem" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth: "90vw",
            maxHeight: "85vh",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            borderRadius: "0.75rem",
            display: "block",
          }}
        />
      </div>
    </div>
  );

  return (
    /* Wrapper keeps the original Image layout; transparent overlay adds click */
    <div style={{ position: "relative", cursor: "zoom-in" }}>
      <Image src={src} alt={alt} width={width} height={height} style={style} />
      <div
        onClick={() => setIsOpen(true)}
        style={{ position: "absolute", inset: 0 }}
        aria-label={`View full image: ${alt}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setIsOpen(true); }}
      />
      {mounted && isOpen && createPortal(modal, document.body)}
    </div>
  );
}
