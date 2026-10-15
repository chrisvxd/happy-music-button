import type { ComponentConfig } from "@puckeditor/core";
import { LinkButton, type LinkButtonVariant } from "../ui/LinkButton";
import type { InlineText } from "../fields";
import { Section, spaceField, type Space } from "./Section";

export type ButtonLinkProps = {
  prefix: InlineText;
  label: InlineText;
  href: string;
  variant: LinkButtonVariant;
  align: "left" | "center";
  spaceAbove: Space;
};

export const ButtonLink: ComponentConfig<ButtonLinkProps> = {
  label: "Button",
  fields: {
    prefix: { type: "text", label: "Prefix text (optional)", contentEditable: true },
    label: { type: "text", label: "Label", contentEditable: true },
    href: { type: "text", label: "URL" },
    variant: {
      type: "select",
      label: "Style",
      options: [
        { label: "Outline (dark)", value: "outline" },
        { label: "Outline (light)", value: "outline-light" },
        { label: "Solid blue", value: "solid-blue" },
        { label: "Outline blue", value: "outline-blue" },
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
    prefix: "",
    label: "Learn more",
    href: "#",
    variant: "outline",
    align: "left",
    spaceAbove: "sm",
  },
  render: ({ prefix, label, href, variant, align, spaceAbove }) => (
    <Section spaceAbove={spaceAbove}>
      <div style={{ display: "flex", justifyContent: align === "center" ? "center" : "flex-start" }}>
        <LinkButton prefix={prefix} label={label} href={href} variant={variant} />
      </div>
    </Section>
  ),
};
