import type { ComponentConfig } from "@puckeditor/core";
import { LinkButton } from "../ui/LinkButton";
import { imageField, linkField, type InlineText, type LinkValue } from "../fields";
import { RiveCanvas } from "./RiveCanvas";
import { riveField, type RiveValue } from "./riveFields";
import styles from "./FellowsHero.module.css";

export type FellowsHeroProps = {
  title: InlineText;
  subtitle: InlineText;
  cta: LinkValue;
  animation: RiveValue;
  mobileAnimation: RiveValue;
  logosLabel: InlineText;
  scrollLogos: boolean;
  logos: { image: string; name: string }[];
};

export const FellowsHero: ComponentConfig<FellowsHeroProps> = {
  label: "Fellows hero",
  fields: {
    title: { type: "text", label: "Title", contentEditable: true },
    subtitle: { type: "text", label: "Subtitle", contentEditable: true },
    cta: linkField("Button"),
    animation: riveField("Background animation (desktop)"),
    mobileAnimation: riveField("Background animation (mobile)"),
    logosLabel: { type: "text", label: "Logos label", contentEditable: true },
    scrollLogos: {
      type: "radio",
      label: "Scrolling logo strip",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    logos: {
      type: "array",
      label: "Logos",
      arrayFields: { name: { type: "text", label: "Name" }, image: imageField("Logo") },
      getItemSummary: (item) => item.name || "Logo",
      defaultItemProps: { name: "Company", image: "" },
    },
  },
  defaultProps: {
    title: "AI Fellows",
    subtitle: "Solve hard problems. Build with AI.",
    cta: { label: "Apply here", href: "#" },
    animation: { src: "", artboard: "", stateMachine: "", fit: "cover" },
    mobileAnimation: { src: "", artboard: "", stateMachine: "", fit: "cover" },
    logosLabel: "Enter a network that includes",
    scrollLogos: true,
    logos: [],
  },
  render: ({ title, subtitle, cta, animation, mobileAnimation, logosLabel, scrollLogos, logos }) => {
    const list = logos || [];
    return (
      <section className={styles.hero}>
        <div className={styles.art}>
          <RiveCanvas {...animation} className={styles.desktopArt} />
          <RiveCanvas
            {...(mobileAnimation?.src ? mobileAnimation : animation)}
            alignment="topCenter"
            className={styles.mobileArt}
          />
        </div>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
          <LinkButton label={cta?.label} href={cta?.href} variant="solid-blue" />
        </div>
        {list.length ? (
          <div className={styles.logos}>
            {logosLabel ? <p className={styles.logosLabel}>{logosLabel}</p> : null}
            <div className={scrollLogos ? styles.marquee : styles.static}>
              {(scrollLogos ? [0, 1] : [0]).map((copy) => (
                <div className={styles.logoRow} key={copy} aria-hidden={copy > 0 || undefined}>
                  {list.map((logo, i) =>
                    logo.image ? <img key={i} src={logo.image} alt={copy ? "" : logo.name} /> : null
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    );
  },
};
