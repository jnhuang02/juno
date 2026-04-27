import React, { useState, useEffect } from "react";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Highlight the active section based on scroll position
      const sections = ["home", "about", "projects", "contact"];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Projects", id: "projects" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(8, 12, 24, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="text-2xl font-extrabold tracking-tight"
          style={{
            background: "linear-gradient(135deg, #60a5fa, #818cf8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          JH
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center space-x-1">
          {navLinks.map(({ label, id }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg"
                style={{
                  color: active === id ? "#fff" : "rgba(255,255,255,0.55)",
                }}
              >
                {label}
                {active === id && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #60a5fa, #818cf8)",
                    }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Contact Button */}
        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full transition-all duration-200 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #3b82f6, #6366f1)",
            color: "#fff",
            boxShadow: "0 0 20px rgba(99,102,241,0.3)",
          }}
        >
          Contact
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-5 h-0.5 bg-white transition-all duration-300"
            style={{ transform: menuOpen ? "translateY(8px) rotate(45deg)" : "none" }}
          />
          <span
            className="block w-5 h-0.5 bg-white transition-all duration-300"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-0.5 bg-white transition-all duration-300"
            style={{ transform: menuOpen ? "translateY(-8px) rotate(-45deg)" : "none" }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-2"
          style={{
            background: "rgba(8, 12, 24, 0.97)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-left py-3 text-base font-medium text-gray-300 hover:text-white border-b border-white/5 transition-colors duration-150"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            className="mt-2 py-3 rounded-full font-semibold text-white text-sm"
            style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
          >
            Contact
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
