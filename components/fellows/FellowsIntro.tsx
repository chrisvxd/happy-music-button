import type { ComponentConfig } from "@puckeditor/core";
import { LinkButton } from "../ui/LinkButton";
import type { ReactNode } from "react";
import { linkField, textOf, type InlineText, type LinkValue } from "../fields";
import { RiveCanvas } from "./RiveCanvas";
import { riveField, type RiveValue } from "./riveFields";
import { Sparkle } from "./Sparkle";
import styles from "./FellowsIntro.module.css";

export type FellowsIntroProps = {
  heading: InlineText;
  body: ReactNode;
  facts: { text: InlineText }[];
  cta: LinkValue;
  animation: RiveValue;
};

export const FellowsIntro: ComponentConfig<FellowsIntroProps> = {
  label: "Fellowship intro",
  fields: {
    heading: { type: "text", label: "Heading", contentEditable: true },
    body: { type: "richtext", label: "Body", contentEditable: true },
    facts: {
      type: "array",
      label: "Key facts",
      arrayFields: { text: { type: "text", label: "Fact", contentEditable: true } },
      getItemSummary: (item) => textOf(item.text) || "Fact",
      defaultItemProps: { text: "San Francisco" },
    },
    cta: linkField("Button"),
    animation: riveField("Illustration animation"),
  },
  defaultProps: {
    heading: "The fellowship",
    body: "",
    facts: [{ text: "San Francisco" }, { text: "12 weeks" }],
    cta: { label: "Apply here", href: "#" },
    animation: { src: "", artboard: "", stateMachine: "", fit: "cover" },
  },
  render: ({ heading, body, facts, cta, animation }) => (
    <section className={styles.section}>
      <div className={styles.copy}>
        <h2 className={styles.heading}>{heading}</h2>
        {body ? <div className={styles.body}>{body}</div> : null}
        <ul className={styles.facts}>
          {(facts || []).map((f, i) => (
            <li key={i}>
              <Sparkle />
              <span>{f.text}</span>
            </li>
          ))}
        </ul>
        <LinkButton label={cta?.label} href={cta?.href} variant="solid-blue" />
      </div>
      <div className={styles.art}>
        <RiveCanvas {...animation} className={styles.canvas} />
      </div>
    </section>
  ),
};
