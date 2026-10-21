import { useRef, useEffect, useState } from "react";

/**
 * Reveals content as it enters view.
 *
 * Deliberately movement-led: a long travel distance with a strong ease-out,
 * so blocks fly into place, and only a short fade. A slow cross-fade reads as
 * vague and is what makes a scroll feel woozy, so the opacity settles in
 * roughly a third of the time the movement takes.
 *
 * `direction` lets a block arrive from a side, which is what gives a section
 * its sense of pieces arriving one after another.
 */
const FadeIn = ({
  children,
  delay = 0,
  className = "",
  style = {},
  distance = 64,
  direction = "up",
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const from = {
    up: `translate3d(0, ${distance}px, 0)`,
    down: `translate3d(0, -${distance}px, 0)`,
    left: `translate3d(-${distance}px, 0, 0)`,
    right: `translate3d(${distance}px, 0, 0)`,
  }[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : `${from} scale(0.975)`,
        transition: `opacity 0.32s ease ${delay}ms, transform 0.78s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: visible ? "auto" : "transform, opacity",
      }}
    >
      {children}
    </div>
  );
};

export default FadeIn;
