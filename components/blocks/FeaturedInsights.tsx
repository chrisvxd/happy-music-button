import type { ComponentConfig } from "@puckeditor/core";
import { ArrowPill } from "../ui/ArrowPill";
import { imageField, textOf, type InlineText } from "../fields";
import { Section, spaceField, type Space } from "./Section";
import styles from "./FeaturedInsights.module.css";

type Feature = { title: InlineText; href: string; image: string };

export type FeaturedInsightsProps = {
  heading: InlineText;
  headingTag: "h1" | "h2";
  items: Feature[];
  spaceAbove: Space;
};

export const FeaturedInsights: ComponentConfig<FeaturedInsightsProps> = {
  label: "Featured insights",
  fields: {
    heading: { type: "textarea", label: "Heading", contentEditable: true },
    headingTag: {
      type: "radio",
      label: "Heading level",
      options: [
        { label: "Page title (H1)", value: "h1" },
        { label: "Section (H2)", value: "h2" },
      ],
    },
    items: {
      type: "array",
      label: "Featured articles",
      max: 4,
      arrayFields: {
        title: { type: "text", label: "Title", contentEditable: true },
        href: { type: "text", label: "Link" },
        image: imageField("Image"),
      },
      getItemSummary: (item) => textOf(item.title) || "Article",
      defaultItemProps: { title: "Article title", href: "", image: "" },
    },
    spaceAbove: spaceField(),
  },
  defaultProps: {
    heading: "Diving deep to understand minds and machines",
    headingTag: "h2",
    items: [],
    spaceAbove: "lg",
  },
  render: ({ heading, headingTag, items, spaceAbove }) => {
    const Heading = headingTag;
    return (
      <Section spaceAbove={spaceAbove}>
        {heading ? (
          <Heading className={headingTag === "h1" ? "bs-h1" : "bs-h3"}>{heading}</Heading>
        ) : null}
        <div className={styles.grid}>
          {(items || []).map((item, i) => (
            <a key={i} href={item.href || "#"} className={styles.card}>
              <div className={styles.imageWrap}>
                {item.image ? <img src={item.image} alt="" loading="lazy" /> : null}
              </div>
              <div className={styles.label}>
                <ArrowPill />
                <span>{item.title}</span>
              </div>
            </a>
          ))}
        </div>
      </Section>
    );
  },
};
