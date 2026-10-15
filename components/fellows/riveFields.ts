import type { Field } from "@puckeditor/core";
import type { RiveFit } from "./RiveCanvas";

export type RiveValue = {
  src: string;
  artboard: string;
  stateMachine: string;
  fit: RiveFit;
};

export const riveField = (label: string): Field<RiveValue> => ({
  type: "object",
  label,
  objectFields: {
    src: { type: "text", label: "Rive file (.riv)" },
    artboard: { type: "text", label: "Artboard" },
    stateMachine: { type: "text", label: "State machine" },
    fit: {
      type: "select",
      label: "Fit",
      options: [
        { label: "Cover", value: "cover" },
        { label: "Contain", value: "contain" },
        { label: "Fit height", value: "fitHeight" },
        { label: "Fit width", value: "fitWidth" },
      ],
    },
  },
});
