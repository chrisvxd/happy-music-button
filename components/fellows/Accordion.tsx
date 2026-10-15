"use client";

import { useState, type ReactNode } from "react";
import { textOf, type InlineText } from "../fields";
import type { ComponentConfig } from "@puckeditor/core";
import { Sparkle } from "./Sparkle";
import styles from "./Accordion.module.css";

export type AccordionProps = {
  items: { title: InlineText; body: ReactNode }[];
};

function AccordionView({ items }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className={styles.section}>
      {(items || []).map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={[styles.item, isOpen ? styles.open : ""].join(" ")}>
            {/* A div rather than <button> so the title can be edited inline */}
            <div
              role="button"
              tabIndex={0}
              className={styles.toggle}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setOpen(isOpen ? null : i);
                }
              }}
            >
              <Sparkle />
              <span className={styles.title}>{item.title}</span>
              <svg className={styles.chevron} viewBox="0 0 12 8" aria-hidden="true">
                <path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            {isOpen ? <div className={`bs-prose ${styles.body}`}>{item.body}</div> : null}
          </div>
        );
      })}
    </section>
  );
}

export const Accordion: ComponentConfig<AccordionProps> = {
  label: "Accordion",
  fields: {
    items: {
      type: "array",
      label: "Items",
      arrayFields: {
        title: { type: "text", label: "Title", contentEditable: true },
        body: { type: "richtext", label: "Content", contentEditable: true },
      },
      getItemSummary: (item) => textOf(item.title) || "Item",
      defaultItemProps: { title: "Title", body: "<p>Content</p>" },
    },
  },
  defaultProps: { items: [] },
  render: (props) => <AccordionView {...props} />,
};
