import type { ComponentConfig } from "@puckeditor/core";
import { textOf, type InlineText } from "../fields";
import { Section, spaceField, type Space } from "./Section";
import styles from "./StatBar.module.css";

export type StatBarProps = {
  stats: { label: InlineText; value: InlineText; layout?: "stacked" | "inline" }[];
  spaceAbove: Space;
};

export const StatBar: ComponentConfig<StatBarProps> = {
  label: "Stats bar",
  fields: {
    stats: {
      type: "array",
      label: "Stats",
      arrayFields: {
        label: { type: "text", label: "Label", contentEditable: true },
        value: { type: "text", label: "Value", contentEditable: true },
        layout: {
          type: "radio",
          label: "Layout",
          options: [
            { label: "Stacked", value: "stacked" },
            { label: "Inline (long values)", value: "inline" },
          ],
        },
      },
      getItemSummary: (item) => textOf(item.label) || "Stat",
      defaultItemProps: { label: "Label", value: "Value", layout: "stacked" },
    },
    spaceAbove: spaceField(),
  },
  defaultProps: {
    stats: [
      { label: "Investment", value: "Seed" },
      { label: "Year", value: "2024" },
      { label: "Location", value: "Bay Area" },
      { label: "Founders", value: "", layout: "inline" },
    ],
    spaceAbove: "none",
  },
  render: ({ stats, spaceAbove }) => (
    <Section spaceAbove={spaceAbove}>
      <dl className={styles.bar}>
        {(stats || []).map((s, i) => {
          return (
            <div key={i} className={[styles.item, s.layout === "inline" ? styles.inline : ""].join(" ")}>
              <dt>{s.label}:</dt>
              <dd>{s.value}</dd>
            </div>
          );
        })}
      </dl>
    </Section>
  ),
};
