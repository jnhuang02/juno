# Design system

All tokens live in `src/index.css`: `:root` is the dark theme (the default) and
`[data-theme="light"]` overrides. `ThemeContext.jsx` persists the choice to
`localStorage.theme`; an inline script in `index.html` applies the attribute
before first paint.

## Typography

```
--font-sans   Instrument Sans   UI, headings, body
--font-serif  Instrument Serif  italic emphasis in headlines, pull quotes
--font-mono   Geist Mono        labels, metadata, buttons, nav
```

Fonts load from Google Fonts in `index.html`. Display sizes use `clamp()`.
`display-xl` caps at 4.1rem and `.display-lg`/`.display-md` scale down.

## Color

Dark (default)                  | Light
---                            | ---
`--bg-primary   #11141f`       | `#f5f0ed`
`--bg-secondary #0f1321`       | `#ede7e2`
`--bg-inverse   #f5f0ed`       | `#11141f`
`--text-primary #f5f0ed`       | `#11100e`
`--accent       #ccebd4`       | `#ccebd4`
`--accent-alt   #7e9bc9`       | `#4e6ba1`

`--accent` is the mint fill of the JH mark (and the shape-grid hover tint).
Primary buttons use their own `--btn-bg` / `--btn-fg` pair so they stay correct
in both themes. `--accent-alt` is the text-safe accent used for links, focus
rings and `.tag-accent`. Mint cannot be used as text on cream: it is about
1.3:1. The light theme exists because of this.

### Nav colors (separate from content)

```
idle    dark #ccebd4   light #35705a   (matches the JH mark's hue)
active  dark #ff5c5c   light #cf2e2e   (red, from the MLCommons palette)
```

Both idle values are exposed as `--nav-idle` and consumed through
`--chrome-idle`. The nav sits on a constant translucent surface
(`--chrome-surface`) so these colors never need to change as sections scroll
by. Do not reintroduce per-section nav recoloring.

## Utilities to reuse

Layout: `.shell` (1240px), `.shell-narrow` (reading width token
`--reading-width`), `.section`, `.rule`, `.grid-line-v`.

Type: `.display-xl`, `.display-lg`, `.display-md`, `.serif`, `.lead`,
`.body-text`, `.label`, `.meta`.

Surfaces and controls: `.card`, `.card-hover`, `.hover-invert`, `.btn`,
`.btn-primary`, `.btn-outline`, `.btn-mono`, `.tag`, `.tag-accent`,
`.link-arrow`, `.band-ink`.

Readings: `.reading`, `.reading-figure` (images fill the full text column and
are capped at `--reading-image-max-h`, centre-cropped with `object-fit:
cover`; the caption stays aligned to the text), `.related-row`,
`.spec-table`, `.metric-grid`.

## Shape and layout conventions

- Corner radius is a near-square `3px` (`--radius`) everywhere. Keep it
  consistent.
- Hairlines come from `--border-subtle` / `--border-strong`; prefer rules over
  shadows.
- Section headers are a rule, a title, and a description stacked vertically.
  Do not reintroduce a side-by-side headline/explainer split or numbered
  eyebrows.
- Cards without elevation use `.card`; spacing separates most content.
- The reading column is controlled by `--reading-width` (1080px). Text and
  images share that width on purpose; images are only limited in height, by
  `--reading-image-max-h`.

## Inversion

`.band-ink` flips a block to `--bg-inverse` with `--text-inverse`. It is used
by the contact section and the education page heroes. Content inside it uses
`color-mix()` against `--text-inverse` (see `.band-ink .label`). Do not assume
`.band-ink` is dark: in dark mode it is cream.

## Nav responsive behavior

- At `>= 1440px`: fixed wordmark top-left, right rail with section links,
  progress line and theme toggle. Labels are mint; the active one is red.
- Below 1440px: fixed top bar with wordmark, theme toggle and hamburger drawer.
- The rail needs the margin, which is why the breakpoint is 1440 and why the
  home shell is not widened back to 1240-plus-rail.

## Content voice

Headings are sentence case. Metadata and labels are uppercase mono. Copy is
personal and first person; avoid marketing filler. User-authored article and
project prose is not to be rewritten during design work.
