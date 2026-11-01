# Architecture

## Routes

| Path | Component | Kind |
|---|---|---|
| `/` | `Portfolio` (in `App.jsx`) | Scene deck, five sections |
| `/article/:slug` | `ArticlePage` | Long-form reading page |
| `/project/:slug` | `ProjectPage` | Long-form case study |
| `/education/ucla` | `UCLAPage` | Long-form education page |
| `/education/ucsd` | `UCSDPage` | Long-form education page |

Routing is `HashRouter`, so live URLs look like `/#/article/the-upgrade-trap`.
Keep that in mind when testing: the path after `#` is the router path.

## Home page composition

`App.jsx` defines a `SECTIONS` array that drives both the deck and the
per-section render:

```
home     -> Home            hero statement + playable console
about    -> AboutMe         portrait, bio, education, skills
projects -> Projects        grid of ProjectCard from data/projects.js
writing  -> FeaturedWriting list of rows from data/articles.js
contact  -> ContactMe       inverted band with contact rows and CTA
```

Each section component renders its own full-width band and inner padding. The
deck (see deck-and-motion reference) supplies positioning and visibility;
components should not assume they own the scroll position.

## Shared components

- `navbar.jsx` — right rail on wide screens, top bar + drawer below 1440px.
  Receives `activeSection` from the deck and `onNavigate` for jumps. On
  long-form pages it falls back to its own scroll-spy.
- `RouteWipe.jsx` — fixed curtain that plays on route changes only.
- `CursorTrail.jsx` — fixed SVG ribbon following the pointer; desktop and
  fine-pointer only, reduced motion disables it.
- `ChatBot.jsx` — assistant widget; home page only.
- `FadeIn.jsx` — viewport-entry reveal used across sections. Accepts `delay`,
  `distance`, and `direction` (`up`/`down`/`left`/`right`).
- `SectionHeader.jsx` — hairline rule, title, description stacked.
- `reactbits/` — vendored React Bits components (BlurText, CountUp, Magnet,
  SpotlightCard, ShapeGrid) adapted to the theme. Their headers record what
  was changed.

## Content data

Both data files export arrays of objects consumed by the list and detail pages.

Article fields: `slug`, `title`, `date`, `readTime`, `tags`, `banner`,
`excerpt`, `content`.

Project fields: `slug`, `title`, `tagline`, `image`, `link`, `repo`, `tags`,
`role`, `timeline`, `stack`, `overview`, `metrics`, `content`.

`content` is an array of blocks rendered by `ArticlePage` and `ProjectPage`:

```
{ type: "p",          text }
{ type: "h2",         text }
{ type: "h3",         text }
{ type: "blockquote", text }
{ type: "image",      src, alt, caption }
{ type: "link",       href, text }
{ type: "metric",     label, value }   // project metrics only
```

`text` may be a plain string or an array mixing strings and
`{ text, href }` segments for inline links.

Order matters: the first article is the newest and appears first in the
writing list. Adding an article means adding it at the top of the array with a
unique slug and a `date` matching the existing style.

## Things that look unused but are not

- `public/404.html` supports GitHub Pages deep links.
- `.vercel/project.json` at the repo root links the CLI to the project.
- `imgs/logo.png` is the retired blue-glow logo and is no longer referenced;
  `imgs/logo-mark.png` is the favicon and Apple touch icon.
