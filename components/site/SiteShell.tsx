"use client";

import { useState, type ReactNode } from "react";
import type { InlineText } from "../fields";
import { ArrowPill } from "../ui/ArrowPill";
import { SocialIcon } from "../ui/SocialIcon";
import {
  fellowsNav,
  footerNav,
  isExternal,
  legal,
  logos,
  mainNav,
  socials,
  type NavLink,
} from "../../lib/site";
import { fontVariables } from "../../lib/fonts";
import styles from "./SiteShell.module.css";

export type SiteTheme = "standard" | "fellows";
export type FellowsPalette = "purple" | "commerce" | "healthcare" | "infrastructure";

export type SiteShellProps = {
  theme?: SiteTheme;
  palette?: FellowsPalette;
  announcement?: { show?: boolean; text?: InlineText; href?: string };
  editing?: boolean;
  children: ReactNode;
};

const linkProps = (href: string) =>
  isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

export function SiteShell({
  theme = "standard",
  palette = "purple",
  announcement,
  editing,
  children,
}: SiteShellProps) {
  const fellows = theme === "fellows";

  return (
    <div
      className={[fontVariables, styles.site, fellows ? styles.fellows : styles.standard]
        .filter(Boolean)
        .join(" ")}
      data-palette={fellows ? palette : undefined}
      // In the editor, links in the header and footer sit outside Puck's component
      // overlays, so stop them navigating the canvas (and inline edits stay clickable)
      onClickCapture={
        editing
          ? (e) => {
              if ((e.target as HTMLElement).closest("a[href]")) e.preventDefault();
            }
          : undefined
      }
    >
      <header className={[styles.header, editing ? styles.headerStatic : ""].join(" ")}>
        {announcement?.show && announcement.text ? (
          <div className={styles.announcement}>
            <a href={announcement.href || "#"} className={styles.announcementLink}>
              <span>{announcement.text}</span>
              <ArrowPill />
            </a>
          </div>
        ) : null}
        <Navbar links={fellows ? fellowsNav : mainNav} light={fellows} />
      </header>

      {fellows ? (
        <main className={styles.fellowsMain}>{children}</main>
      ) : (
        <div className={styles.frame}>
          <main className={styles.main}>{children}</main>
          <Footer />
        </div>
      )}

      {fellows ? <FellowsFooter /> : null}
    </div>
  );
}

function Navbar({ links, light }: { links: NavLink[]; light: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className={[styles.nav, light ? styles.navLight : ""].join(" ")}>
      <a href="/" className={styles.brand} aria-label="Basis Set home">
        <img src={light ? logos.white : logos.black} alt="Basis Set" />
      </a>

      <button
        type="button"
        className={styles.menuButton}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={[styles.menuLines, open ? styles.menuLinesOpen : ""].join(" ")}>
          <span />
          <span />
          <span />
        </span>
      </button>

      <div className={[styles.menu, open ? styles.menuOpen : ""].join(" ")}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.navLink}
            {...linkProps(link.href)}
            onClick={() => setOpen(false)}
          >
            <span className={styles.clip}>
              <span className={styles.navText}>{link.label}</span>
              <span className={[styles.navText, styles.navHand].join(" ")} aria-hidden="true">
                {link.label}
              </span>
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerUpper}>
        <div className={styles.footerBrand}>
          <a href="/" aria-label="Basis Set home">
            <img src={logos.black} alt="Basis Set" className={styles.footerLogo} />
          </a>
        </div>
        <div className={styles.socials}>
          {socials.map((s) => (
            <a key={s.network} href={s.href} target="_blank" rel="noopener noreferrer">
              <SocialIcon network={s.network} />
            </a>
          ))}
        </div>
      </div>
      <div className={styles.footerLower}>
        <div className={styles.footerLowerLeft}>
          <a href={legal.faqHref} className={styles.faqLink}>
            {legal.faqLabel}
          </a>
          <p>{legal.copyright}</p>
        </div>
        <p className={styles.trademark}>{legal.trademark}</p>
      </div>
    </footer>
  );
}

function FellowsFooter() {
  return (
    <footer className={styles.fellowsFooter}>
      <div className={styles.fellowsFooterInner}>
        <div className={styles.fellowsFooterTop}>
          <div className={styles.fellowsFooterBrand}>
            <a href="/" aria-label="Basis Set home">
              <img src={logos.white} alt="Basis Set" />
            </a>
            {footerNav.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
          <div className={styles.fellowsSocials}>
            {socials.map((s) => (
              <a key={s.network} href={s.href} target="_blank" rel="noopener noreferrer">
                <SocialIcon network={s.network} />
              </a>
            ))}
          </div>
        </div>
        <div className={styles.fellowsFooterBottom}>
          <p>{legal.copyright}</p>
          <p>{legal.trademark}</p>
        </div>
      </div>
    </footer>
  );
}
