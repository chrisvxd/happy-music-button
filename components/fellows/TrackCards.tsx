import type { ComponentConfig } from "@puckeditor/core";
import { LinkButton } from "../ui/LinkButton";
import { imageField, textOf, type InlineText } from "../fields";
import { Sparkle } from "./Sparkle";
import styles from "./TrackCards.module.css";

type Track = {
  title: InlineText;
  tone: "blue" | "yellow" | "violet";
  workWithLabel: InlineText;
  logos: { image: string; name: string }[];
  ctaLabel: InlineText;
  ctaHref: string;
};

export type TrackCardsProps = { heading: InlineText; tracks: Track[] };

const sparkleColor = { blue: "#441fff", yellow: "#ffb300", violet: "#9b2cff" };

export const TrackCards: ComponentConfig<TrackCardsProps> = {
  label: "Track cards",
  fields: {
    heading: { type: "text", label: "Heading", contentEditable: true },
    tracks: {
      type: "array",
      label: "Tracks",
      arrayFields: {
        title: { type: "text", label: "Title", contentEditable: true },
        tone: {
          type: "select",
          label: "Color",
          options: [
            { label: "Blue", value: "blue" },
            { label: "Yellow", value: "yellow" },
            { label: "Violet", value: "violet" },
          ],
        },
        workWithLabel: { type: "text", label: "Logos label", contentEditable: true },
        logos: {
          type: "array",
          label: "Partner logos",
          arrayFields: { name: { type: "text", label: "Name" }, image: imageField("Logo") },
          getItemSummary: (item) => item.name || "Logo",
          defaultItemProps: { name: "Company", image: "" },
        },
        ctaLabel: { type: "text", label: "Button label", contentEditable: true },
        ctaHref: { type: "text", label: "Button URL" },
      },
      getItemSummary: (item) => textOf(item.title) || "Track",
      defaultItemProps: {
        title: "Track",
        tone: "blue",
        workWithLabel: "Work with",
        logos: [],
        ctaLabel: "Apply here",
        ctaHref: "#",
      },
    },
  },
  defaultProps: { heading: "Choose from 3 tracks", tracks: [] },
  render: ({ heading, tracks }) => (
    <section className={styles.section}>
      {heading ? <h2 className={styles.heading}>{heading}</h2> : null}
      <div className={styles.row}>
        {(tracks || []).map((t, i) => (
          <div key={i} className={[styles.card, styles[t.tone]].join(" ")}>
            <div className={styles.inner}>
              <h3 className={styles.title}>{t.title}</h3>
              <Sparkle size={70} color={sparkleColor[t.tone] || sparkleColor.blue} />
              <div className={styles.workWith}>
                <span>{t.workWithLabel}</span>
                <div className={styles.logos}>
                  {(t.logos || []).map((l, j) =>
                    l.image ? <img key={j} src={l.image} alt={l.name} /> : null
                  )}
                </div>
              </div>
              <LinkButton label={t.ctaLabel} href={t.ctaHref} variant="outline-blue" />
            </div>
          </div>
        ))}
      </div>
    </section>
  ),
};
