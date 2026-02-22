import { type ReactNode } from "react";
import RevealWrapper from "@/components/ui/RevealWrapper";
import {
  TaxIcon,
  ManagementIcon,
  AuditIcon,
  BasIcon,
  BookkeepingIcon,
  PlanningIcon,
} from "@/lib/icons";
import { client } from "@/sanity/lib/client";
import { allServicesQuery } from "@/sanity/lib/queries";
import { parseEmphasis } from "@/lib/normalizeHref";

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface ServicesProps {
  subtitle?: string;
  title?: string;
  description?: string;
  useServiceList?: boolean;
}

const iconMap: Record<string, ReactNode> = {
  tax: <TaxIcon />,
  management: <ManagementIcon />,
  audit: <AuditIcon />,
  bas: <BasIcon />,
  bookkeeping: <BookkeepingIcon />,
  planning: <PlanningIcon />,
};

export default async function Services({
  subtitle,
  title,
  description,
  useServiceList = true,
}: ServicesProps) {
  const services: Service[] = useServiceList
    ? await client.fetch(allServicesQuery)
    : [];

  return (
    <section className="section section--light" id="services">
      <div className="container">
        <RevealWrapper>
          <div className="section__header">
            <span className="section-label">{subtitle || "Services"}</span>
            <h2>{title ? parseEmphasis(title) : "What You Need"}</h2>
            <p>
              {description ||
                "Comprehensive taxation and accounting solutions tailored to your needs."}
            </p>
          </div>
        </RevealWrapper>
        {services.length > 0 && (
          <div className="grid grid--3">
            {services.map((service, i) => (
              <RevealWrapper key={service.title} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div className="card">
                  <div className="card__icon">
                    {iconMap[service.icon] || <TaxIcon />}
                  </div>
                  <h3 className="card__title">{service.title}</h3>
                  <p className="card__text">{service.description}</p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
