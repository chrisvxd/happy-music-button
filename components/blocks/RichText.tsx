import type { ComponentConfig } from "@puckeditor/core";
import type { ReactNode } from "react";
import { Section, spaceField, type Space } from "./Section";

export type RichTextProps = {
  body: ReactNode;
  size: "regular" | "large";
  tone: "muted" | "ink";
  align: "left" | "center";
  spaceAbove: Space;
};

export const RichText: ComponentConfig<RichTextProps> = {
  label: "Rich text",
  fields: {
    body: { type: "richtext", label: "Text", contentEditable: true },
    size: {
      type: "radio",
      label: "Size",
      options: [
        { label: "Regular (16px)", value: "regular" },
        { label: "Large (18px)", value: "large" },
      ],
    },
    tone: {
      type: "radio",
      label: "Color",
      options: [
        { label: "Muted", value: "muted" },
        { label: "Ink", value: "ink" },
      ],
    },
    align: {
      type: "radio",
      label: "Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
      ],
    },
    spaceAbove: spaceField(),
  },
  defaultProps: {
    body: "<p>Write something here.</p>",
    size: "regular",
    tone: "muted",
    align: "left",
    spaceAbove: "sm",
  },
  render: ({ body, size, tone, align, spaceAbove }) => (
    <Section spaceAbove={spaceAbove}>
      <div
        className="bs-prose"
        style={{
          fontSize: size === "large" ? 18 : undefined,
          color: tone === "ink" ? "var(--bs-ink)" : undefined,
          textAlign: align,
        }}
      >
        {body}
      </div>
    </Section>
  ),
};
