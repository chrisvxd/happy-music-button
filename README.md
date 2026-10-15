# Basis Set on Puck

A migration of [basisset.com](https://www.basisset.com/) (a Webflow site) to a Next.js app where every page is editable with [Puck](https://puckeditor.com). It was scaffolded with `npx @puckeditor/cli init` (Next.js recipe, editor only, no Puck Cloud or AI).

```sh
pnpm dev
# site:   http://localhost:3000
# editor: add /edit to any URL, e.g. http://localhost:3000/portfolio/edit
```

## What was migrated

All 138 routes from the original sitemap live in `database.json` as Puck page data:

| Route(s)                         | Pages | Built from                                                                   |
| -------------------------------- | ----- | ---------------------------------------------------------------------------- |
| `/`                              | 1     | Home hero, portfolio list, callout, testimonials, brand banner, team, research |
| `/portfolio`, `/team`, `/research` | 3   | Page hero + filterable company grid, team grid, insights list                |
| `/portfolio-companies/*`         | 68    | Company header, stats bar, rich text, button                                 |
| `/team-members/*`                | 21    | Team member profile card                                                     |
| `/insights/*`                    | 33    | Article header, rich text excerpt, button to the original article            |
| Program pages                    | 6     | Enterprise program, Persistence, Dev Founders, 2025 AI experiences, AI Fellowship (+ copy) |
| AI Fellows track pages           | 4     | Fellows hero, intro, track cards, accordion (Rive animations)                |
| `/founder-psychology-ii`, `/basis-set-faq` | 2 | Summaries with links to the full originals                          |

Images, video and Rive animation files were downloaded into `public/assets/`, so the app no longer depends on Webflow's CDN. A handful of research list entries still link to PDF reports and news articles hosted elsewhere.

### Content that was condensed

Long-form text was not copied verbatim. Articles under `/insights/*` keep their title, date, author, featured image and an opening excerpt, followed by a "Continue reading" button to the original. Team bios keep their opening paragraph, and the founder-psychology report and FAQ keep their structure with short excerpts. Every one of these is a normal Rich text block, so the full text can be pasted in from the editor.

## Project layout

| Path                         | Purpose                                                                              |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| `puck.config.tsx`            | Registers every block, the editor categories, and the root (page) fields              |
| `components/site/SiteShell`  | Root render: announcement bar, navbar (with mobile menu), framed layout, footers     |
| `components/blocks/*`        | Blocks for the standard Basis Set pages, each with a colocated CSS module            |
| `components/fellows/*`       | Blocks for the illustrated AI Fellows pages, including the Rive player                |
| `components/ui/*`            | Shared link button, arrow pill and social icons                                       |
| `components/fields.tsx`      | Custom image field with preview, link field, and other field helpers                  |
| `lib/site.ts`                | Navigation, social links and legal copy shared by every page                          |
| `lib/fonts.ts`               | Inter, Shadows Into Light and Instrument Serif via `next/font`                        |
| `app/styles.css`             | Design tokens, type scale and rich text styles                                        |

### Page settings

Select the page root in the editor's outline to edit the title, meta description, social image, announcement bar, and the page theme. **Standard** renders the framed off-white layout; **AI Fellows** switches to the full-bleed layout with the light navbar and blue footer, with a palette per track.

Navigation and footer links are shared site-wide and edited in `lib/site.ts` rather than per page.

## Before deploying

- **Protect `/edit` and `/puck/api`.** Both are public, as in the original recipe. Add authentication before shipping.
- **Move off `database.json`.** Swap `lib/get-page.ts` and `app/puck/api/route.ts` for a real database.
- **Set `SITE_URL`** so social share images resolve to absolute URLs.

---

The rest of this README is the original Puck recipe documentation.

# Puck + Next.js recipe

[Puck](https://puckeditor.com) is the open-source visual editor for React.

This recipe connects Puck to the [Next.js App Router](https://nextjs.org/docs/app), so you can create and edit pages for any route in this app.

## Core concepts

If you're new to Puck, this section introduces the core concepts you need to know.

### Puck

The Puck visual editor has three main parts: a config, the editor, and the renderer.

#### Config

The [config](https://puckeditor.com/docs/integrating-puck/component-configuration) registers the components users can use to build pages in the editor and the fields they can edit.

```tsx
const config = {
  components: {
    HeadingBlock: {
      fields: {
        title: { type: "text" },
      },
      render: ({ title }) => <h1>{title}</h1>,
    },
  },
};
```

#### The editor

The [`<Puck>`](https://puckeditor.com/docs/api-reference/components/puck) component renders the editor. It uses a config, exports [pages as JSON](https://puckeditor.com/docs/api-reference/data-model/data), and accepts initial page data for editing existing pages.

```tsx
<Puck
  config={config} // The components available to the editor
  data={data} // The page JSON to edit
  onPublish={(data) => {
    // Save data to your database
  }}
/>
```

#### The renderer

The [`<Render>`](https://puckeditor.com/docs/api-reference/components/render) component renders pages. It expects the page JSON and the config used to create that page.

```tsx
<Render
  config={config} // The components used to create the page
  data={data} // The page JSON to render
/>
```

## Run the recipe

### 1. Start the development server

Run:

```sh
npm run dev
```

Once the server is running, navigate to [http://localhost:3000](http://localhost:3000) to view the home page, or [http://localhost:3000/edit](http://localhost:3000/edit) to edit it with Puck.

### 2. Create a page

Navigate to [http://localhost:3000/edit](http://localhost:3000/edit), open the `Blocks` tab in the left sidebar and build your page by dragging components onto the canvas.

### 3. Publish the page

Once your page is ready, select **Publish** in the header to save the result, then navigate to [http://localhost:3000](http://localhost:3000) to view the published page.

You can also create a page at any path by navigating to `/your/path/edit` and publishing it. The route `/your/path` will render the page.

## How it works

When a URL ends in `/edit`, [`proxy.ts`](https://nextjs.org/docs/app/api-reference/file-conventions/proxy) sends the request to the Puck editor route (`app/puck/[...puckPath]/page.tsx`). The editor loads the saved page, or starts with an empty page if the path is new.

Selecting **Publish** sends the page data to the `/puck/api` endpoint (`app/puck/api/route.ts`). The handler writes the JSON to `database.json` and clears the Next.js cache for that page. The catch-all route (`app/[...puckPath]/page.tsx`) then loads the same data and renders it with [`<Render>`](https://puckeditor.com/docs/api-reference/components/render).

The table below shows the files that implement this flow.

| File                                | Purpose                                                                                            |
| ----------------------------------- | -------------------------------------------------------------------------------------------------- |
| `puck.config.tsx`                   | Defines the components, fields, and default props available to Puck. Add your own components here. |
| `app/puck/[...puckPath]/page.tsx`   | Loads page data for the editor.                                                                    |
| `app/puck/[...puckPath]/client.tsx` | Renders the editor and publishes changes.                                                          |
| `app/[...puckPath]/page.tsx`        | Loads and renders published pages.                                                                 |
| `app/puck/api/route.ts`             | Saves published pages.                                                                             |
| `proxy.ts`                          | Routes URLs ending in `/edit` to `/puck/[...puckPath]/page.tsx`.                                   |
| `lib/get-page.ts`                   | Reads page data from `database.json`. Replace this with your own data fetching logic.              |
| `database.json`                     | Acts as a local database. Replace this with your own database solution.                            |

## Before deploying to production

Before deploying this recipe, make sure to:

- **Protect the editor and API.** The `/edit` routes and `/puck/api` endpoint are public by default. Add authentication and authorization so only trusted users can edit or publish pages.
- **Add your component library.** Replace the example `HeadingBlock` in `puck.config.tsx` with the components and fields your users need.
- **Use a real database.** Replace `database.json` in `lib/get-page.ts` and `app/puck/api/route.ts`. Local files are not reliable across server instances or serverless deployments.
- **Choose a rendering strategy.** `app/[...puckPath]/page.tsx` uses `force-static`. Remove it if a page needs request-time data such as headers, cookies, or user sessions.

## Learn more

- [Puck documentation](https://puckeditor.com/docs)
- [Getting started with Puck](https://puckeditor.com/docs/getting-started)
- [Integrating Puck](https://puckeditor.com/docs/integrating-puck/component-configuration)
- [Puck Discord](https://discord.gg/D9e4E3MQVZ)
