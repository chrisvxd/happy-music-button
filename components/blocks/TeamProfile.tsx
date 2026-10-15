import type { ComponentConfig } from "@puckeditor/core";
import type { ReactNode } from "react";
import { ArrowPill } from "../ui/ArrowPill";
import { SocialIcon } from "../ui/SocialIcon";
import type { SocialNetwork } from "../../lib/site";
import { imageField, textOf, type InlineText } from "../fields";
import { Section, spaceField, type Space } from "./Section";
import styles from "./TeamProfile.module.css";

export type TeamProfileProps = {
  name: InlineText;
  role: InlineText;
  portrait: string;
  socials: { network: SocialNetwork; href: string }[];
  backLabel: InlineText;
  backHref: string;
  bio: ReactNode;
  spaceAbove: Space;
};

const networkOptions: { label: string; value: SocialNetwork }[] = [
  { label: "LinkedIn", value: "linkedin" },
  { label: "X (Twitter)", value: "x" },
  { label: "GitHub", value: "github" },
  { label: "Medium", value: "medium" },
  { label: "YouTube", value: "youtube" },
  { label: "Instagram", value: "instagram" },
  { label: "Website", value: "website" },
];

export const TeamProfile: ComponentConfig<TeamProfileProps> = {
  label: "Team member profile",
  fields: {
    name: { type: "text", label: "Name", contentEditable: true },
    role: { type: "text", label: "Role", contentEditable: true },
    portrait: imageField("Portrait"),
    socials: {
      type: "array",
      label: "Social links",
      arrayFields: {
        network: { type: "select", label: "Network", options: networkOptions },
        href: { type: "text", label: "URL" },
      },
      getItemSummary: (item) => item.network || "Link",
      defaultItemProps: { network: "linkedin", href: "" },
    },
    backLabel: { type: "text", label: "Back link label", contentEditable: true },
    backHref: { type: "text", label: "Back link URL" },
    bio: { type: "richtext", label: "Bio", contentEditable: true },
    spaceAbove: spaceField(),
  },
  defaultProps: {
    name: "Team member",
    role: "Partner",
    portrait: "",
    socials: [],
    backLabel: "Back",
    backHref: "/team",
    bio: "<p>Bio</p>",
    spaceAbove: "xl",
  },
  render: ({ name, role, portrait, socials, backLabel, backHref, bio, spaceAbove }) => (
    <Section spaceAbove={spaceAbove}>
      <article className={styles.card}>
        <div className={styles.top}>
          <a href={backHref || "/team"} className={styles.back}>
            <ArrowPill direction="left" />
            <span>{backLabel || "Back"}</span>
          </a>
          <div className={styles.identity}>
            <h1 className={styles.name}>{name}</h1>
            <div className={styles.socials}>
              {(socials || []).map((s, i) =>
                s.href ? (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer">
                    <SocialIcon network={s.network} />
                  </a>
                ) : null
              )}
            </div>
            {role ? <p className={styles.role}>{role}</p> : null}
          </div>
        </div>
        {portrait ? (
          <div className={styles.portrait}>
            <img src={portrait} alt={textOf(name)} />
          </div>
        ) : null}
        <div className={`bs-prose ${styles.bio}`}>{bio}</div>
      </article>
    </Section>
  ),
};
