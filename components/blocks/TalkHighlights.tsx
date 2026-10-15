"use client";

import { Fragment, useState } from "react";
import type { ComponentConfig } from "@puckeditor/core";
import { imageField, textOf, type InlineText } from "../fields";
import { Section, spaceField, type Space } from "./Section";
import styles from "./TalkHighlights.module.css";

type Speaker = {
  name: InlineText;
  title: InlineText;
  logo: string;
  photo: string;
  quote: InlineText;
  link: string;
};

type Talk = { title: InlineText; speakers: Speaker[] };

export type TalkHighlightsProps = { talks: Talk[]; spaceAbove: Space };

function TalkHighlightsView({ talks, spaceAbove }: TalkHighlightsProps) {
  const [active, setActive] = useState(0);
  const list = talks || [];
  const current = list[Math.min(active, list.length - 1)];

  return (
    <Section spaceAbove={spaceAbove}>
      <div className={styles.layout}>
        <div className={styles.tabs} role="tablist">
          {list.map((talk, i) => (
            <div
              key={i}
              role="tab"
              tabIndex={0}
              aria-selected={i === active}
              className={[styles.tab, i === active ? styles.active : ""].join(" ")}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActive(i);
                }
              }}
            >
              <span className={styles.talkTitle}>{talk.title}</span>
              <span className={styles.speakerNames}>
                {(talk.speakers || []).map((s, j) => (
                  <Fragment key={j}>
                    {j > 0 ? " · " : null}
                    {s.name}
                  </Fragment>
                ))}
              </span>
            </div>
          ))}
        </div>
        {current ? (
          <div className={styles.panel} key={active}>
            {(current.speakers || []).map((s, i) => (
              <div key={i} className={styles.speaker}>
                <div className={styles.speakerHead}>
                  <div className={styles.images}>
                    {s.logo ? <img src={s.logo} alt="" /> : null}
                    {s.photo ? <img src={s.photo} alt={textOf(s.name)} /> : null}
                  </div>
                  <div>
                    <p className={styles.name}>{s.name}</p>
                    <p className={styles.title}>{s.title}</p>
                  </div>
                </div>
                {s.quote ? <p className={styles.quote}>{s.quote}</p> : null}
                {s.link ? (
                  <a href={s.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    LinkedIn
                  </a>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}

export const TalkHighlights: ComponentConfig<TalkHighlightsProps> = {
  label: "Talk highlights",
  fields: {
    talks: {
      type: "array",
      label: "Talks",
      arrayFields: {
        title: { type: "text", label: "Talk title", contentEditable: true },
        speakers: {
          type: "array",
          label: "Speakers",
          arrayFields: {
            name: { type: "text", label: "Name", contentEditable: true },
            title: { type: "text", label: "Title", contentEditable: true },
            logo: imageField("Company logo"),
            photo: imageField("Photo"),
            quote: { type: "textarea", label: "Key quote", contentEditable: true },
            link: { type: "text", label: "Profile link" },
          },
          getItemSummary: (item) => textOf(item.name) || "Speaker",
          defaultItemProps: { name: "Speaker", title: "", logo: "", photo: "", quote: "", link: "" },
        },
      },
      getItemSummary: (item) => textOf(item.title) || "Talk",
      defaultItemProps: { title: "Talk title", speakers: [] },
    },
    spaceAbove: spaceField(),
  },
  defaultProps: { talks: [], spaceAbove: "sm" },
  render: (props) => <TalkHighlightsView {...props} />,
};
