// Site-wide navigation and footer content shared by every page.

export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Team", href: "/team" },
  { label: "Research", href: "/research" },
  { label: "Jobs", href: "https://jobs.basisset.com" },
];

export const fellowsNav: NavLink[] = mainNav.filter((l) => l.label !== "Jobs");

export const footerNav: NavLink[] = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Research", href: "/research" },
  { label: "Team", href: "/team" },
];

export type SocialNetwork =
  | "x"
  | "instagram"
  | "linkedin"
  | "youtube"
  | "medium"
  | "github"
  | "website";

export const socials: { network: SocialNetwork; href: string }[] = [
  { network: "x", href: "https://x.com/basisset?lang=en" },
  { network: "instagram", href: "https://www.instagram.com/basis_set/" },
  { network: "linkedin", href: "https://www.linkedin.com/company/basis-set/" },
  { network: "youtube", href: "https://www.youtube.com/channel/UC5xM2NJvoKLJbBDHK9sobIg" },
  { network: "medium", href: "https://bsv.medium.com/" },
];

export const legal = {
  faqLabel: "Read our FAQs",
  faqHref: "/basis-set-faq",
  copyright: "© 2025 Basis Set Builders. All rights reserved",
  trademark:
    "Basis Set Ventures®, BSV® and the Basis Set Logo are registered trademarks of Basis Set Builders, LLC",
};

export const logos = {
  black: "/assets/bsv-logo-black.png",
  white: "/assets/bsv-logo-white.png",
};

export const isExternal = (href?: string) => !!href && /^https?:\/\//.test(href);
