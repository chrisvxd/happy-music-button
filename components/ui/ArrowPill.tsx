import styles from "./ArrowPill.module.css";

/** The small pill-shaped arrow used next to links across the site. */
export function ArrowPill({
  direction = "right",
  className,
}: {
  direction?: "right" | "left";
  className?: string;
}) {
  return (
    <span
      className={[styles.pill, direction === "left" ? styles.left : "", className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden="true"
    >
      <span className={styles.track}>
        <Arrow />
        <Arrow />
      </span>
    </span>
  );
}

function Arrow() {
  return (
    <svg className={styles.arrow} viewBox="0 0 15 8" fill="none">
      <path
        d="M0 4h13M10 1l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
