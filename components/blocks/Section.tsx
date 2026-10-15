import type { CSSProperties, ReactNode } from "react";
import type { Field } from "@puckeditor/core";

export type Space = "none" | "xs" | "sm" | "md" | "lg" | "xl";

const spaceToPx: Record<Space, number> = {
  none: 0,
  xs: 24,
  sm: 40,
  md: 80,
  lg: 120,
  xl: 140,
};

export const spaceField = (label = "Space above"): Field<Space> => ({
  type: "select",
  label,
  options: [
    { label: "None", value: "none" },
    { label: "XS (24px)", value: "xs" },
    { label: "S (40px)", value: "sm" },
    { label: "M (80px)", value: "md" },
    { label: "L (120px)", value: "lg" },
    { label: "XL (140px)", value: "xl" },
  ],
});

/** Centers content in the site's 698px reading column and applies vertical rhythm. */
export function Section({
  spaceAbove = "md",
  width = "column",
  className,
  style,
  children,
}: {
  spaceAbove?: Space;
  width?: "column" | "wide" | "full";
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const maxWidth =
    width === "column" ? "var(--bs-container)" : width === "wide" ? "1260px" : "none";
  return (
    <section
      className={className}
      style={{
        position: "relative",
        maxWidth,
        marginLeft: "auto",
        marginRight: "auto",
        paddingTop: `clamp(${Math.round(spaceToPx[spaceAbove] * 0.5)}px, 9vw, ${spaceToPx[spaceAbove]}px)`,
        paddingLeft: width === "column" ? "var(--bs-section-gutter)" : undefined,
        paddingRight: width === "column" ? "var(--bs-section-gutter)" : undefined,
        boxSizing: width === "column" ? "content-box" : "border-box",
        ...style,
      }}
    >
      {children}
    </section>
  );
}
