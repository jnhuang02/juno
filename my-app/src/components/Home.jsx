import React, { useState } from "react";
import RocketGame from "./RocketGame";
import UnethicalHoops from "./UnethicalHoops";
import { TypeAnimation } from "react-type-animation";
import resumePdf from "../assets/huang_resume.pdf";
import { useTheme } from "../ThemeContext";

const GAMES = [
  { id: "rocket",  label: "BUST DOWN THE AP" },
  { id: "hoops",   label: "UNETHICAL HOOPS"  },
];

const arrowBtn = {
  background: "rgba(255,255,255,0.06)",
  border: "2px solid rgba(255,255,255,0.14)",
  color: "#a5b4fc",
  fontFamily: "monospace",
  fontWeight: 900,
  fontSize: 15,
  width: 30,
  height: 30,
  cursor: "pointer",
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  transition: "background 0.15s",
};

const Home = () => {
  const { isDark } = useTheme();
  const [gameIdx, setGameIdx] = useState(0);
  const prev = () => setGameIdx(i => (i - 1 + GAMES.length) % GAMES.length);
  const next = () => setGameIdx(i => (i + 1) % GAMES.length);

  return (
    <div
      className="relative flex flex-col w-full items-center justify-center min-h-screen text-white pt-24 pb-20 overflow-hidden"
      style={{ background: "var(--bg-primary)", transition: "background 0.3s ease" }}
    >
      {/* Ambient glow orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: "500px",
            height: "500px",
            top: "-100px",
            right: "-80px",
            background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: "400px",
            height: "400px",
            bottom: "80px",
            left: "-100px",
            background: "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)",
          }}
        />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between px-6 gap-16 relative z-10">
        {/* Left — Text */}
        <div className="max-w-xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 mb-6">
            <span
              className="w-8 h-px"
              style={{ background: "linear-gradient(90deg, #3b82f6, transparent)" }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "#60a5fa" }}
            >
              Portfolio
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.08] tracking-tight">
            Hey, I'm{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #60a5fa 0%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Justin
            </span>
          </h1>

          <h2 className="mt-4 text-2xl md:text-3xl font-bold text-gray-400">
            I'm a{" "}
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
              style={{
                background: "linear-gradient(135deg, #60a5fa, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            />
          </h2>

          <p className="mt-6 text-base md:text-lg text-gray-400 leading-relaxed max-w-md mx-auto lg:mx-0">
            Passionate about leveraging technology to solve real-world problems. 
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a href="mailto:huangjustinn@gmail.com">
              <button
                className="px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                  boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
                  color: "#fff",
                }}
              >
                Hire Me
              </button>
            </a>
            <a href={resumePdf} download="huang_resume.pdf">
              <button
                className="px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105"
                style={{
                  color: "#60a5fa",
                  border: "1px solid rgba(96,165,250,0.35)",
                  background: "rgba(96,165,250,0.05)",
                }}
              >
                Download CV
              </button>
            </a>
          </div>

          {/* Stats row */}
          <div className="mt-12 flex gap-8 justify-center lg:justify-start">
            {[
              { value: "3+", label: "Years Coding" },
              { value: "10+", label: "Projects Built" },
              { value: "UCLA", label: "Grad School" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center lg:text-left">
                <p
                  className="text-2xl font-extrabold"
                  style={{
                    background: "linear-gradient(135deg, #60a5fa, #818cf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {value}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Game selector */}
        <div className="flex-shrink-0 flex flex-col items-center">
          {/* NES-style selector */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <button style={arrowBtn} onClick={prev} aria-label="Previous game">◄</button>
            <div style={{ minWidth: 180, textAlign: "center" }}>
              <p style={{
                fontFamily: "monospace", fontWeight: 900, fontSize: 11,
                color: "#a5b4fc", letterSpacing: 3, margin: 0, textTransform: "uppercase",
              }}>
                {GAMES[gameIdx].label}
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 5 }}>
                {GAMES.map((_, i) => (
                  <div key={i} style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: i === gameIdx ? "#818cf8" : "rgba(255,255,255,0.2)",
                    transition: "background 0.2s",
                  }} />
                ))}
              </div>
            </div>
            <button style={arrowBtn} onClick={next} aria-label="Next game">►</button>
          </div>

          {/* Game frame */}
          <div
            className="rounded-2xl p-1"
            style={{
              background: "linear-gradient(135deg, rgba(96,165,250,0.2), rgba(129,140,248,0.2))",
              boxShadow: "0 0 60px rgba(99,102,241,0.15)",
            }}
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: isDark ? "rgba(14,21,37,0.8)" : "rgba(230,236,255,0.85)" }}
            >
              {gameIdx === 0 ? <RocketGame /> : <UnethicalHoops />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
