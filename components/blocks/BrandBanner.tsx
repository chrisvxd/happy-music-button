import type { ComponentConfig } from "@puckeditor/core";
import { LinkButton } from "../ui/LinkButton";
import type { ReactNode } from "react";
import { imageField, linkField, type InlineText, type LinkValue } from "../fields";
import { spaceField, type Space } from "./Section";
import styles from "./BrandBanner.module.css";

export type BrandBannerProps = {
  note: InlineText;
  heading: InlineText;
  headingEmphasis: InlineText;
  body: ReactNode;
  cta: LinkValue;
  background: string;
  topDecoration: string;
  bottomDecoration: string;
  spaceAbove: Space;
};

const spacePx: Record<Space, string> = {
  none: "0",
  xs: "24px",
  sm: "40px",
  md: "80px",
  lg: "120px",
  xl: "140px",
};

export const BrandBanner: ComponentConfig<BrandBannerProps> = {
  label: "Brand banner",
  fields: {
    note: { type: "text", label: "Handwritten note", contentEditable: true },
    heading: { type: "textarea", label: "Heading", contentEditable: true },
    headingEmphasis: { type: "text", label: "Heading ending", contentEditable: true },
    body: { type: "richtext", label: "Body", contentEditable: true },
    cta: linkField("Button"),
    background: imageField("Background"),
    topDecoration: imageField("Top-left decoration"),
    bottomDecoration: imageField("Bottom-right decoration"),
    spaceAbove: spaceField(),
  },
  defaultProps: {
    note: "AI is transforming venture capital",
    heading: "We believe the best way to find and support AI companies is by",
    headingEmphasis: "being one ourselves.",
    body: "",
    cta: { label: "Meet the team", href: "/team" },
    background: "/assets/banner-bg.png",
    topDecoration: "/assets/banner-decoration.png",
    bottomDecoration: "/assets/banner-brain.png",
    spaceAbove: "lg",
  },
  render: ({
    note,
    heading,
    headingEmphasis,
    body,
    cta,
    background,
    topDecoration,
    bottomDecoration,
    spaceAbove,
  }) => (
    <section className={styles.outer} style={{ paddingTop: spacePx[spaceAbove] }}>
      <div
        className={styles.banner}
        style={{ backgroundImage: background ? `url("${background}")` : undefined }}
      >
        {topDecoration ? <img src={topDecoration} alt="" className={styles.decoTop} /> : null}
        {bottomDecoration ? (
          <img src={bottomDecoration} alt="" className={styles.decoBottom} />
        ) : null}
        <div className={styles.inner}>
          <div className={styles.copy}>
            {note ? <p className={`bs-hand ${styles.note}`}>{note}</p> : null}
            <h2 className={styles.heading}>
              {heading} {headingEmphasis ? <span>{headingEmphasis}</span> : null}
            </h2>
            {body ? <div className={`bs-lead ${styles.body}`}>{body}</div> : null}
            <LinkButton label={cta?.label} href={cta?.href} variant="outline-light" />
          </div>
        </div>
      </div>
    </section>
  ),
};
