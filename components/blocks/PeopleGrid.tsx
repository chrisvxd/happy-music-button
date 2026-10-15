import type { ComponentConfig } from "@puckeditor/core";
import { imageField, textOf, type InlineText } from "../fields";
import { Section, spaceField, type Space } from "./Section";
import styles from "./PeopleGrid.module.css";

export type PeopleGridProps = {
  accent: "green" | "orange" | "pink";
  people: { image: string; company: InlineText; title: InlineText }[];
  spaceAbove: Space;
};

export const PeopleGrid: ComponentConfig<PeopleGridProps> = {
  label: "Member grid",
  fields: {
    accent: {
      type: "radio",
      label: "Logo border",
      options: [
        { label: "Green", value: "green" },
        { label: "Orange", value: "orange" },
        { label: "Pink", value: "pink" },
      ],
    },
    people: {
      type: "array",
      label: "Members",
      arrayFields: {
        company: { type: "text", label: "Company", contentEditable: true },
        title: { type: "text", label: "Title", contentEditable: true },
        image: imageField("Company logo"),
      },
      getItemSummary: (item) => [textOf(item.company), textOf(item.title)].filter(Boolean).join(" · ") || "Member",
      defaultItemProps: { company: "Company", title: "Title", image: "" },
    },
    spaceAbove: spaceField(),
  },
  defaultProps: { accent: "green", people: [], spaceAbove: "sm" },
  render: ({ accent, people, spaceAbove }) => (
    <Section spaceAbove={spaceAbove}>
      <div className={[styles.grid, styles[accent]].join(" ")}>
        {(people || []).map((p, i) => (
          <div key={i} className={styles.person}>
            {p.image ? <img src={p.image} alt="" loading="lazy" className={styles.logo} /> : null}
            <div className={styles.text}>
              <span className={styles.company}>{p.company}</span>
              <span className={styles.title}>{p.title}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  ),
};
