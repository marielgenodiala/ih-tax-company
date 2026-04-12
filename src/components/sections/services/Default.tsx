import { type ReactNode } from "react";
import RevealWrapper from "@/components/ui/RevealWrapper";
import {
  TaxIcon,
  ManagementIcon,
  AuditIcon,
  BasIcon,
  BookkeepingIcon,
  PlanningIcon,
  SmsfIcon,
  AsicIcon,
  PayrollIcon,
  ComplianceIcon,
  InvestmentIcon,
} from "@/lib/icons";
import { client } from "@/sanity/lib/client";
import { allServicesQuery } from "@/sanity/lib/queries";
import { parseEmphasis } from "@/lib/normalizeHref";

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface ServicesProps {
  subtitle?: string;
  title?: string;
  description?: string;
  useServiceList?: boolean;
}

export const iconMap: Record<string, ReactNode> = {
  tax: <TaxIcon />,
  management: <ManagementIcon />,
  audit: <AuditIcon />,
  bas: <BasIcon />,
  bookkeeping: <BookkeepingIcon />,
  planning: <PlanningIcon />,
  smsf: <SmsfIcon />,
  asic: <AsicIcon />,
  payroll: <PayrollIcon />,
  compliance: <ComplianceIcon />,
  investment: <InvestmentIcon />,
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

  const hasSubtitle = Boolean(subtitle?.trim());
  const hasTitle = Boolean(title?.trim());
  const hasDescription = Boolean(description?.trim());
  const hasHeader = hasSubtitle || hasTitle || hasDescription;

  return (
    <section className="section section--light" id="services">
      <div className="container">
        {hasHeader && (
          <div className="section__header">
            {hasSubtitle && (
              <RevealWrapper>
                <span className="section-label">{subtitle}</span>
              </RevealWrapper>
            )}
            {hasTitle && (
              <RevealWrapper delay={hasSubtitle ? 1 : undefined}>
                <h2>{parseEmphasis(title!)}</h2>
              </RevealWrapper>
            )}
            {hasDescription && (
              <RevealWrapper
                delay={
                  hasSubtitle && hasTitle ? 2 : hasSubtitle || hasTitle ? 1 : undefined
                }
              >
                <p>{description}</p>
              </RevealWrapper>
            )}
          </div>
        )}
        {services.length > 0 && (
          <div className="services-grid">
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
