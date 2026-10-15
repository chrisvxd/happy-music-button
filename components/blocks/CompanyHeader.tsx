import type { ComponentConfig } from "@puckeditor/core";
import { imageField, textOf, type InlineText } from "../fields";
import { Section, spaceField, type Space } from "./Section";
import styles from "./CompanyHeader.module.css";

export type CompanyHeaderProps = {
  name: InlineText;
  logo: string;
  category: InlineText;
  spaceAbove: Space;
};

export const CompanyHeader: ComponentConfig<CompanyHeaderProps> = {
  label: "Company header",
  fields: {
    name: { type: "text", label: "Company name", contentEditable: true },
    logo: imageField("Wordmark logo"),
    category: { type: "text", label: "Category", contentEditable: true },
    spaceAbove: spaceField(),
  },
  defaultProps: { name: "Company", logo: "", category: "Autonomy", spaceAbove: "xl" },
  render: ({ name, logo, category, spaceAbove }) => (
    <Section spaceAbove={spaceAbove}>
      <div className={styles.wrap}>
        {/* The wordmark is the visual title; the name stays available to screen readers */}
        <h1 className={logo ? styles.srOnly : "bs-h2"}>{name}</h1>
        {logo ? <img src={logo} alt={textOf(name)} className={styles.logo} /> : null}
        {category ? <p className={styles.category}>{category}</p> : null}
      </div>
    </Section>
  ),
};
