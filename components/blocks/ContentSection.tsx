import type { ComponentConfig } from "@puckeditor/core";
import type { ReactNode } from "react";
import { LinkButton } from "../ui/LinkButton";
import { linkField, type InlineText, type LinkValue } from "../fields";
import { Section, spaceField, type Space } from "./Section";
import styles from "./ContentSection.module.css";

export type ContentSectionProps = {
  eyebrow: InlineText;
  heading: InlineText;
  headingSize: "xl" | "lg" | "md" | "sm";
  note: InlineText;
  notePosition: "heading" | "body";
  noteColor: "ink" | "pink" | "brown" | "white";
  body: ReactNode;
  cta: LinkValue;
  spaceAbove: Space;
};

const headingClass = {
  xl: "bs-h1",
  lg: "bs-h2",
  md: "bs-h3",
  sm: "bs-h4",
};

export const ContentSection: ComponentConfig<ContentSectionProps> = {
  label: "Content section",
  fields: {
    eyebrow: { type: "text", label: "Eyebrow", contentEditable: true },
    heading: { type: "textarea", label: "Heading", contentEditable: true },
    headingSize: {
      type: "select",
      label: "Heading size",
      options: [
        { label: "XL (64px)", value: "xl" },
        { label: "Large (48px)", value: "lg" },
        { label: "Medium (40px)", value: "md" },
        { label: "Small (32px)", value: "sm" },
      ],
    },
    note: { type: "textarea", label: "Handwritten side note", contentEditable: true },
    notePosition: {
      type: "radio",
      label: "Side note beside",
      options: [
        { label: "Heading", value: "heading" },
        { label: "Body", value: "body" },
      ],
    },
    noteColor: {
      type: "select",
      label: "Side note color",
      options: [
        { label: "Ink", value: "ink" },
        { label: "Plum", value: "pink" },
        { label: "Rust", value: "brown" },
        { label: "White", value: "white" },
      ],
    },
    body: { type: "richtext", label: "Body", contentEditable: true },
    cta: linkField("Button"),
    spaceAbove: spaceField(),
  },
  defaultProps: {
    eyebrow: "",
    heading: "Section heading",
    headingSize: "lg",
    note: "",
    notePosition: "heading",
    noteColor: "pink",
    body: "",
    cta: { label: "", href: "" },
    spaceAbove: "lg",
  },
  render: ({ eyebrow, heading, headingSize, note, notePosition, noteColor, body, cta, spaceAbove }) => {
    const noteEl = note ? (
      <p className={`bs-hand ${styles.note} ${styles[noteColor]}`}>{note}</p>
    ) : null;
    return (
      <Section spaceAbove={spaceAbove}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <div className={notePosition === "heading" && noteEl ? styles.row : undefined}>
          {heading ? <h2 className={headingClass[headingSize]}>{heading}</h2> : null}
          {notePosition === "heading" ? noteEl : null}
        </div>
        {body ? (
          <div className={notePosition === "body" && noteEl ? styles.row : styles.bodyWrap}>
            <div className={`bs-prose ${styles.body}`}>{body}</div>
            {notePosition === "body" ? noteEl : null}
          </div>
        ) : null}
        {cta?.label ? (
          <div className={styles.cta}>
            <LinkButton label={cta.label} href={cta.href} />
          </div>
        ) : null}
      </Section>
    );
  },
};
