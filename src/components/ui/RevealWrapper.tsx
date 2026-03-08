"use client";

import { useEffect, useRef, ReactNode } from "react";

interface RevealWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4;
  direction?: "up" | "left" | "right";
  id?: string;
}

export default function RevealWrapper({
  children,
  className = "",
  delay,
  direction = "up",
  id,
}: RevealWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const directionClass =
    direction === "left" ? "reveal-left" : direction === "right" ? "reveal-right" : "reveal";
  const delayClass = delay ? `reveal-delay-${delay}` : "";

  return (
    <div ref={ref} id={id} className={`${directionClass} ${delayClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
