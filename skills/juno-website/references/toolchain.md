# Toolchain

## Commands

Run from `my-app/`:

```
npm run dev        # Vite dev server
npm run build      # production build to dist/
npm run preview    # serve the build
npm run lint       # eslint (see the known-failure note)
```

## Node architecture trap (this machine)

Two Node installs exist:

- `/usr/local/bin/node` — v20.11.0, arm64 (first on PATH)
- `~/.nvm/versions/node/v20.19.4/bin/node` — v20.19.4, **x64 (Rosetta)**

`node_modules` was installed under the x64 nvm Node, so it contains
`@rollup/rollup-darwin-x64` but not the arm64 binary. Building with the arm64
Node fails with:

```
Cannot find module @rollup/rollup-darwin-arm64
```

If that happens, either run the build with the nvm Node first on PATH:

```
PATH="$HOME/.nvm/versions/node/v20.19.4/bin:$PATH" npm run build
```

or reinstall dependencies under the arm64 Node (`npm install` from `my-app/`).
The nvm default alias is 20.19.4, so a normal login shell usually works.

## Deploy

Vercel project Root Directory is `my-app`. Run deploy from the repo root:

```
cd ~/Documents/GitHub/juno
vercel --prod
```

Running it from inside `my-app/` makes Vercel look for `my-app/my-app` and
fails. The project is linked at the repo root in `.vercel/project.json`.

GitHub Pages is also configured (`npm run deploy` → `gh-pages -d dist`), but the
site is served by Vercel in practice. Routing uses `HashRouter`, so deep links
work on any static host.

## Verification

Build is the minimum gate. Lint currently fails repo-wide on `react/prop-types`
and a few pre-existing unused variables; that is not caused by a new change.
Check that your files add no *new* rule violations rather than expecting a
clean run.

### Headless Chrome limits

Screenshots are useful for layout, color and static states, but this
environment cannot exercise scroll-driven behaviour:

- IntersectionObserver callbacks fire at page load but **not** after a
  programmatic scroll.
- CSS transitions and animations do not advance without frames, so a screenshot
  can capture a stale or mid-transition value.
- `motion` values that depend on rAF do not update.

For anything scroll- or observer-driven, verify structure and computed styles
instead: inject a temporary script into `index.html` that reports DOM state,
class names, computed transforms, or `getBoundingClientRect()` through
`document.title`, then read it with:

```
chrome --headless=new --dump-dom http://localhost:PORT/ > out.html
```

To measure settled values, disable transitions first with an injected
`*{transition:none !important}` style.

**Always remove the temporary script from `index.html` afterwards**; it must
never be committed.

### Useful viewport facts

- The rail appears at `>= 1440px`; below that the mobile bar.
- `100svh` differs from `window.innerHeight` in headless (about 813 vs 900 at a
  900px window). Use the element's own `getBoundingClientRect()` rather than
  assuming window height.

## Secrets

`.env` and `.env.local` exist in `my-app/`. Do not print, echo, or commit their
contents, and do not add them to the repo.
