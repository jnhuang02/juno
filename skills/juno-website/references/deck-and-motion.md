# Deck and motion

## The home page is a deck, not a scrolling page

`Portfolio` in `App.jsx` renders two sibling trees:

1. `.deck` — five invisible `.deck__slot` divs, one `100svh` each. These are
   the only thing that scrolls; together they give the page its scroll length.
2. `.deck__view` — `position: fixed; inset: 0`, holding five `.stage` scenes
   stacked in the same viewport box.

An `IntersectionObserver` watches the slots with
`rootMargin: "-45% 0px -45% 0px"`. Whichever slot crosses the middle band sets
`activeIndex`. The visible scene therefore swaps in place; nothing translates
with the scroll.

### Scene classes

`activeIndex` decides a class per scene:

```
i === activeIndex  -> is-active   (scale 1, opacity 1, interactive)
i <  activeIndex   -> is-above    (scale 1.08)
i >  activeIndex   -> is-below    (scale 0.88)
```

That asymmetry is the transition: going down, the incoming scene grows from
0.88 into place (zoom in); going up, it shrinks from 1.08 into place (zoom
out). Inactive scenes are `opacity: 0`, `pointer-events: none`, and marked
`inert`. There is no direction state to maintain.

Scene transition: `opacity 0.5s`, `transform 0.85s` with
`cubic-bezier(0.16, 1, 0.3, 1)`. Keep it movement-led; blur was rejected.

### Section jumps

Nav clicks call `goToSection(id)` on the deck. It:

1. sets the active index immediately,
2. scrolls the matching `#<id>-slot` into view with `behavior: "instant"`,
3. resets that section's inner panel `scrollTop` to 0,
4. ignores observer updates for 250ms.

The instant jump matters. With a smooth scroll, the Intermediate slots pass
through the middle band and each scene briefly activates; `scroll-snap-stop:
always` can compound that by snapping at intermediate points. Do not switch
this back to smooth scrolling.

Returning from an article uses the same path via `sessionStorage.scrollTarget`.

### Tall sections

Each scene contains `.stage__panel`, an inner `overflow-y: auto` scroller for
content taller than the viewport. Its scrollbar is hidden. At the panel's end,
the scroll chains to the page and advances the deck.

## Scrollbars

- Root scroller (`html.snap-on`, home page only): scrollbar hidden. Position is
  shown by `.rail__progress`, the thin line at the right edge.
- `.stage__panel`: scrollbar hidden.
- Long-form pages: scrollbars left visible on purpose.

## Route transition

`RouteWipe` renders a fixed full-viewport panel outside `<Routes>`. On a real
path change it rises, covers the swap, and continues upward to reveal the new
page, leaving a red edge line. It does not play on first load (React
StrictMode double-invokes effects; the component keys off an actual pathname
change). It is fixed so it cannot disturb layout or the fixed chrome.

## Reveals inside sections

`FadeIn` uses an IntersectionObserver per element and animates opacity in 0.32s
while moving 64px over 0.78s. Elements are staggered by the `delay` prop
(commonly `i * 80ms`). `direction` lets a block arrive from a side; About uses
left for the portrait and up for the bio so they arrive as separate pieces.

## Text and other motion

- `reactbits/BlurText` — word-by-word reveal. The blur was removed; words rise
  and fade. It is used for the hero headline, section headers, article titles,
  and education headings. Keep it blur-free.
- `reactbits/Magnet` — pointer-follow on primary CTAs, driven by motion values
  (not React state).
- `reactbits/SpotlightCard` — cursor spotlight on project cards.
- `reactbits/ShapeGrid` — canvas backdrop in the hero; pauses off-screen and
  accepts `animated={false}` for reduced motion.
- `CursorTrail` — cursor ribbon adapted from kikk.be; writes geometry straight
  to SVG on rAF, disabled on touch and reduced motion.

## Reduced motion

Every motion has a static path: the deck swaps scenes instantly, the route
wipe is removed, the cursor trail and shape grid stop, and `FadeIn`/BlurText
render final states. When editing the reduced-motion block, keep inactive
scenes hidden; only the transition should be neutralised.
