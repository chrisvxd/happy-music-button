import type { Config } from "@puckeditor/core";

import { SiteShell, type FellowsPalette, type SiteTheme } from "./components/site/SiteShell";
import { yesNo, type InlineText } from "./components/fields";

import { HomeHero, type HomeHeroProps } from "./components/blocks/HomeHero";
import { PageHero, type PageHeroProps } from "./components/blocks/PageHero";
import { ContentSection, type ContentSectionProps } from "./components/blocks/ContentSection";
import { CompanyList, type CompanyListProps } from "./components/blocks/CompanyList";
import { Callout, type CalloutProps } from "./components/blocks/Callout";
import { Testimonials, type TestimonialsProps } from "./components/blocks/Testimonials";
import { BrandBanner, type BrandBannerProps } from "./components/blocks/BrandBanner";
import { TeamGrid, type TeamGridProps } from "./components/blocks/TeamGrid";
import { FeaturedInsights, type FeaturedInsightsProps } from "./components/blocks/FeaturedInsights";
import { InsightList, type InsightListProps } from "./components/blocks/InsightList";
import { CompanyHeader, type CompanyHeaderProps } from "./components/blocks/CompanyHeader";
import { StatBar, type StatBarProps } from "./components/blocks/StatBar";
import { RichText, type RichTextProps } from "./components/blocks/RichText";
import { ButtonLink, type ButtonLinkProps } from "./components/blocks/ButtonLink";
import { TeamProfile, type TeamProfileProps } from "./components/blocks/TeamProfile";
import { ArticleHeader, type ArticleHeaderProps } from "./components/blocks/ArticleHeader";
import { LogoGrid, type LogoGridProps } from "./components/blocks/LogoGrid";
import { PeopleGrid, type PeopleGridProps } from "./components/blocks/PeopleGrid";
import { FaqList, type FaqListProps } from "./components/blocks/FaqList";
import { TalkHighlights, type TalkHighlightsProps } from "./components/blocks/TalkHighlights";
import { DemoGrid, type DemoGridProps } from "./components/blocks/DemoGrid";
import { ImageBlock, type ImageBlockProps } from "./components/blocks/ImageBlock";
import { Spacer, type SpacerProps } from "./components/blocks/Spacer";
import { FellowsHero, type FellowsHeroProps } from "./components/fellows/FellowsHero";
import { FellowsIntro, type FellowsIntroProps } from "./components/fellows/FellowsIntro";
import { TrackCards, type TrackCardsProps } from "./components/fellows/TrackCards";
import { Accordion, type AccordionProps } from "./components/fellows/Accordion";

type Props = {
  HomeHero: HomeHeroProps;
  PageHero: PageHeroProps;
  ContentSection: ContentSectionProps;
  CompanyList: CompanyListProps;
  Callout: CalloutProps;
  Testimonials: TestimonialsProps;
  BrandBanner: BrandBannerProps;
  TeamGrid: TeamGridProps;
  FeaturedInsights: FeaturedInsightsProps;
  InsightList: InsightListProps;
  CompanyHeader: CompanyHeaderProps;
  StatBar: StatBarProps;
  RichText: RichTextProps;
  ButtonLink: ButtonLinkProps;
  TeamProfile: TeamProfileProps;
  ArticleHeader: ArticleHeaderProps;
  LogoGrid: LogoGridProps;
  PeopleGrid: PeopleGridProps;
  FaqList: FaqListProps;
  TalkHighlights: TalkHighlightsProps;
  DemoGrid: DemoGridProps;
  ImageBlock: ImageBlockProps;
  Spacer: SpacerProps;
  FellowsHero: FellowsHeroProps;
  FellowsIntro: FellowsIntroProps;
  TrackCards: TrackCardsProps;
  Accordion: AccordionProps;
};

export type RootProps = {
  title: string;
  description: string;
  ogImage: string;
  theme: SiteTheme;
  palette: FellowsPalette;
  showAnnouncement: boolean;
  announcementText: InlineText;
  announcementHref: string;
};

export const config: Config<Props, RootProps> = {
  categories: {
    heroes: {
      title: "Heroes",
      components: ["HomeHero", "PageHero", "CompanyHeader", "ArticleHeader"],
    },
    content: {
      title: "Content",
      components: [
        "ContentSection",
        "RichText",
        "ButtonLink",
        "Callout",
        "BrandBanner",
        "ImageBlock",
        "FaqList",
        "Spacer",
      ],
    },
    collections: {
      title: "Portfolio, team & research",
      components: [
        "CompanyList",
        "TeamGrid",
        "TeamProfile",
        "StatBar",
        "FeaturedInsights",
        "InsightList",
        "Testimonials",
      ],
    },
    programs: {
      title: "Programs & community",
      components: ["LogoGrid", "PeopleGrid", "TalkHighlights", "DemoGrid"],
    },
    fellows: {
      title: "AI Fellows",
      components: ["FellowsHero", "FellowsIntro", "TrackCards", "Accordion"],
    },
  },
  root: {
    fields: {
      title: { type: "text", label: "Page title" },
      description: { type: "textarea", label: "Meta description" },
      ogImage: { type: "text", label: "Social share image" },
      theme: {
        type: "radio",
        label: "Page theme",
        options: [
          { label: "Standard", value: "standard" },
          { label: "AI Fellows", value: "fellows" },
        ],
      },
      palette: {
        type: "select",
        label: "AI Fellows palette",
        options: [
          { label: "Purple", value: "purple" },
          { label: "Commerce", value: "commerce" },
          { label: "Healthcare", value: "healthcare" },
          { label: "Infrastructure", value: "infrastructure" },
        ],
      },
      showAnnouncement: yesNo("Show announcement bar"),
      // Root fields aren't saved from inline edits, so this one is edited in the sidebar
      announcementText: { type: "text", label: "Announcement text" },
      announcementHref: { type: "text", label: "Announcement link" },
    },
    defaultProps: {
      title: "Basis Set",
      description: "",
      ogImage: "/assets/open-graph-home.png",
      theme: "standard",
      palette: "purple",
      showAnnouncement: false,
      announcementText: "",
      announcementHref: "",
    },
    render: ({ children, theme, palette, showAnnouncement, announcementText, announcementHref, puck }) => (
      <SiteShell
        theme={theme}
        palette={palette}
        editing={puck?.isEditing}
        announcement={{ show: showAnnouncement, text: announcementText, href: announcementHref }}
      >
        {children}
      </SiteShell>
    ),
  },
  components: {
    HomeHero,
    PageHero,
    ContentSection,
    CompanyList,
    Callout,
    Testimonials,
    BrandBanner,
    TeamGrid,
    FeaturedInsights,
    InsightList,
    CompanyHeader,
    StatBar,
    RichText,
    ButtonLink,
    TeamProfile,
    ArticleHeader,
    LogoGrid,
    PeopleGrid,
    FaqList,
    TalkHighlights,
    DemoGrid,
    ImageBlock,
    Spacer,
    FellowsHero,
    FellowsIntro,
    TrackCards,
    Accordion,
  },
};

export default config;
