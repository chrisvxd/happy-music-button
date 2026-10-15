"use client";

import { useState } from "react";
import type { ComponentConfig } from "@puckeditor/core";
import { imageField, type InlineText } from "../fields";
import { Section, spaceField, type Space } from "./Section";
import styles from "./Testimonials.module.css";

type Testimonial = { label: string; image: string; quote: InlineText; attribution: InlineText };

export type TestimonialsProps = {
  variant: "avatars" | "labels";
  items: Testimonial[];
  spaceAbove: Space;
};

function TestimonialsView({ variant, items, spaceAbove }: TestimonialsProps) {
  const [active, setActive] = useState(0);
  const list = items || [];
  const current = list[Math.min(active, list.length - 1)];
  const avatars = variant === "avatars";

  return (
    <Section spaceAbove={spaceAbove}>
      <div
        className={[styles.tabs, avatars ? styles.avatarTabs : styles.labelTabs].join(" ")}
        role="tablist"
        style={{ ["--count" as string]: Math.max(list.length, 1) }}
      >
        {list.map((item, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-label={item.label}
            className={[styles.tab, i === active ? styles.active : ""].join(" ")}
            onClick={() => setActive(i)}
          >
            {avatars && item.image ? <img src={item.image} alt="" /> : <span>{item.label}</span>}
          </button>
        ))}
      </div>
      {current ? (
        <figure className={[styles.quote, avatars ? "" : styles.italic].join(" ")} key={active}>
          <blockquote>{current.quote}</blockquote>
          <figcaption className={avatars ? "bs-hand" : styles.plainCaption}>
            {avatars ? null : "- "}
            {current.attribution}
          </figcaption>
        </figure>
      ) : null}
    </Section>
  );
}

export const Testimonials: ComponentConfig<TestimonialsProps> = {
  label: "Testimonials",
  fields: {
    variant: {
      type: "radio",
      label: "Tab style",
      options: [
        { label: "Founder photos", value: "avatars" },
        { label: "Text labels", value: "labels" },
      ],
    },
    items: {
      type: "array",
      label: "Testimonials",
      arrayFields: {
        label: { type: "text", label: "Tab label" },
        image: imageField("Photo"),
        quote: { type: "textarea", label: "Quote", contentEditable: true },
        attribution: { type: "text", label: "Attribution", contentEditable: true },
      },
      getItemSummary: (item) => item.label || "Testimonial",
      defaultItemProps: { label: "Company", image: "", quote: "Quote", attribution: "Name, Title" },
    },
    spaceAbove: spaceField(),
  },
  defaultProps: { variant: "avatars", items: [], spaceAbove: "lg" },
  render: (props) => <TestimonialsView {...props} />,
};
