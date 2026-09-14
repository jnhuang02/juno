import { useState } from "react";
import RocketGame from "./RocketGame";
import UnethicalHoops from "./UnethicalHoops";
import WorldSeriesGame from "./WorldSeriesGame";
import OldFaithful from "./OldFaithful";
import { TypeAnimation } from "react-type-animation";

const GAMES = [
  { id: "rocket",      label: "Bust down the ap" },
  { id: "hoops",       label: "Unethical hoops" },
  { id: "worldseries", label: "Game 5, World Series" },
  { id: "oldfaithful", label: "Old Faithful" },
];

const STATS = [
  { value: "3+", label: "Years writing code" },
  { value: "10+", label: "Projects shipped" },
  { value: "UCLA", label: "MS Applied Stats" },
];

const NavArrow = ({ dir, onClick, label }) => (
  <button
    onClick={onClick}
    aria-label={label}
    style={{
      width: 28,
      height: 28,
      display: "grid",
      placeItems: "center",
      background: "transparent",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius)",
      color: "var(--text-secondary)",
      transition: "color 0.18s ease, border-color 0.18s ease",
    }}
    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; e.currentTarget.style.borderColor = "var(--border-strong)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
  >
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {dir === "prev"
        ? <path d="M15 19l-7-7 7-7" />
        : <path d="M9 5l7 7-7 7" />}
    </svg>
  </button>
);

const Home = () => {
  const [gameIdx, setGameIdx] = useState(0);
  const prev = () => setGameIdx((i) => (i - 1 + GAMES.length) % GAMES.length);
  const next = () => setGameIdx((i) => (i + 1) % GAMES.length);

  return (
    <div
      style={{
        background: "var(--bg-primary)",
        paddingTop: 140,
        paddingBottom: "var(--section-y)",
        transition: "background 0.25s ease",
      }}
    >
      <div className="shell">
        <div className="hero-grid">
          {/* ── Statement ── */}
          <div>
            <p className="label">Portfolio — Los Angeles, CA</p>

            <h1 className="display-xl" style={{ marginTop: 26 }}>
              Justin Huang builds
              <span className="serif" style={{ fontStyle: "italic" }}>
                {" "}
                software and stories
              </span>
              {" "}
              from messy data.
            </h1>

            <p className="lead" style={{ marginTop: 28, maxWidth: 560 }}>
              A statistics graduate student at UCLA and a computer science graduate of
              UC San Diego. I work on automation and machine learning, and I write
              about the parts of the work that do not fit in a spreadsheet.
            </p>

            {/* Role ticker */}
            <p className="meta" style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-block", width: 5, height: 5, background: "var(--accent-line)", borderRadius: 1 }} />
              <TypeAnimation
                sequence={[
                  "Developer", 1400,
                  "Student", 1400,
                  "Musician", 1400,
                  "Data Scientist", 1400,
                  "Analyst", 1400,
                ]}
                wrapper="span"
                speed={55}
                repeat={Infinity}
                style={{ fontFamily: "var(--font-mono)", color: "var(--accent-alt)" }}
              />
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 34, flexWrap: "wrap" }}>
              <a
                href="mailto:huangjustinn@gmail.com"
                className="btn btn-primary btn-mono"
              >
                Get in touch
              </a>
              <button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="btn btn-outline btn-mono"
              >
                See the work
              </button>
            </div>

            {/* Stats — hairline divided, MLCommons data-row feel */}
            <dl className="hero-stats">
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <dt
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: 500,
                      letterSpacing: "-0.03em",
                      color: "var(--text-primary)",
                    }}
                  >
                    {value}
                  </dt>
                  <dd className="label" style={{ margin: "6px 0 0" }}>{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Playable panel ── */}
          <div className="console">
            <div className="console__bar">
              <span className="label">{GAMES[gameIdx].label}</span>
              <span style={{ display: "flex", gap: 6 }}>
                <NavArrow dir="prev" onClick={prev} label="Previous project" />
                <NavArrow dir="next" onClick={next} label="Next project" />
              </span>
            </div>

            <div className="console__screen">
              {gameIdx === 0 ? <RocketGame />
                : gameIdx === 1 ? <UnethicalHoops />
                : gameIdx === 2 ? <WorldSeriesGame />
                : <OldFaithful />}
            </div>

            <div className="console__foot">
              <span className="label">
                {String(gameIdx + 1).padStart(2, "0")} / {String(GAMES.length).padStart(2, "0")}
              </span>
              <span style={{ display: "flex", gap: 5 }} aria-hidden="true">
                {GAMES.map((g, i) => (
                  <span
                    key={g.id}
                    style={{
                      width: i === gameIdx ? 16 : 6,
                      height: 3,
                      background: i === gameIdx ? "var(--accent-line)" : "var(--border-subtle)",
                      transition: "width 0.25s ease, background 0.25s ease",
                    }}
                  />
                ))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
