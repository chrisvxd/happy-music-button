"use client";

import { useMemo, useState } from "react";
import type { ComponentConfig } from "@puckeditor/core";
import { ArrowPill } from "../ui/ArrowPill";
import { isExternal } from "../../lib/site";
import { textOf, yesNo, type InlineText } from "../fields";
import { Section, spaceField, type Space } from "./Section";
import { FilterTabs } from "./FilterTabs";
import styles from "./InsightList.module.css";

type Insight = { title: InlineText; href: string; date: InlineText; category: string };

export type InsightListProps = {
  showTabs: boolean;
  allLabel: string;
  categories: { label: string }[];
  limit: number;
  items: Insight[];
  spaceAbove: Space;
};

function InsightListView({ showTabs, allLabel, categories, limit, items, spaceAbove }: InsightListProps) {
  const tabs = useMemo(
    () => [allLabel || "All", ...(categories || []).map((c) => c.label).filter(Boolean)],
    [allLabel, categories]
  );
  const [active, setActive] = useState(tabs[0]);
  const filtered =
    !showTabs || active === tabs[0]
      ? items || []
      : (items || []).filter((i) => i.category === active);
  const visible = limit > 0 ? filtered.slice(0, limit) : filtered;

  return (
    <Section spaceAbove={spaceAbove}>
      {showTabs ? <FilterTabs tabs={tabs} active={active} onChange={setActive} /> : null}
      <div className={styles.list}>
        {visible.map((item, i) => (
          <a
            key={i}
            href={item.href || "#"}
            className={styles.item}
            {...(isExternal(item.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <h3 className={styles.title}>{item.title}</h3>
            <div className={styles.meta}>
              <div className={styles.dateCat}>
                {item.date ? <span className={styles.date}>{item.date}</span> : null}
                {item.category ? <span className={styles.category}>{item.category}</span> : null}
              </div>
              <ArrowPill />
            </div>
          </a>
        ))}
        {visible.length === 0 ? <p className={styles.empty}>Nothing here yet.</p> : null}
      </div>
    </Section>
  );
}

export const InsightList: ComponentConfig<InsightListProps> = {
  label: "Insights list",
  fields: {
    showTabs: yesNo("Show category tabs"),
    allLabel: { type: "text", label: "'All' tab label" },
    categories: {
      type: "array",
      label: "Categories",
      arrayFields: { label: { type: "text", label: "Category" } },
      getItemSummary: (item) => item.label || "Category",
      defaultItemProps: { label: "News" },
    },
    limit: { type: "number", label: "Max items (0 = all)", min: 0 },
    items: {
      type: "array",
      label: "Articles",
      arrayFields: {
        title: { type: "text", label: "Title", contentEditable: true },
        href: { type: "text", label: "Link" },
        date: { type: "text", label: "Date", contentEditable: true },
        category: { type: "text", label: "Category" },
      },
      getItemSummary: (item) => textOf(item.title) || "Article",
      defaultItemProps: { title: "Article title", href: "", date: "", category: "News" },
    },
    spaceAbove: spaceField(),
  },
  defaultProps: {
    showTabs: true,
    allLabel: "All",
    categories: [{ label: "Research" }, { label: "News" }, { label: "Perspectives" }, { label: "Podcasts" }],
    limit: 0,
    items: [],
    spaceAbove: "lg",
  },
  render: (props) => <InsightListView {...props} />,
};
