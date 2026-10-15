import type { ComponentConfig } from "@puckeditor/core";
import { imageField, type InlineText } from "../fields";
import { Section, spaceField, type Space } from "./Section";

export type ImageBlockProps = {
  src: string;
  alt: string;
  width: "column" | "small";
  caption: InlineText;
  spaceAbove: Space;
};

export const ImageBlock: ComponentConfig<ImageBlockProps> = {
  label: "Image",
  fields: {
    src: imageField("Image"),
    alt: { type: "text", label: "Alt text" },
    width: {
      type: "radio",
      label: "Width",
      options: [
        { label: "Full column", value: "column" },
        { label: "Small (centered)", value: "small" },
      ],
    },
    caption: { type: "textarea", label: "Caption", contentEditable: true },
    spaceAbove: spaceField(),
  },
  defaultProps: { src: "", alt: "", width: "column", caption: "", spaceAbove: "sm" },
  render: ({ src, alt, width, caption, spaceAbove }) => (
    <Section spaceAbove={spaceAbove}>
      <figure style={{ margin: 0 }}>
        {src ? (
          <img
            src={src}
            alt={alt}
            style={{
              width: width === "small" ? "auto" : "100%",
              maxWidth: width === "small" ? 160 : "100%",
              height: "auto",
              margin: width === "small" ? "0 auto" : undefined,
            }}
          />
        ) : null}
        {caption ? (
          <figcaption
            className="bs-body"
            style={{ marginTop: 24, textAlign: width === "small" ? "center" : "left" }}
          >
            {caption}
          </figcaption>
        ) : null}
      </figure>
    </Section>
  ),
};
