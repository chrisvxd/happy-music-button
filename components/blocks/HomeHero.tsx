import type { ComponentConfig } from "@puckeditor/core";
import { LinkButton } from "../ui/LinkButton";
import { imageField, linkField, type InlineText, type LinkValue } from "../fields";
import styles from "./HomeHero.module.css";

export type HomeHeroProps = {
  videoMp4: string;
  videoWebm: string;
  poster: string;
  heading: InlineText;
  subheading: InlineText;
  cta: LinkValue;
};

export const HomeHero: ComponentConfig<HomeHeroProps> = {
  label: "Home hero",
  fields: {
    heading: { type: "textarea", label: "Heading", contentEditable: true },
    subheading: { type: "textarea", label: "Handwritten subheading", contentEditable: true },
    cta: linkField("Button"),
    videoMp4: { type: "text", label: "Background video (MP4)" },
    videoWebm: { type: "text", label: "Background video (WebM)" },
    poster: imageField("Video poster"),
  },
  defaultProps: {
    heading: "Scaling human potential with artificial intelligence",
    subheading: "An AI-native venture fund since 2017, born from the science of minds and machines",
    cta: { label: "See our research", href: "/research" },
    videoMp4: "/assets/basis-set-animation-part-1-transcode.mp4",
    videoWebm: "/assets/basis-set-animation-part-1-transcode.webm",
    poster: "",
  },
  render: ({ heading, subheading, cta, videoMp4, videoWebm, poster }) => (
    <section className={styles.hero}>
      <div className={styles.media}>
        {videoMp4 || videoWebm ? (
          <video
            className={styles.video}
            autoPlay
            loop
            muted
            playsInline
            poster={poster || undefined}
          >
            {videoMp4 ? <source src={videoMp4} type="video/mp4" /> : null}
            {videoWebm ? <source src={videoWebm} type="video/webm" /> : null}
          </video>
        ) : poster ? (
          <img className={styles.video} src={poster} alt="" />
        ) : null}
      </div>
      <div className={styles.content}>
        <h1 className={`bs-h1 ${styles.heading}`}>{heading}</h1>
        <div className={styles.below}>
          {subheading ? <p className={`bs-hand ${styles.sub}`}>{subheading}</p> : null}
          <LinkButton label={cta?.label} href={cta?.href} />
        </div>
      </div>
    </section>
  ),
};
