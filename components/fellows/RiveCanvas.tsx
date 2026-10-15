"use client";

import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";

export type RiveFit = "cover" | "contain" | "fitHeight" | "fitWidth";

const fitMap: Record<RiveFit, Fit> = {
  cover: Fit.Cover,
  contain: Fit.Contain,
  fitHeight: Fit.FitHeight,
  fitWidth: Fit.FitWidth,
};

/** Plays a Rive animation file. Keyed by src so changing the file remounts the player. */
export function RiveCanvas(props: {
  src: string;
  artboard?: string;
  stateMachine?: string;
  fit?: RiveFit;
  alignment?: "center" | "topCenter";
  className?: string;
}) {
  if (!props.src) return null;
  return <RivePlayer key={`${props.src}|${props.artboard}|${props.stateMachine}`} {...props} />;
}

function RivePlayer({
  src,
  artboard,
  stateMachine,
  fit = "cover",
  alignment = "center",
  className,
}: {
  src: string;
  artboard?: string;
  stateMachine?: string;
  fit?: RiveFit;
  alignment?: "center" | "topCenter";
  className?: string;
}) {
  const { RiveComponent } = useRive({
    src,
    artboard: artboard || undefined,
    stateMachines: stateMachine || undefined,
    autoplay: true,
    layout: new Layout({
      fit: fitMap[fit],
      alignment: alignment === "topCenter" ? Alignment.TopCenter : Alignment.Center,
    }),
  });
  return <RiveComponent className={className} aria-hidden="true" />;
}
