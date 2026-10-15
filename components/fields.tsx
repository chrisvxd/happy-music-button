"use client";

import type { ReactNode } from "react";
import { FieldLabel, type Field } from "@puckeditor/core";

/** Image URL field with a thumbnail preview in the editor sidebar. */
export function imageField(label = "Image"): Field<string> {
  return {
    type: "custom",
    label,
    render: ({ name, value, onChange, readOnly }) => (
      <FieldLabel label={label} readOnly={readOnly}>
        <div style={{ display: "grid", gap: 8 }}>
          <input
            name={name}
            type="text"
            placeholder="/assets/image.png or https://…"
            defaultValue={value ?? ""}
            readOnly={readOnly}
            onChange={(e) => onChange(e.currentTarget.value)}
            style={{
              width: "100%",
              padding: "8px 12px",
              border: "1px solid var(--puck-color-grey-09, #ddd)",
              borderRadius: 4,
              font: "inherit",
              fontSize: 14,
              background: "var(--puck-color-white, #fff)",
            }}
          />
          {value ? (
            <img
              src={value}
              alt=""
              style={{
                maxHeight: 96,
                maxWidth: "100%",
                objectFit: "contain",
                alignSelf: "start",
                borderRadius: 4,
                background: "repeating-conic-gradient(#f3f3f3 0% 25%, #fff 0% 50%) 50% / 12px 12px",
              }}
            />
          ) : null}
        </div>
      </FieldLabel>
    ),
  };
}

/**
 * Text that may be edited inline. Inside <Puck>, contentEditable fields arrive as
 * React elements; in <Render> they're plain strings.
 */
export type InlineText = string | ReactNode;

export type LinkValue = { label: InlineText; href: string };

export const linkField = (label = "Link"): Field<LinkValue> => ({
  type: "object",
  label,
  objectFields: {
    label: { type: "text", label: "Label", contentEditable: true },
    href: { type: "text", label: "URL" },
  },
});

/**
 * Plain-string form of an inline-editable value, for attributes like alt.
 * Returns "" in the editor, where the value is a React element.
 */
export const textOf = (value: unknown) => (typeof value === "string" ? value : "");

export const yesNo = (label: string): Field<boolean> => ({
  type: "radio",
  label,
  options: [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ],
});
