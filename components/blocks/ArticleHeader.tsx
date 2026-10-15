import type { ComponentConfig } from "@puckeditor/core";
import { isExternal } from "../../lib/site";
import { imageField, type InlineText } from "../fields";
import { Section, spaceField, type Space } from "./Section";
import styles from "./ArticleHeader.module.css";

export type ArticleHeaderProps = {
  title: InlineText;
  image: string;
  date: InlineText;
  author: InlineText;
  authorHref: string;
  spaceAbove: Space;
};

export const ArticleHeader: ComponentConfig<ArticleHeaderProps> = {
  label: "Article header",
  fields: {
    title: { type: "textarea", label: "Title", contentEditable: true },
    image: imageField("Featured image"),
    date: { type: "text", label: "Date", contentEditable: true },
    author: { type: "text", label: "Author", contentEditable: true },
    authorHref: { type: "text", label: "Author link" },
    spaceAbove: spaceField(),
  },
  defaultProps: {
    title: "Article title",
    image: "",
    date: "",
    author: "",
    authorHref: "",
    spaceAbove: "xl",
  },
  render: ({ title, image, date, author, authorHref, spaceAbove }) => (
    <Section spaceAbove={spaceAbove}>
      <h1 className="bs-h2">{title}</h1>
      {image ? <img src={image} alt="" className={styles.image} /> : null}
      <div className={styles.meta}>
        {date ? <p>{date}</p> : null}
        {author ? (
          <p className={styles.byline}>
            By{" "}
            {authorHref ? (
              <a
                href={authorHref}
                {...(isExternal(authorHref) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {author}
              </a>
            ) : (
              <strong>{author}</strong>
            )}
          </p>
        ) : null}
      </div>
    </Section>
  ),
};
