import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import { useTheme } from "../ThemeContext";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

const SunIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4.2" />
    <line x1="12" y1="2" x2="12" y2="4" /><line x1="12" y1="20" x2="12" y2="22" />
    <line x1="4.9" y1="4.9" x2="6.3" y2="6.3" /><line x1="17.7" y1="17.7" x2="19.1" y2="19.1" />
    <line x1="2" y1="12" x2="4" y2="12" /><line x1="20" y1="12" x2="22" y2="12" />
    <line x1="4.9" y1="19.1" x2="6.3" y2="17.7" /><line x1="17.7" y1="6.3" x2="19.1" y2="4.9" />
  </svg>
);

const MoonIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

function NavBar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggle } = useTheme();

  const isArticlePage = location.pathname.startsWith("/article");
  const isProjectPage = location.pathname.startsWith("/project");
  const isEducationPage = location.pathname.startsWith("/education");
  const isExternalPage = isArticlePage || isProjectPage || isEducationPage;

  // Rail progress. Motion's scroll value writes straight to the transform,
  // so the page never re-renders while scrolling.
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  });

  useEffect(() => {
    if (isArticlePage) { setActive("writing"); return; }
    if (isProjectPage) { setActive("projects"); return; }
    if (isEducationPage) { setActive("about"); return; }

    const els = SECTIONS.map(({ id }) => document.getElementById(id)).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === "undefined") return;

    // A thin band across the middle of the viewport decides the active
    // section, which works for sections both shorter and taller than the screen.
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isArticlePage, isProjectPage, isEducationPage]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    if (isExternalPage) {
      sessionStorage.setItem("scrollTarget", id);
      navigate("/");
    } else {
      const section = document.getElementById(id);
      if (!section) return;
      // Each section is its own scroll panel now, so reset it to the top
      // when jumping in.
      const panel = section.querySelector(".stage__panel");
      if (panel) panel.scrollTop = 0;
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Wordmark, top left (desktop) ── */}
      <button
        type="button"
        className="wordmark"
        onClick={() => scrollTo("home")}
      >
        <span className="wordmark__mark">JH</span>
        <span className="wordmark__name">Justin Huang</span>
      </button>

      {/* ── Section rail, right edge (desktop) ── */}
      <nav className="rail" aria-label="Section navigation">
        <span className="rail__progress" aria-hidden="true">
          <motion.span style={{ scaleY: progress }} />
        </span>

        {/* One constant surface behind the chrome, so the text colour can
            stay fixed no matter which section is scrolling past behind it. */}
        <div className="rail__panel">
          <span className="rail__links">
            {SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`rail__link${active === id ? " is-active" : ""}`}
                onClick={() => scrollTo(id)}
                aria-current={active === id ? "true" : undefined}
              >
                <span className="rail__label">{label}</span>
                <span className="rail__tick" aria-hidden="true" />
              </button>
            ))}
          </span>

          <button
            type="button"
            className="rail__theme"
            onClick={toggle}
            aria-label="Toggle color theme"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </nav>

      {/* ── Compact bar + drawer (mobile and narrow screens) ── */}
      <div className="mobilebar">
        <div className="mobilebar__inner">
          <button type="button" className="wordmark" onClick={() => scrollTo("home")}>
            <span className="wordmark__mark" style={{ width: 20, height: 20, fontSize: 9 }}>JH</span>
            <span className="wordmark__name" style={{ fontSize: "0.9rem" }}>Justin Huang</span>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              type="button"
              className="rail__theme"
              style={{ marginTop: 0, width: 32, height: 32 }}
              onClick={toggle}
              aria-label="Toggle color theme"
            >
              {isDark ? <SunIcon size={12} /> : <MoonIcon size={12} />}
            </button>

            <button
              type="button"
              className="rail__theme"
              style={{ marginTop: 0, width: 32, height: 32 }}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ display: "block", width: 14, height: 1, background: "currentColor", transition: "transform .25s ease", transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none" }} />
                <span style={{ display: "block", width: 14, height: 1, background: "currentColor", opacity: menuOpen ? 0 : 1 }} />
                <span style={{ display: "block", width: 14, height: 1, background: "currentColor", transition: "transform .25s ease", transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none" }} />
              </span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="mobilebar__drawer">
            {SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                className={`mobilebar__link${active === id ? " is-active" : ""}`}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default NavBar;
