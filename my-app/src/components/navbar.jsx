import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../ThemeContext";

function NavBar() {
  const [active, setActive]     = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate   = useNavigate();
  const location   = useLocation();
  const { isDark, toggle } = useTheme();
  const isArticlePage = location.pathname.startsWith("/article");

  const textActive   = "rgba(255,255,255,1)";
  const textInactive = "rgba(255,255,255,0.5)";

  useEffect(() => {
    if (isArticlePage) { setActive("writing"); return; }
    const onScroll = () => {
      const nearBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 80;
      if (nearBottom) { setActive("contact"); return; }

      const sections = ["home", "about", "projects", "writing", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(sections[i]); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isArticlePage]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    if (isArticlePage) { sessionStorage.setItem("scrollTarget", id); navigate("/"); }
    else document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home",     id: "home"     },
    { label: "About",    id: "about"    },
    { label: "Projects", id: "projects" },
    { label: "Writing",  id: "writing"  },
  ];

  /* ── shared island styles ── */
  const islandBase = {
    position: "fixed",
    top: 14,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 9999,
    background: "rgba(10, 10, 14, 0.88)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(255,255,255,0.09)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset",
    transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
  };

  return (
    <>
      {/* ── Desktop island ── */}
      <nav
        className="hidden md:flex items-center gap-1 px-3 py-2"
        style={{ ...islandBase, borderRadius: 100 }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="text-lg font-extrabold tracking-tight px-2 py-1 mr-1"
          style={{
            background: "linear-gradient(135deg, #60a5fa, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          JH
        </button>

        {/* Divider */}
        <span className="w-px h-4 mx-1" style={{ background: "rgba(255,255,255,0.12)" }} />

        {/* Nav links */}
        {navLinks.map(({ label, id }) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200"
            style={{
              color: active === id ? textActive : textInactive,
              background: active === id ? "rgba(255,255,255,0.08)" : "transparent",
            }}
          >
            {label}
          </button>
        ))}

        {/* Divider */}
        <span className="w-px h-4 mx-1" style={{ background: "rgba(255,255,255,0.12)" }} />

        {/* Contact */}
        <button
          onClick={() => scrollTo("contact")}
          className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90"
          style={{
            background: "linear-gradient(135deg, #3b82f6, #6366f1)",
            color: "#fff",
            boxShadow: "0 0 16px rgba(99,102,241,0.35)",
          }}
        >
          Contact
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="flex items-center justify-center w-8 h-8 rounded-full ml-1 transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
          aria-label="Toggle theme"
        >
          {isDark ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>
      </nav>

      {/* ── Mobile island ── */}
      <nav
        className="md:hidden"
        style={{
          ...islandBase,
          borderRadius: menuOpen ? 24 : 100,
          width: menuOpen ? "calc(100vw - 32px)" : "auto",
          maxWidth: 400,
          overflow: "hidden",
        }}
      >
        {/* Collapsed bar */}
        <div className="flex items-center justify-between px-4 py-2.5">
          <button
            onClick={() => scrollTo("home")}
            className="text-lg font-extrabold tracking-tight"
            style={{
              background: "linear-gradient(135deg, #60a5fa, #818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            JH
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="flex items-center justify-center w-7 h-7 rounded-full transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.07)" }}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#facc15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1 p-1.5 rounded-full transition-all duration-200"
              style={{ background: "rgba(255,255,255,0.07)" }}
              aria-label="Toggle menu"
            >
              <span className="block w-4 h-0.5 bg-white transition-all duration-300"
                style={{ transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }} />
              <span className="block w-4 h-0.5 bg-white transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }} />
              <span className="block w-4 h-0.5 bg-white transition-all duration-300"
                style={{ transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </div>

        {/* Expanded menu */}
        {menuOpen && (
          <div
            className="flex flex-col px-3 pb-3 gap-1"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            {navLinks.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-left px-3 py-2.5 text-sm font-medium rounded-xl transition-colors duration-150"
                style={{
                  color: active === id ? textActive : textInactive,
                  background: active === id ? "rgba(255,255,255,0.08)" : "transparent",
                }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="mt-1 py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", color: "#fff" }}
            >
              Contact
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

export default NavBar;
