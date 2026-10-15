import type { ComponentConfig } from "@puckeditor/core";
import { imageField } from "../fields";
import { Section, spaceField, type Space } from "./Section";
import styles from "./LogoGrid.module.css";

export type LogoGridProps = {
  columns: 3 | 4 | 5;
  logos: { image: string; name: string }[];
  spaceAbove: Space;
};

export const LogoGrid: ComponentConfig<LogoGridProps> = {
  label: "Logo grid",
  fields: {
    columns: {
      type: "radio",
      label: "Columns",
      options: [
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
      ],
    },
    logos: {
      type: "array",
      label: "Logos",
      arrayFields: {
        name: { type: "text", label: "Company name" },
        image: imageField("Logo"),
      },
      getItemSummary: (item) => item.name || "Logo",
      defaultItemProps: { name: "Company", image: "" },
    },
    spaceAbove: spaceField(),
  },
  defaultProps: { columns: 4, logos: [], spaceAbove: "sm" },
  render: ({ columns, logos, spaceAbove }) => (
    <Section spaceAbove={spaceAbove}>
      <div className={styles.grid} style={{ ["--cols" as string]: columns }}>
        {(logos || []).map((logo, i) => (
          <div key={i} className={styles.tile}>
            {logo.image ? <img src={logo.image} alt={logo.name} loading="lazy" /> : logo.name}
          </div>
        ))}
      </div>
    </Section>
  ),
};
