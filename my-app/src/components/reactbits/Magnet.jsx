/**
 * Magnet
 * Adapted from React Bits — https://reactbits.dev/animations/magnet
 * (MIT + Commons Clause, DavidHDev/react-bits)
 *
 * Site adaptations:
 *  - Pointer offset rides on motion values rather than React state. Upstream
 *    calls setState on every mousemove, which re-renders the tree each frame;
 *    motion values write straight to the element instead.
 *  - Disabled entirely under prefers-reduced-motion.
 */
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const Magnet = ({
  children,
  padding = 90,
  disabled = false,
  magnetStrength = 7,
  wrapperClassName = "",
  innerClassName = "",
  ...props
}) => {
  const magnetRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const isDisabled = disabled || prefersReduced;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 24, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 24, mass: 0.6 });

  useEffect(() => {
    if (isDisabled) {
      x.set(0);
      y.set(0);
      return;
    }

    const handleMouseMove = (e) => {
      if (!magnetRef.current) return;

      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        x.set((e.clientX - centerX) / magnetStrength);
        y.set((e.clientY - centerY) / magnetStrength);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, isDisabled, magnetStrength, x, y]);

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: "relative", display: "inline-block" }}
      {...props}
    >
      <motion.div
        className={innerClassName}
        style={{
          x: springX,
          y: springY,
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Magnet;
