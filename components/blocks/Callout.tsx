import type { ComponentConfig } from "@puckeditor/core";
import type { ReactNode } from "react";
import { LinkButton } from "../ui/LinkButton";
import { imageField, linkField, type InlineText, type LinkValue } from "../fields";
import { Section, spaceField, type Space } from "./Section";
import styles from "./Callout.module.css";

export type CalloutProps = {
  title: InlineText;
  titleStyle: "sans" | "serif";
  body: ReactNode;
  cta: LinkValue;
  accent: string;
  tone: "lavender" | "grey";
  spaceAbove: Space;
};

export const Callout: ComponentConfig<CalloutProps> = {
  label: "Callout card",
  fields: {
    title: { type: "text", label: "Title", contentEditable: true },
    titleStyle: {
      type: "radio",
      label: "Title style",
      options: [
        { label: "Sans", value: "sans" },
        { label: "Serif italic", value: "serif" },
      ],
    },
    body: { type: "richtext", label: "Body", contentEditable: true },
    cta: linkField("Button"),
    accent: imageField("Accent artwork"),
    tone: {
      type: "radio",
      label: "Background",
      options: [
        { label: "Lavender", value: "lavender" },
        { label: "Grey", value: "grey" },
      ],
    },
    spaceAbove: spaceField(),
  },
  defaultProps: {
    title: "Callout title",
    titleStyle: "sans",
    body: "<p>Short supporting copy.</p>",
    cta: { label: "", href: "" },
    accent: "",
    tone: "lavender",
    spaceAbove: "md",
  },
  render: ({ title, titleStyle, body, cta, accent, tone, spaceAbove }) => (
    <Section spaceAbove={spaceAbove}>
      <div className={[styles.card, styles[tone], accent ? styles.withAccent : ""].join(" ")}>
        <div className={styles.content}>
          {title ? (
            <h2 className={titleStyle === "serif" ? styles.serifTitle : styles.title}>{title}</h2>
          ) : null}
          {body ? <div className={`bs-prose ${styles.body}`}>{body}</div> : null}
          {cta?.label ? (
            <div className={styles.cta}>
              <LinkButton label={cta.label} href={cta.href} />
            </div>
          ) : null}
        </div>
        {accent ? (
          <div className={styles.accentWrap}>
            <img src={accent} alt="" className={styles.accent} />
          </div>
        ) : null}
      </div>
    </Section>
  ),
};
