import type { ComponentConfig } from "@puckeditor/core";

export type SpacerProps = { size: number };

export const Spacer: ComponentConfig<SpacerProps> = {
  label: "Spacer",
  fields: { size: { type: "number", label: "Height (px)", min: 0, max: 400 } },
  defaultProps: { size: 60 },
  render: ({ size }) => <div aria-hidden="true" style={{ height: size }} />,
};
