"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface ClickableImageProps {
  src: string;
  /** Full-resolution URL shown in the modal. Falls back to src if not provided. */
  fullSrc?: string;
  alt: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
  caption?: string;
}

export default function ClickableImage({
  src,
  fullSrc,
  alt,
  width,
  height,
  style,
  caption,
}: ClickableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
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
      {/* Close button */}
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
          zIndex: 1,
        }}
      >
        ✕
      </button>

      {/* Image — use plain <img> so the browser renders it at its natural size */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "default",
          padding: "1rem",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fullSrc ?? src}
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
        {caption && (
          <p
            style={{
              marginTop: "0.75rem",
              color: "rgba(255,255,255,0.75)",
              fontSize: "0.875rem",
              textAlign: "center",
            }}
          >
            {caption}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className="clickable-image"
        onClick={() => setIsOpen(true)}
        aria-label={`View full image: ${alt}`}
      >
        <Image src={src} alt={alt} width={width} height={height} style={style} />
        {caption && <p className="article-image__caption">{caption}</p>}
      </button>

      {mounted && isOpen && createPortal(modal, document.body)}
    </>
  );
}
