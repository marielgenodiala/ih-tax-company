import RevealWrapper from "@/components/ui/RevealWrapper";
import {
  TaxIcon,
  ManagementIcon,
  AuditIcon,
  BasIcon,
  BookkeepingIcon,
  PlanningIcon,
} from "@/lib/icons";

const services = [
  {
    icon: <TaxIcon />,
    title: "Tax Accounting",
    text: "No matter what type of financial situation you have, our team of experts will provide the best course of action. We serve clients with both individual and business needs.",
  },
  {
    icon: <ManagementIcon />,
    title: "Management Accounting",
    text: "Our advisors provide individualised services to help alleviate your financial uncertainty and stress. With many years of experience, our experts handle any situation.",
  },
  {
    icon: <AuditIcon />,
    title: "Auditing",
    text: "We stay up-to-date on all the regulatory and legislative developments so you don\u2019t waste time trying to make sense of all the accounting complexities.",
  },
  {
    icon: <BasIcon />,
    title: "BAS & IAS Lodgement",
    text: "Timely preparation and lodgement of your Business Activity Statements and Instalment Activity Statements to keep you compliant.",
  },
  {
    icon: <BookkeepingIcon />,
    title: "Bookkeeping Services",
    text: "Accurate and reliable bookkeeping to keep your financial records organised and up to date throughout the year.",
  },
  {
    icon: <PlanningIcon />,
    title: "Tax Planning & Advisory",
    text: "Strategic tax planning to help you minimise your tax obligations and make informed financial decisions year-round.",
  },
];

export default function Services() {
  return (
    <section className="section section--light" id="services">
      <div className="container">
        <RevealWrapper>
          <div className="section__header">
            <span className="section-label">Services</span>
            <h2>What You Need</h2>
            <p>
              Comprehensive taxation and accounting solutions tailored to your needs.
            </p>
          </div>
        </RevealWrapper>
        <div className="grid grid--3">
          {services.map((service, i) => (
            <RevealWrapper key={service.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div className="card">
                <div className="card__icon">{service.icon}</div>
                <h3 className="card__title">{service.title}</h3>
                <p className="card__text">{service.text}</p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
