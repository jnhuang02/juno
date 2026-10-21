/**
 * RouteWipe
 *
 * A curtain that covers the page swap when navigating between routes and then
 * slides away, revealing the new page from the bottom up. Deliberately a
 * movement rather than a cross-fade: a full-screen dissolve between two
 * different pages is disorienting, while a wipe gives the eye something to
 * follow.
 *
 * It lives outside the routed content and is fixed to the viewport, so it can
 * never be affected by (or break) the layout of the page underneath. It does
 * not play on the initial page load, only on an actual route change.
 */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const RouteWipe = () => {
  const { pathname } = useLocation();
  const [playId, setPlayId] = useState(0);
  const previousPath = useRef(null);

  useEffect(() => {
    const previous = previousPath.current;
    previousPath.current = pathname;

    // No animation on the first render, and none for React's development
    // double-invoke of this effect, which runs with the same path. Only an
    // actual change of route plays the curtain.
    if (previous === null || previous === pathname) return;

    // Bumping the key remounts the element, which restarts the CSS animation.
    setPlayId((n) => n + 1);
  }, [pathname]);

  if (!playId) return null;

  return <div key={playId} className="route-wipe" aria-hidden="true" />;
};

export default RouteWipe;
