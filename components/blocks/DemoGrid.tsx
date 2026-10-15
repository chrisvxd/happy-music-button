import type { ComponentConfig } from "@puckeditor/core";
import { ArrowPill } from "../ui/ArrowPill";
import { imageField, textOf, type InlineText } from "../fields";
import { Section, spaceField, type Space } from "./Section";
import styles from "./DemoGrid.module.css";

type Founder = { name: InlineText; href: string };

type Demo = {
  title: InlineText;
  founders: Founder[];
  description: InlineText;
  company: InlineText;
  companyIcon: string;
  companyTagline: InlineText;
  companyCategory: InlineText;
  companyHref: string;
};

export type DemoGridProps = { demos: Demo[]; spaceAbove: Space };

export const DemoGrid: ComponentConfig<DemoGridProps> = {
  label: "Demo stations",
  fields: {
    demos: {
      type: "array",
      label: "Demos",
      arrayFields: {
        title: { type: "text", label: "Demo title", contentEditable: true },
        founders: {
          type: "array",
          label: "Founders",
          arrayFields: {
            name: { type: "text", label: "Name", contentEditable: true },
            href: { type: "text", label: "Profile link" },
          },
          getItemSummary: (item) => textOf(item.name) || "Founder",
          defaultItemProps: { name: "Founder", href: "" },
        },
        description: { type: "textarea", label: "Instructions", contentEditable: true },
        company: { type: "text", label: "Company", contentEditable: true },
        companyIcon: imageField("Company icon"),
        companyTagline: { type: "textarea", label: "Company tagline", contentEditable: true },
        companyCategory: { type: "text", label: "Company category", contentEditable: true },
        companyHref: { type: "text", label: "Company link" },
      },
      getItemSummary: (item) => textOf(item.title) || "Demo",
      defaultItemProps: {
        title: "Demo",
        founders: [],
        description: "",
        company: "",
        companyIcon: "",
        companyTagline: "",
        companyCategory: "",
        companyHref: "",
      },
    },
    spaceAbove: spaceField(),
  },
  defaultProps: { demos: [], spaceAbove: "sm" },
  render: ({ demos, spaceAbove }) => (
    <Section spaceAbove={spaceAbove}>
      <div className={styles.grid}>
        {(demos || []).map((demo, i) => (
          <div key={i} className={styles.demo}>
            <h3 className={styles.title}>{demo.title}</h3>
            {demo.founders?.length ? (
              <p className={styles.founders}>
                Founders:{" "}
                {demo.founders.map((f, j) => (
                  <span key={j}>
                    {j > 0 ? " & " : ""}
                    {f.href ? (
                      <a href={f.href} target="_blank" rel="noopener noreferrer">
                        {f.name}
                      </a>
                    ) : (
                      f.name
                    )}
                  </span>
                ))}
              </p>
            ) : null}
            {demo.description ? <p className={styles.description}>{demo.description}</p> : null}
            {demo.company ? (
              <a href={demo.companyHref || "#"} className={styles.company}>
                <div className={styles.companyName}>
                  {demo.companyIcon ? <img src={demo.companyIcon} alt="" /> : null}
                  <span>{demo.company}</span>
                  <ArrowPill />
                </div>
                <p className={styles.tagline}>{demo.companyTagline}</p>
                <p className={styles.category}>{demo.companyCategory}</p>
              </a>
            ) : null}
          </div>
        ))}
      </div>
    </Section>
  ),
};
