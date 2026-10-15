import type { SocialNetwork } from "../../lib/site";

const labels: Record<SocialNetwork, string> = {
  x: "X (Twitter)",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  medium: "Medium",
  github: "GitHub",
  website: "Website",
};

/** Square social glyphs drawn in currentColor, matching the site's footer icons. */
export function SocialIcon({ network, size = 18 }: { network: SocialNetwork; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" role="img" aria-label={labels[network]}>
      <rect width="18" height="18" rx="2" fill="currentColor" />
      <g fill="var(--bs-icon-glyph, #fcfcfa)">{glyph(network)}</g>
    </svg>
  );
}

function glyph(network: SocialNetwork) {
  switch (network) {
    case "x":
      return (
        <path d="M12.16 3.95h1.69l-3.69 4.21 4.34 5.73h-3.4L8.45 10.42l-3.04 3.48H3.72l3.94-4.51L3.5 3.95h3.48l2.4 3.18 2.78-3.18Zm-.59 8.94h.94L6.47 4.91h-1l6.1 7.98Z" />
      );
    case "instagram":
      return (
        <>
          <path
            d="M6.3 3.6h5.4a2.7 2.7 0 0 1 2.7 2.7v5.4a2.7 2.7 0 0 1-2.7 2.7H6.3a2.7 2.7 0 0 1-2.7-2.7V6.3a2.7 2.7 0 0 1 2.7-2.7Zm0 1.2A1.5 1.5 0 0 0 4.8 6.3v5.4a1.5 1.5 0 0 0 1.5 1.5h5.4a1.5 1.5 0 0 0 1.5-1.5V6.3a1.5 1.5 0 0 0-1.5-1.5H6.3Z"
          />
          <path d="M9 6.3a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4Zm0 1.2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
          <circle cx="12.1" cy="5.9" r=".65" />
        </>
      );
    case "linkedin":
      return (
        <path d="M4.2 7.1h2v6.6h-2V7.1Zm1-3.2a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Zm2.3 3.2h1.9v.9h.03c.27-.5.92-1.04 1.9-1.04 2.03 0 2.4 1.33 2.4 3.07v3.67h-2v-3.25c0-.78-.01-1.78-1.08-1.78-1.09 0-1.25.85-1.25 1.72v3.31H7.5V7.1Z" />
      );
    case "youtube":
      return <path d="M14.1 6.3c-.13-.6-.6-1.07-1.2-1.2C11.84 4.8 9 4.8 9 4.8s-2.84 0-3.9.3c-.6.13-1.07.6-1.2 1.2C3.6 7.36 3.6 9 3.6 9s0 1.64.3 2.7c.13.6.6 1.07 1.2 1.2 1.06.3 3.9.3 3.9.3s2.84 0 3.9-.3c.6-.13 1.07-.6 1.2-1.2.3-1.06.3-2.7.3-2.7s0-1.64-.3-2.7ZM7.8 10.8V7.2L10.92 9 7.8 10.8Z" />;
    case "medium":
      return (
        <>
          <ellipse cx="6.3" cy="9" rx="2.7" ry="2.75" />
          <ellipse cx="11.2" cy="9" rx="1.35" ry="2.6" />
          <ellipse cx="13.6" cy="9" rx=".5" ry="2.35" />
        </>
      );
    case "github":
      return (
        <path d="M9 3.6a5.4 5.4 0 0 0-1.7 10.52c.27.05.37-.12.37-.26v-.94c-1.5.33-1.82-.72-1.82-.72-.25-.63-.6-.8-.6-.8-.49-.33.04-.32.04-.32.54.04.82.55.82.55.48.83 1.26.59 1.57.45.05-.35.19-.59.34-.72-1.2-.14-2.46-.6-2.46-2.67 0-.59.21-1.07.55-1.45-.05-.14-.24-.69.05-1.43 0 0 .45-.15 1.49.55a5.1 5.1 0 0 1 2.7 0c1.03-.7 1.48-.55 1.48-.55.3.74.11 1.29.06 1.43.34.38.55.86.55 1.45 0 2.08-1.27 2.53-2.47 2.67.2.17.37.5.37 1v1.48c0 .14.1.31.37.26A5.4 5.4 0 0 0 9 3.6Z" />
      );
    default:
      return <circle cx="9" cy="9" r="3.6" />;
  }
}
