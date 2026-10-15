import type { ReactNode } from "react";
import { isExternal } from "../../lib/site";
import { ArrowPill } from "./ArrowPill";
import styles from "./LinkButton.module.css";

export type LinkButtonVariant = "outline" | "outline-light" | "solid-blue" | "outline-blue";

export function LinkButton({
  href,
  label,
  prefix,
  variant = "outline",
  newTab,
  className,
}: {
  href?: string;
  label: ReactNode;
  /** Optional lighter text before the label, e.g. "Learn more about" */
  prefix?: ReactNode;
  variant?: LinkButtonVariant;
  newTab?: boolean;
  className?: string;
}) {
  if (!label) return null;
  const external = newTab ?? isExternal(href);
  return (
    <a
      href={href || "#"}
      className={[styles.button, styles[variant], className].filter(Boolean).join(" ")}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>
        {prefix ? <span>{prefix} </span> : null}
        {label}
      </span>
      <ArrowPill />
    </a>
  );
}
