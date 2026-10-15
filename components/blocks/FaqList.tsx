import type { ComponentConfig } from "@puckeditor/core";
import type { ReactNode } from "react";
import { textOf, type InlineText } from "../fields";
import { Section, spaceField, type Space } from "./Section";
import styles from "./FaqList.module.css";

export type FaqListProps = {
  heading: InlineText;
  intro: InlineText;
  questionStyle: "bold" | "regular" | "heading";
  mutedAnswers: boolean;
  items: { question: InlineText; answer: ReactNode }[];
  spaceAbove: Space;
};

export const FaqList: ComponentConfig<FaqListProps> = {
  label: "FAQ / feature list",
  fields: {
    heading: { type: "textarea", label: "Heading", contentEditable: true },
    intro: { type: "textarea", label: "Intro", contentEditable: true },
    questionStyle: {
      type: "select",
      label: "Item title style",
      options: [
        { label: "Bold", value: "bold" },
        { label: "Regular", value: "regular" },
        { label: "Heading", value: "heading" },
      ],
    },
    mutedAnswers: {
      type: "radio",
      label: "Muted answers",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    items: {
      type: "array",
      label: "Items",
      arrayFields: {
        question: { type: "text", label: "Title / question", contentEditable: true },
        answer: { type: "richtext", label: "Text / answer", contentEditable: true },
      },
      getItemSummary: (item) => textOf(item.question) || "Item",
      defaultItemProps: { question: "Question?", answer: "<p>Answer.</p>" },
    },
    spaceAbove: spaceField(),
  },
  defaultProps: {
    heading: "FAQ",
    intro: "",
    questionStyle: "regular",
    mutedAnswers: true,
    items: [],
    spaceAbove: "md",
  },
  render: ({ heading, intro, questionStyle, mutedAnswers, items, spaceAbove }) => (
    <Section spaceAbove={spaceAbove}>
      {heading || intro ? (
        <div className={styles.header}>
          {heading ? <h2 className="bs-h2">{heading}</h2> : null}
          {intro ? <p className="bs-body">{intro}</p> : null}
        </div>
      ) : null}
      <div className={styles.list}>
        {(items || []).map((item, i) => (
          <div key={i} className={styles.item}>
            <h3 className={styles[questionStyle]}>{item.question}</h3>
            <div className={`bs-prose ${mutedAnswers ? "" : styles.ink}`}>{item.answer}</div>
          </div>
        ))}
      </div>
    </Section>
  ),
};
