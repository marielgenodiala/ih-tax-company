import RevealWrapper from "@/components/ui/RevealWrapper";

const stats = [
  { number: "10+", label: "Years Experience" },
  { number: "500+", label: "Tax Returns Lodged" },
  { number: "100%", label: "Client Satisfaction" },
  { number: "50+", label: "Business Clients" },
];

export default function Stats() {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats__grid">
          {stats.map((stat, i) => (
            <RevealWrapper key={stat.label} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <div className="stats__item">
                <span className="stats__number">{stat.number}</span>
                <span className="stats__label">{stat.label}</span>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
