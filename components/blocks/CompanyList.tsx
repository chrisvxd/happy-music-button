"use client";

import { useMemo, useState } from "react";
import type { ComponentConfig } from "@puckeditor/core";
import { ArrowPill } from "../ui/ArrowPill";
import { LinkButton } from "../ui/LinkButton";
import { imageField, linkField, textOf, yesNo, type InlineText, type LinkValue } from "../fields";
import { Section, spaceField, type Space } from "./Section";
import { FilterTabs } from "./FilterTabs";
import styles from "./CompanyList.module.css";

export type CompanyItem = {
  name: InlineText;
  icon: string;
  tagline: InlineText;
  /** Plain text: also used as the filter key */
  category: string;
  href: string;
};

export type CompanyListProps = {
  heading: InlineText;
  showFilters: boolean;
  allLabel: string;
  filters: { label: string }[];
  companies: CompanyItem[];
  cta: LinkValue;
  spaceAbove: Space;
};

function CompanyCard({ company }: { company: CompanyItem }) {
  const Tag = company.href ? "a" : "div";
  return (
    <Tag className={styles.card} {...(company.href ? { href: company.href } : {})}>
      <div className={styles.cardTop}>
        <div className={styles.nameRow}>
          {company.icon ? <img src={company.icon} alt="" className={styles.icon} /> : null}
          <h3 className={styles.name}>{company.name}</h3>
          {company.href ? <ArrowPill className={styles.arrow} /> : null}
        </div>
        <p className={styles.tagline}>{company.tagline}</p>
      </div>
      {company.category ? <p className={styles.category}>{company.category}</p> : null}
    </Tag>
  );
}

function CompanyListView({ heading, showFilters, allLabel, filters, companies, cta, spaceAbove }: CompanyListProps) {
  const [active, setActive] = useState(allLabel || "All");
  const tabs = useMemo(
    () => [allLabel || "All", ...(filters || []).map((f) => f.label).filter(Boolean)],
    [allLabel, filters]
  );
  const visible =
    !showFilters || active === tabs[0]
      ? companies
      : companies.filter((c) => c.category === active);

  return (
    <Section spaceAbove={spaceAbove}>
      {heading ? <h2 className={`bs-h3 ${styles.heading}`}>{heading}</h2> : null}
      {showFilters ? <FilterTabs tabs={tabs} active={active} onChange={setActive} /> : null}
      <div className={styles.grid}>
        {(visible || []).map((company, i) => (
          <CompanyCard key={i} company={company} />
        ))}
      </div>
      {cta?.label ? (
        <div className={styles.cta}>
          <LinkButton label={cta.label} href={cta.href} />
        </div>
      ) : null}
    </Section>
  );
}

export const CompanyList: ComponentConfig<CompanyListProps> = {
  label: "Portfolio companies",
  fields: {
    heading: { type: "textarea", label: "Heading", contentEditable: true },
    showFilters: yesNo("Show category filters"),
    allLabel: { type: "text", label: "'All' filter label" },
    filters: {
      type: "array",
      label: "Filter categories",
      arrayFields: { label: { type: "text", label: "Category" } },
      getItemSummary: (item) => item.label || "Category",
      defaultItemProps: { label: "New category" },
    },
    companies: {
      type: "array",
      label: "Companies",
      arrayFields: {
        name: { type: "text", label: "Name", contentEditable: true },
        icon: imageField("Icon"),
        tagline: { type: "textarea", label: "Tagline", contentEditable: true },
        category: { type: "text", label: "Category" },
        href: { type: "text", label: "Link" },
      },
      getItemSummary: (item) => textOf(item.name) || "Company",
      defaultItemProps: {
        name: "New company",
        icon: "",
        tagline: "What the company does.",
        category: "Autonomy",
        href: "",
      },
    },
    cta: linkField("Button"),
    spaceAbove: spaceField(),
  },
  defaultProps: {
    heading: "",
    showFilters: false,
    allLabel: "All",
    filters: [],
    companies: [],
    cta: { label: "", href: "" },
    spaceAbove: "lg",
  },
  render: (props) => <CompanyListView {...props} />,
};
