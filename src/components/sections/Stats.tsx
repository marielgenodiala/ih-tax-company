"use client";

import { useEffect, useRef, useState } from "react";
import RevealWrapper from "@/components/ui/RevealWrapper";

const defaultStats = [
  { number: "10+", label: "Years Experience" },
  { number: "500+", label: "Tax Returns Lodged" },
  { number: "100%", label: "Client Satisfaction" },
  { number: "50+", label: "Business Clients" },
];

interface StatsProps {
  stats?: { number: string; label: string }[];
}

function parseStatNumber(str: string): { value: number; suffix: string; prefix: string } {
  const match = str.match(/^([^0-9]*)(\d+\.?\d*)(.*)$/);
  if (!match) return { value: 0, suffix: str, prefix: "" };
  return { value: parseFloat(match[2]), suffix: match[3], prefix: match[1] };
}

function CountUpNumber({ value: str }: { value: string }) {
  const { value: target, suffix, prefix } = parseStatNumber(str);
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const startTime = performance.now();

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

export default function Stats({ stats }: StatsProps = {}) {
  const items = stats?.length ? stats : defaultStats;

  return (
    <section className="stats">
      <div className="container">
        <div className="stats__grid">
          {items.map((stat, i) => (
            <RevealWrapper key={stat.label} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <div className="stats__item">
                <span className="stats__number">
                  <CountUpNumber value={stat.number} />
                </span>
                <span className="stats__label">{stat.label}</span>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
