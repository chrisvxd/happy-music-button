import type { ComponentConfig } from "@puckeditor/core";
import { LinkButton } from "../ui/LinkButton";
import { imageField, linkField, type InlineText, type LinkValue } from "../fields";
import { Section, spaceField, type Space } from "./Section";
import styles from "./PageHero.module.css";

export type PageHeroProps = {
  eyebrow: InlineText;
  heading: InlineText;
  headingAccent: InlineText;
  handwritten: InlineText;
  lead: InlineText;
  cta: LinkValue;
  image: string;
  imageFrame: "none" | "corners";
  size: "xl" | "lg";
  spaceAbove: Space;
};

export const PageHero: ComponentConfig<PageHeroProps> = {
  label: "Page hero",
  fields: {
    eyebrow: { type: "text", label: "Eyebrow", contentEditable: true },
    heading: { type: "textarea", label: "Heading", contentEditable: true },
    headingAccent: { type: "text", label: "Heading accent (serif italic)", contentEditable: true },
    handwritten: { type: "textarea", label: "Handwritten subheading", contentEditable: true },
    lead: { type: "textarea", label: "Lead text", contentEditable: true },
    cta: linkField("Button"),
    image: imageField("Header artwork"),
    imageFrame: {
      type: "radio",
      label: "Artwork frame",
      options: [
        { label: "Corner marks", value: "corners" },
        { label: "None", value: "none" },
      ],
    },
    size: {
      type: "radio",
      label: "Heading size",
      options: [
        { label: "Extra large", value: "xl" },
        { label: "Large", value: "lg" },
      ],
    },
    spaceAbove: spaceField(),
  },
  defaultProps: {
    eyebrow: "",
    heading: "Page heading",
    headingAccent: "",
    handwritten: "",
    lead: "",
    cta: { label: "", href: "" },
    image: "",
    imageFrame: "corners",
    size: "xl",
    spaceAbove: "xl",
  },
  render: ({
    eyebrow,
    heading,
    headingAccent,
    handwritten,
    lead,
    cta,
    image,
    imageFrame,
    size,
    spaceAbove,
  }) => (
    <Section spaceAbove={spaceAbove}>
      {image ? (
        <div className={[styles.art, imageFrame === "corners" ? styles.corners : ""].join(" ")}>
          <img src={image} alt="" />
          {imageFrame === "corners" ? (
            <>
              <span className={styles.cornerBl} />
              <span className={styles.cornerBr} />
            </>
          ) : null}
        </div>
      ) : null}
      <div className={styles.text}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h1 className={size === "xl" ? "bs-h1" : `bs-h2 ${styles.large}`}>
          {heading}
          {headingAccent ? (
            <>
              {" "}
              <span className="bs-serif-accent">{headingAccent}</span>
            </>
          ) : null}
        </h1>
        {lead ? <p className={`bs-lead ${styles.lead}`}>{lead}</p> : null}
        {handwritten ? <p className={`bs-hand ${styles.hand}`}>{handwritten}</p> : null}
        {cta?.label ? (
          <div className={styles.cta}>
            <LinkButton label={cta.label} href={cta.href} />
          </div>
        ) : null}
      </div>
    </Section>
  ),
};
