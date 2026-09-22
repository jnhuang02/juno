/**
 * SpotlightCard
 * Adapted from React Bits — https://reactbits.dev/components/spotlight-card
 * (MIT + Commons Clause, DavidHDev/react-bits)
 *
 * Site adaptations:
 *  - `as` prop + prop spreading so the card can be a react-router <Link>.
 *  - Spotlight colour derives from the theme tokens (see SpotlightCard.css).
 */
import { useRef } from "react";
import "./SpotlightCard.css";

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor,
  as: Tag = "div",
  ...props
}) => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    if (spotlightColor) el.style.setProperty("--spotlight-color", spotlightColor);
  };

  return (
    <Tag
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`.trim()}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default SpotlightCard;
