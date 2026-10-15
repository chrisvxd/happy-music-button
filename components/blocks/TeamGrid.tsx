"use client";

import { useMemo, useState } from "react";
import type { ComponentConfig } from "@puckeditor/core";
import { ArrowPill } from "../ui/ArrowPill";
import { imageField, textOf, yesNo, type InlineText } from "../fields";
import { Section, spaceField, type Space } from "./Section";
import { FilterTabs } from "./FilterTabs";
import styles from "./TeamGrid.module.css";

type Member = { name: InlineText; role: InlineText; portrait: string; href: string; groups: string };

export type TeamGridProps = {
  heading: InlineText;
  showFilters: boolean;
  allLabel: string;
  filters: { label: string }[];
  showArrows: boolean;
  members: Member[];
  spaceAbove: Space;
};

const groupsOf = (m: Member) =>
  (m.groups || "")
    .split(",")
    .map((g) => g.trim())
    .filter(Boolean);

function TeamGridView({ heading, showFilters, allLabel, filters, showArrows, members, spaceAbove }: TeamGridProps) {
  const tabs = useMemo(
    () => [allLabel || "All", ...(filters || []).map((f) => f.label).filter(Boolean)],
    [allLabel, filters]
  );
  const [active, setActive] = useState(tabs[0]);
  const visible =
    !showFilters || active === tabs[0]
      ? members || []
      : (members || []).filter((m) => groupsOf(m).includes(active));

  return (
    <Section spaceAbove={spaceAbove}>
      {heading ? <h2 className={`bs-h3 ${styles.heading}`}>{heading}</h2> : null}
      {showFilters ? <FilterTabs tabs={tabs} active={active} onChange={setActive} /> : null}
      <div className={[styles.grid, showArrows ? styles.compact : ""].join(" ")}>
        {visible.map((m, i) => {
          const Tag = m.href ? "a" : "div";
          return (
            <Tag key={i} className={styles.item} {...(m.href ? { href: m.href } : {})}>
              {m.portrait ? (
                <div className={styles.imageWrap}>
                  <img src={m.portrait} alt={textOf(m.name)} loading="lazy" />
                </div>
              ) : null}
              <div className={styles.content}>
                <div className={styles.title}>
                  <span className={styles.name}>{m.name}</span>
                  {showArrows ? <ArrowPill /> : null}
                </div>
                <span className={styles.role}>{m.role}</span>
              </div>
            </Tag>
          );
        })}
      </div>
    </Section>
  );
}

export const TeamGrid: ComponentConfig<TeamGridProps> = {
  label: "Team grid",
  fields: {
    heading: { type: "textarea", label: "Heading", contentEditable: true },
    showFilters: yesNo("Show group filters"),
    allLabel: { type: "text", label: "'All' filter label" },
    filters: {
      type: "array",
      label: "Groups",
      arrayFields: { label: { type: "text", label: "Group" } },
      getItemSummary: (item) => item.label || "Group",
      defaultItemProps: { label: "New group" },
    },
    showArrows: yesNo("Show link arrows"),
    members: {
      type: "array",
      label: "Team members",
      arrayFields: {
        name: { type: "text", label: "Name", contentEditable: true },
        role: { type: "text", label: "Role", contentEditable: true },
        portrait: imageField("Portrait"),
        href: { type: "text", label: "Profile link" },
        groups: { type: "text", label: "Groups (comma separated)" },
      },
      getItemSummary: (item) => textOf(item.name) || "Team member",
      defaultItemProps: { name: "New member", role: "Partner", portrait: "", href: "", groups: "" },
    },
    spaceAbove: spaceField(),
  },
  defaultProps: {
    heading: "",
    showFilters: false,
    allLabel: "All Team Members",
    filters: [],
    showArrows: false,
    members: [],
    spaceAbove: "lg",
  },
  render: (props) => <TeamGridView {...props} />,
};
