/**
 * BlurText
 * Adapted from React Bits — https://reactbits.dev/text-animations/blur-text
 * (MIT + Commons Clause, DavidHDev/react-bits)
 *
 * Site adaptations:
 *  - `segments` prop: a headline can mix styled runs (e.g. a serif italic
 *    phrase inside a sans headline) while the words still flow and wrap as
 *    one block of text.
 *  - `tag`, `style` and `startDelay` props.
 *  - Softer travel/blur defaults to suit the editorial layout.
 *  - Honours prefers-reduced-motion by rendering the text statically.
 */
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);
  const keyframes = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

/** Flattens segments into a single ordered token list. */
const buildTokens = (segments, animateBy) => {
  const tokens = [];
  segments.forEach((segment) => {
    const raw = segment.text ?? "";
    const parts =
      animateBy === "chars" ? Array.from(raw) : raw.trim().split(/\s+/).filter(Boolean);
    parts.forEach((part) =>
      tokens.push({ part, className: segment.className, style: segment.style })
    );
  });
  return tokens;
};

const BlurText = ({
  text = "",
  segments,
  delay = 70,
  startDelay = 0,
  className = "",
  style,
  tag: Tag = "p",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();

  const tokens = useMemo(
    () => buildTokens(segments ?? [{ text }], animateBy),
    [segments, text, animateBy]
  );

  useEffect(() => {
    if (prefersReduced) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, prefersReduced]);

  const from = useMemo(
    () =>
      animationFrom ?? {
        filter: "blur(8px)",
        opacity: 0,
        y: direction === "top" ? 22 : -22,
      },
    [animationFrom, direction]
  );

  const to = useMemo(
    () =>
      animationTo ?? [
        { filter: "blur(4px)", opacity: 0.5, y: direction === "top" ? 4 : -4 },
        { filter: "blur(0px)", opacity: 1, y: 0 },
      ],
    [animationTo, direction]
  );

  const keyframes = useMemo(() => buildKeyframes(from, to), [from, to]);

  const stepCount = to.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  /* Deliberately NOT a flex container: keeping the words in normal inline
     flow means they wrap exactly like the surrounding typography would. */
  const baseStyle = { ...style };

  if (prefersReduced) {
    return (
      <Tag ref={ref} className={className} style={baseStyle}>
        {segments
          ? segments.map((segment, i) => (
              <span key={i} className={segment.className} style={segment.style}>
                {segment.text}
                {i < segments.length - 1 ? " " : null}
              </span>
            ))
          : text}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className} style={baseStyle}>
      {tokens.map((token, index) => (
        <Fragment key={`${token.part}-${index}`}>
          <motion.span
            className={token.className}
            style={{ display: "inline-block", willChange: "transform, filter, opacity", ...token.style }}
            initial={from}
            animate={inView ? keyframes : from}
            transition={{
              duration: totalDuration,
              times,
              delay: startDelay + (index * delay) / 1000,
              ease: easing,
            }}
            onAnimationComplete={index === tokens.length - 1 ? onAnimationComplete : undefined}
          >
            {token.part === " " ? "\u00A0" : token.part}
          </motion.span>
          {/* Real, collapsible space between words so the line box measures
              exactly like the plain text would (a trailing &nbsp; would add
              width to every word and change where the lines break). */}
          {animateBy === "words" && index < tokens.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
};

export default BlurText;
