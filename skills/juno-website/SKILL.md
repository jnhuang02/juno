---
name: juno-website
description: "Understand and safely modify Justin Huang's portfolio site (the juno repo): the scene-deck home page, right-side nav rail, theme tokens, article and project content, and its toolchain quirks. Use when working on this site's layout, motion, navigation, theme, or content. Do not use for unrelated web projects."
---

# Juno website

Justin Huang's personal portfolio: React 19 + Vite + Tailwind v4, deployed on
Vercel. The app lives in `my-app/` inside the repo root. Read this file first,
then only the reference that matches the task.

## Orientation

- App code: `my-app/src/`. Routes and the home deck: `src/App.jsx`.
- Design tokens and almost all layout CSS: `src/index.css`. Components carry
  their own inline styles on top of it.
- Content is data, not markup: `src/data/articles.js` and
  `src/data/projects.js`.
- Entry point: `src/main.jsx` (HashRouter + ThemeProvider).

## References

- [references/architecture.md](references/architecture.md) — routes, components,
  where each section lives. Read before changing page structure.
- [references/deck-and-motion.md](references/deck-and-motion.md) — the home
  scene deck, scroll slots, zoom transition, route curtain, cursor trail. Read
  before touching scrolling, nav jumps, or any animation.
- [references/design-system.md](references/design-system.md) — tokens, fonts,
  utilities, light/dark inversion, nav color rules. Read before restyling.
- [references/toolchain.md](references/toolchain.md) — build commands, Node
  architecture trap, Vercel root-directory rule, headless verification limits.
  Read before building, deploying, or testing.

## Invariants

- **Never put `transform` or `filter` on an ancestor of the fixed chrome.**
  The nav rail, wordmark, chat button and cursor trail are `position: fixed`;
  a transformed ancestor silently breaks them. That is why route transitions
  use a viewport-fixed curtain outside the routed tree.
- **Inactive scenes must stay hidden.** The deck's five `.stage` scenes overlap
  in the same viewport. Do not blanket-set `opacity: 1` (for example in a
  reduced-motion block): it stacks every section on top of each other.
- **Motion is movement-led.** Blur transitions were explicitly rejected and
  removed. Prefer scale/translate/opacity over blur, and keep transitions
  short.
- **Content is the author's.** Do not rewrite prose in `data/*.js`, rename
  slugs, or change article or project copy unless asked. Slugs appear in URLs.
- **Deploy from the repo root.** The Vercel project's Root Directory is
  `my-app`, so `vercel --prod` must run from `juno/`, not from `my-app/`.

## Working method

1. Read the relevant reference above.
2. Change the source; keep tokens and shared classes in `index.css` rather
   than inventing one-off colors.
3. Build from `my-app/`. On this machine use the nvm Node (see toolchain
   reference) or the build fails on a missing rollup binary.
4. Verify both themes. If the change involves scrolling or observers, verify
   structure and computed styles, not just a screenshot, and remove any
   temporary diagnostic script from `index.html` afterwards.
