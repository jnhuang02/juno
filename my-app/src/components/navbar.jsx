import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../ThemeContext";

const SECTIONS = ["home", "about", "projects", "writing", "contact"];

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
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggle } = useTheme();

  const isArticlePage = location.pathname.startsWith("/article");
  const isProjectPage = location.pathname.startsWith("/project");
  const isEducationPage = location.pathname.startsWith("/education");
  const isExternalPage = isArticlePage || isProjectPage || isEducationPage;

  useEffect(() => {
    if (isArticlePage) { setActive("writing"); return; }
    if (isProjectPage) { setActive("projects"); return; }
    if (isEducationPage) { setActive("about"); return; }

    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const nearBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80;
      if (nearBottom) { setActive("contact"); return; }
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && window.scrollY >= el.offsetTop - 140) { setActive(SECTIONS[i]); break; }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isArticlePage, isProjectPage, isEducationPage]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    if (isExternalPage) {
      sessionStorage.setItem("scrollTarget", id);
      navigate("/");
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
    { label: "Writing", id: "writing" },
  ];

  const barStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    background: "var(--nav-bg)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    borderBottom: `1px solid ${scrolled ? "var(--nav-border)" : "transparent"}`,
    transition: "border-color 0.25s ease, background 0.25s ease",
  };

  const markStyle = {
    width: 22,
    height: 22,
    borderRadius: 2,
    background: "var(--accent)",
    display: "grid",
    placeItems: "center",
    fontFamily: "var(--font-mono)",
    fontSize: 10,
    fontWeight: 500,
    color: "#11141f",
    letterSpacing: 0,
    flexShrink: 0,
  };

  const linkStyle = (id) => ({
    position: "relative",
    background: "transparent",
    border: 0,
    padding: "6px 2px",
    fontSize: "0.9375rem",
    fontWeight: 500,
    letterSpacing: "-0.01em",
    color: active === id ? "var(--text-primary)" : "var(--text-secondary)",
    borderBottom: `1px solid ${active === id ? "var(--accent-alt)" : "transparent"}`,
    transition: "color 0.18s ease, border-color 0.18s ease",
  });

  const iconButtonStyle = {
    display: "grid",
    placeItems: "center",
    width: 34,
    height: 34,
    borderRadius: "var(--radius)",
    border: "1px solid var(--border-subtle)",
    background: "transparent",
    color: "var(--text-secondary)",
    transition: "color 0.18s ease, border-color 0.18s ease",
  };

  return (
    <>
      {/* ── Desktop: slim hairline header ── */}
      <nav style={barStyle} className="hidden md:block">
        <div
          className="shell"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
            gap: 24,
          }}
        >
          {/* Wordmark */}
          <button
            onClick={() => scrollTo("home")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "transparent",
              border: 0,
              padding: 0,
            }}
          >
            <span style={markStyle}>JH</span>
            <span
              style={{
                fontSize: "0.9375rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
              }}
            >
              Justin Huang
            </span>
          </button>

          {/* Section links */}
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={linkStyle(id)}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color =
                    active === id ? "var(--text-primary)" : "var(--text-secondary)";
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={toggle}
              style={iconButtonStyle}
              aria-label="Toggle color theme"
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--border-strong)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="btn btn-primary btn-mono"
              style={{ padding: "8px 14px" }}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile: compact header + drawer ── */}
      <nav style={barStyle} className="md:hidden">
        <div
          className="shell"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 58,
          }}
        >
          <button
            onClick={() => scrollTo("home")}
            style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "transparent", border: 0, padding: 0 }}
          >
            <span style={{ ...markStyle, width: 20, height: 20, fontSize: 9 }}>JH</span>
            <span style={{ fontSize: "0.9rem", fontWeight: 600, letterSpacing: "-0.02em" }}>
              Justin Huang
            </span>
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button onClick={toggle} style={{ ...iconButtonStyle, width: 32, height: 32 }} aria-label="Toggle color theme">
              {isDark ? <SunIcon size={12} /> : <MoonIcon size={12} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ ...iconButtonStyle, width: 32, height: 32 }}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span style={{ display: "block", width: 14, height: 1, background: "currentColor", transition: "transform 0.25s ease", transform: menuOpen ? "translateY(5px) rotate(45deg)" : "none" }} />
                <span style={{ display: "block", width: 14, height: 1, background: "currentColor", opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s ease" }} />
                <span style={{ display: "block", width: 14, height: 1, background: "currentColor", transition: "transform 0.25s ease", transform: menuOpen ? "translateY(-5px) rotate(-45deg)" : "none" }} />
              </span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div style={{ borderTop: "1px solid var(--border-subtle)", background: "var(--nav-bg)" }}>
            <div className="shell" style={{ paddingBlock: 8 }}>
              {navLinks.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: "transparent",
                    border: 0,
                    borderBottom: "1px solid var(--border-subtle)",
                    padding: "14px 0",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: active === id ? "var(--accent-alt)" : "var(--text-primary)",
                  }}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="btn btn-primary btn-mono"
                style={{ width: "100%", justifyContent: "center", marginTop: 14, marginBottom: 8 }}
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default NavBar;
