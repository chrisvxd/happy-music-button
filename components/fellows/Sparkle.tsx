/** Four-point star used as a bullet and accent on the AI Fellows pages. */
export function Sparkle({ size = 30, color = "var(--bs-brand-blue)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden="true" style={{ flex: "none" }}>
      <path
        d="M15 0c.9 7.6 6.4 13.4 15 15-8.6 1.6-14.1 7.4-15 15-.9-7.6-6.4-13.4-15-15 8.6-1.6 14.1-7.4 15-15Z"
        fill={color}
      />
    </svg>
  );
}
