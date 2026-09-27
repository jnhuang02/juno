/**
 * CursorTrail
 *
 * Inspired by the pointer trail on https://kikk.be/ — a tapered ribbon that
 * chases the cursor, sweeping through several hues and relaxing back into a
 * point when the pointer stops.
 *
 * Where the reference builds the ribbon from 50 overlapping <line> elements
 * (via GSAP), this draws it as a single filled <path> whose width tapers from
 * the head to the tail. Overlapping strokes stack their alpha at every joint,
 * which reads as a string of beads at everyday mouse speeds; one polygon
 * avoids that completely and costs a single DOM write per frame. The colour
 * sweep and the fade along the tail come from the gradient stops.
 *
 * Disabled for touch / small screens and for prefers-reduced-motion.
 */
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useTheme } from "../ThemeContext";

const SEGMENTS = 50;

/* Colour ramps — the reference sweeps through several hues rather than one
   tint, which is what gives the trail its candy-stripe quality. These keep
   that sweep inside this site's palette. */
const RAMP_DARK = ["#ccebd4", "#a9dcd4", "#7e9bc9", "#8f86d8", "#b98cdf"];
const RAMP_LIGHT = ["#67a671", "#4d8fae", "#4e6ba1", "#6b5ba8", "#8a5fa8"];

/* Opacity at each gradient stop, head → tail. */
const STOP_OPACITY = [0.85, 0.72, 0.6, 0.47, 0.34];

/** True when the viewport is desktop-sized and the pointer is precise. */
const useHasFinePointer = () => {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const fine = window.matchMedia("(pointer: fine)");
    const update = () => setOk(wide.matches && fine.matches);
    update();
    wide.addEventListener("change", update);
    fine.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      fine.removeEventListener("change", update);
    };
  }, []);

  return ok;
};

const CursorTrail = ({
  segments = SEGMENTS,
  width = 26,
  widthStep = 0.44,
  ease = 0.3,
}) => {
  const { isDark } = useTheme();
  const prefersReduced = useReducedMotion();
  const hasFinePointer = useHasFinePointer();
  const pathRef = useRef(null);
  const headRef = useRef(null);
  const gradientRef = useRef(null);
  const [started, setStarted] = useState(false);
  const gradientId = useId().replace(/:/g, "");

  const stops = useMemo(() => (isDark ? RAMP_DARK : RAMP_LIGHT), [isDark]);
  const enabled = hasFinePointer && !prefersReduced;

  useEffect(() => {
    if (!enabled) return;

    const MIN_WIDTH = 1.5;
    const halfWidth = (i) => Math.max(MIN_WIDTH, width - i * widthStep) / 2;

    // One extra point so `segments` spans can be drawn between them.
    const points = Array.from({ length: segments + 1 }, () => ({ x: -200, y: -200 }));
    const target = { x: -200, y: -200 };
    // Ref rather than state: flipping state here would re-run this effect and
    // rebuild the chain, so the ribbon would fly in from the top-left corner.
    let hasStarted = false;
    let raf = 0;

    const onPointerMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!hasStarted) {
        hasStarted = true;
        points.forEach((p) => {
          p.x = e.clientX;
          p.y = e.clientY;
        });
        setStarted(true);
      }
    };

    const onPointerOut = (e) => {
      if (e.relatedTarget === null) {
        hasStarted = false;
        setStarted(false);
      }
    };

    const tick = () => {
      points[0].x = target.x;
      points[0].y = target.y;

      for (let i = 1; i < points.length; i++) {
        points[i].x += (points[i - 1].x - points[i].x) * ease;
        points[i].y += (points[i - 1].y - points[i].y) * ease;
      }

      // Offset each point along the local normal to build the ribbon outline.
      const left = [];
      const right = [];
      for (let i = 0; i < points.length; i++) {
        const a = points[Math.max(0, i - 1)];
        const b = points[Math.min(points.length - 1, i + 1)];
        const tx = b.x - a.x;
        const ty = b.y - a.y;
        const len = Math.hypot(tx, ty) || 1;
        const nx = -ty / len;
        const ny = tx / len;
        const w = halfWidth(i);
        left.push(`${(points[i].x + nx * w).toFixed(1)},${(points[i].y + ny * w).toFixed(1)}`);
        right.push(`${(points[i].x - nx * w).toFixed(1)},${(points[i].y - ny * w).toFixed(1)}`);
      }

      const path = pathRef.current;
      if (path) {
        path.setAttribute(
          "d",
          `M${left.join("L")}L${right.reverse().join("L")}Z`
        );
      }

      const head = headRef.current;
      if (head) {
        head.setAttribute("cx", points[0].x);
        head.setAttribute("cy", points[0].y);
        head.setAttribute("r", halfWidth(0));
      }

      // Park the gradient on the head→tail axis so the hue sweep and the
      // fade always run along the ribbon, however it curls.
      const grad = gradientRef.current;
      if (grad) {
        grad.setAttribute("x1", points[0].x);
        grad.setAttribute("y1", points[0].y);
        grad.setAttribute("x2", points[points.length - 1].x);
        grad.setAttribute("y2", points[points.length - 1].y);
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerout", onPointerOut);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerout", onPointerOut);
    };
  }, [enabled, segments, ease, width, widthStep]);

  if (!enabled) return null;

  return (
    <svg
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: started ? 1 : 0,
        transition: "opacity 0.45s ease",
      }}
    >
      <defs>
        <linearGradient
          id={gradientId}
          ref={gradientRef}
          gradientUnits="userSpaceOnUse"
        >
          {stops.map((color, i) => (
            <stop
              key={color}
              offset={`${(i / (stops.length - 1)) * 100}%`}
              stopColor={color}
              stopOpacity={STOP_OPACITY[i]}
            />
          ))}
        </linearGradient>
      </defs>

      <path ref={pathRef} fill={`url(#${gradientId})`} d="" />
      <circle ref={headRef} fill={stops[0]} fillOpacity={STOP_OPACITY[0]} r="0" />
    </svg>
  );
};

export default CursorTrail;
