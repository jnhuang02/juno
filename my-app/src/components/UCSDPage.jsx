import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FadeIn from "./FadeIn";
import NavBar from "./navbar";
import { useTheme } from "../ThemeContext";

const BLUE = "#006A96";
const GOLD = "#C69214";
const DARK = "#04101a";

// Drop in a campus photo here to enable the hero banner, e.g.:
import ucsdImg from "../imgs/ucsdIMG.png";
const BANNER_IMG = ucsdImg;

const COURSE_GROUPS = [
  {
    category: "Computer Science",
    courses: [
      { code: "CSE 100",  name: "Advanced Data Structures",    desc: "Red-black trees, tries, skip lists, union-find, advanced sorting algorithms." },
      { code: "CSE 101",  name: "Design & Analysis of Algorithms", desc: "Divide-and-conquer, dynamic programming, greedy algorithms, graph theory, NP-completeness." },
      { code: "CSE 105",  name: "Theory of Computability",         desc: "Mathematical theory of computability, Formal languages, Finite automata and regular expressions, Push-down automata and context-free languages, Computable or recursive functions: Turing machines, the halting problem. " },
    ],
  },
  {
    category: "Machine Learning & Data Science",
    courses: [
      {code: "Math 173A",  name: "Optimization in Data Science", desc: "Convexity: convex sets, convex functions, geometry of hyperplanes, support functions for convex sets, hyperplanes and support vector machines, linear and quadratic programming: optimality conditions, duality, primal and dual forms of linear support vector machines, active-set methods; interior methods." },
      { code: "Math 189", name: "Exploratory Data and Inference", desc: "Regression, classification, neural networks, SVMs, unsupervised learning." },
      { code: "CSE 158",  name: "Recommender Systems & Web Mining",   desc: "Collaborative filtering, latent factor models, sentiment analysis, web-scale data." },
      { code: "DSC 80",   name: "Practice of Data Science",          desc: "Data wrangling, exploratory analysis, feature engineering, and model evaluation." },
      { code: "DSC 106",  name: "Introduction to Data Visualization",    desc: "Computer Graphics, human-computer interaction, cognitive psychology, design, statistical graphics and synthesizes relevant ideas, Visualization Systems (D3)" },
    ],
  },
  {
    category: "Mathematics & Economics",
    icon: "📐",
    courses: [
      {code: "MATH 114",  name: "Introduction to Computational Stochastics", desc: "Random number generators, variance reduction, Monte Carlo (including Markov Chain Monte Carlo) simulation, and numerical methods for stochastic differential equations" },
      { code: "MATH 180A", name: "Introduction to Probability",  desc: "Probability spaces, random variables, distributions, and limit theorems." },
      { code: "MATH 181A",  name: "Introduction to Mathematical Statistics I",          desc: "Multivariate distribution, functions of random variables, distributions related to normal. Parameter estimation, method of moments, maximum likelihood. Estimator accuracy and confidence intervals. Hypothesis testing, type I and type II errors, power, one-sample t-test" },
      { code: "ECON 120B", name: "Econometrics B",             desc: "Basic econometric methods, including the linear regression, hypothesis testing, quantifying uncertainty using confidence intervals, and distinguishing correlation from causality." },
      { code: "MGT 180", name: "Business Finance",            desc: "Discounted cash flow, capital budgeting, bond and stock valuation, portfolio theory, market efficiency, the Capital Asset Pricing Model (CAPM), the determinants of capital structure and options" },
    ],
  },
];

const ACTIVITIES = [
  {
    title: "ACM @ UCSD",
    org: "Mentor Lead",
    desc: "Attended and hosted technical workshops on algorithms, collaborated on open-source side projects with other CS students.",
    tags: ["Algorithms", "Open Source", "Full Stack Programming"],
  },
  {
    title: "Recruitment Chair",
    org: "Computer Science and Engineering Student Society",
    desc: "Built end-to-end CS projects on real-world datasets, presented findings to peers, and mentored underclassmen in Python and machine learning fundamentals. Increase club size by 40 percent in one year with targeted outreach and on campus advertising campaigns.",
    tags: ["Python", "ML", "Mentorship", "Projects", "Communication", "Leadership"],
  },
];

const MINORS = [
  { name: "Data Science", desc: "Probabilistic modeling, data engineering, machine learning pipelines, and statistical inference at scale." },
  { name: "Business Economics", desc: "Microeconomic theory, game theory, corporate finance fundamentals, and quantitative business strategy." },
];

function useCounter(target, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      let n = 0;
      const steps = 50;
      const inc = target / steps;
      const id = setInterval(() => {
        n += inc;
        if (n >= target) { setVal(target); clearInterval(id); }
        else setVal(Math.floor(n));
      }, 1000 / steps);
      return () => clearInterval(id);
    }, delay);
    return () => clearTimeout(t);
  }, [target, delay]);
  return val;
}

function CourseCard({ course }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? `${BLUE}10` : "var(--bg-card)",
        border: `1px solid ${hov ? BLUE + "55" : "var(--border-subtle)"}`,
        borderRadius: 14, padding: "18px 20px",
        transition: "all 0.25s",
        transform: hov ? "translateY(-2px)" : "none",
        boxShadow: hov ? `0 6px 24px ${BLUE}18` : "none",
      }}
    >
      <span style={{
        display: "inline-block", marginBottom: 8,
        background: `${BLUE}18`, border: `1px solid ${BLUE}35`,
        color: BLUE, fontSize: 10, fontWeight: 700, letterSpacing: 1,
        padding: "2px 8px", borderRadius: 100,
      }}>{course.code}</span>
      <p style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: 14, margin: "0 0 6px" }}>{course.name}</p>
      <p style={{ color: "var(--text-secondary)", fontSize: 12, lineHeight: 1.65, margin: 0 }}>{course.desc}</p>
    </div>
  );
}

export default function UCSDPage() {
  const navigate  = useNavigate();
  useTheme(); // subscribe to theme changes
  const courses   = useCounter(13, 400);
  const gpa       = useCounter(38, 600);

  const goBack = () => {
    sessionStorage.setItem("scrollTarget", "about");
    navigate("/");
  };

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", transition: "background 0.3s ease" }}>
      <NavBar />

      {/* Sticky back */}
      <button
        onClick={goBack}
        style={{
          position: "fixed", top: 20, left: 20, zIndex: 9999,
          background: "rgba(4,16,26,0.88)", backdropFilter: "blur(12px)",
          border: `1px solid ${BLUE}40`, color: GOLD,
          fontWeight: 700, fontSize: 13, padding: "8px 18px",
          borderRadius: 100, cursor: "pointer", display: "flex",
          alignItems: "center", gap: 8, transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.background = `${BLUE}25`; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = `${BLUE}40`; e.currentTarget.style.background = "rgba(4,16,26,0.88)"; }}
      >← Portfolio
      </button>

      {/* ── Hero ── always dark regardless of theme */}
      <div style={{
        position: "relative", minHeight: "75vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        overflow: "hidden", padding: "90px 24px 60px",
        background: DARK, color: "#fff",
      }}>
        <div style={{ position: "absolute", top: -100, left: -100, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${BLUE}28 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, right: -80, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}18 0%, transparent 70%)`, pointerEvents: "none" }} />
        {BANNER_IMG && (
          <img
            src={BANNER_IMG}
            alt=""
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
              opacity: 0.18, filter: "blur(4px)", transform: "scale(1)",
              pointerEvents: "none", userSelect: "none",
            }}
          />
        )}
        <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 840 }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28,
            background: `${BLUE}18`, border: `1px solid ${BLUE}40`, borderRadius: 100, padding: "8px 22px",
          }}>
            <span style={{ fontSize: 18 }}>🔱</span>
            <span style={{ color: BLUE, fontWeight: 700, fontSize: 11, letterSpacing: 3, textTransform: "uppercase" }}>
              University of California, San Diego
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(34px, 6vw, 66px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "0 0 12px" }}>
            Bachelor of Science in{" "}
            <span style={{ background: `linear-gradient(135deg, ${BLUE}, ${GOLD})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Math-Computer Science
            </span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, margin: "0 0 8px" }}>
            Minor in Data Science · Minor in Business-Economics
          </p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, margin: "0 0 24px" }}>2020 – 2024 · La Jolla, California</p>

          {/* Stat cards */}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 16 }}>
            {[
              { label: "Courses", value: `${courses}+` },
              { label: "Minors", value: "2" },
              { label: "Graduated", value: "2024" },
              { label: "City", value: "La Jolla" },
            ].map(({ label, value }) => (
              <div
                key={label}
                onMouseEnter={e => { e.currentTarget.style.background = `${BLUE}20`; e.currentTarget.style.borderColor = `${BLUE}60`; e.currentTarget.style.transform = "translateY(-3px) scale(1.04)"; e.currentTarget.style.boxShadow = `0 8px 24px ${BLUE}25`; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                style={{
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 16, padding: "20px 28px", minWidth: 110, textAlign: "center",
                  transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)", cursor: "default",
                }}>
                <p style={{ color: "#fff", fontWeight: 900, fontSize: 22, margin: "0 0 4px" }}>{value}</p>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ position: "absolute", bottom: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <p style={{ color: "#ffffff", fontSize: 10, letterSpacing: 3, textTransform: "uppercase", margin: 0 }}>Scroll to explore</p>
          <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, ${BLUE}, transparent)` }} />
        </div>
      </div>


      {/* ── Content ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px 120px" }}>

        {/* Overview */}
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ display: "block", width: 32, height: 1, background: `linear-gradient(90deg, transparent, ${BLUE})` }} />
              <span style={{ color: BLUE, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em" }}>Undergraduate Journey</span>
              <span style={{ display: "block", width: 32, height: 1, background: `linear-gradient(90deg, ${BLUE}, transparent)` }} />
            </div>
            <h2 style={{ color: "var(--text-primary)", fontSize: 38, fontWeight: 800, margin: "0 0 20px", letterSpacing: "-0.02em" }}>Four Years at UC San Diego</h2>
            <div style={{ width: 56, height: 3, background: `linear-gradient(90deg, ${BLUE}, ${GOLD})`, borderRadius: 100, margin: "0 auto 24px" }} />
            <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.85, maxWidth: 680, margin: "0 auto" }}>
              My undergraduate years at UCSD were where I discovered my passion for building intelligent systems. Blending rigorous mathematics with computer science and economic theory gave me a uniquely cross-disciplinary perspective 
            </p>
          </div>
        </FadeIn>

        {/* Minors */}
        <FadeIn delay={80}>
          <div style={{ marginBottom: 64 }}>
            <h3 style={{ color: "var(--text-primary)", fontSize: 22, fontWeight: 800, textAlign: "center", margin: "0 0 24px" }}>Areas of Specialization</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
              {MINORS.map(m => (
                <div key={m.name} style={{
                  background: `linear-gradient(135deg, ${BLUE}12, ${GOLD}08)`,
                  border: `1px solid ${BLUE}30`, borderRadius: 16, padding: "24px 28px",
                  display: "flex", alignItems: "flex-start", gap: 16,
                }}>
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{m.icon}</span>
                  <div>
                    <p style={{ color: GOLD, fontWeight: 800, fontSize: 16, margin: "0 0 8px" }}>Minor in {m.name}</p>
                    <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Coursework */}
        <FadeIn delay={120}>
          <div style={{ marginBottom: 80 }}>
            <h3 style={{ color: "var(--text-primary)", fontSize: 28, fontWeight: 800, textAlign: "center", margin: "0 0 40px" }}>Coursework</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              {COURSE_GROUPS.map(g => (
                <div key={g.category}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                    <span>{g.icon}</span>
                    <span style={{ color: BLUE, fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.18em" }}>{g.category}</span>
                    <div style={{ flex: 1, height: 1, background: `${BLUE}30` }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 14 }}>
                    {g.courses.map(c => <CourseCard key={c.code} course={c} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Activities */}
        <FadeIn delay={180}>
          <div style={{ marginBottom: 80 }}>
            <h3 style={{ color: "var(--text-primary)", fontSize: 28, fontWeight: 800, textAlign: "center", margin: "0 0 32px" }}>Activities & Leadership</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
              {ACTIVITIES.map(a => (
                <div
                  key={a.title}
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: 16, padding: "24px", transition: "all 0.25s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${BLUE}50`; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 32px ${BLUE}18`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <span style={{ fontSize: 24 }}>{a.icon}</span>
                    <div>
                      <p style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: 15, margin: 0 }}>{a.title}</p>
                      <p style={{ color: BLUE, fontSize: 12, fontWeight: 600, margin: 0 }}>{a.org}</p>
                    </div>
                  </div>
                  <p style={{ color: "var(--text-secondary)", fontSize: 13, lineHeight: 1.7, margin: "0 0 14px" }}>{a.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {a.tags.map(t => (
                      <span key={t} style={{ background: `${BLUE}14`, border: `1px solid ${BLUE}28`, color: BLUE, fontSize: 10, fontWeight: 600, padding: "2px 9px", borderRadius: 100 }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Back CTA */}
        <FadeIn delay={240}>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={goBack}
              style={{
                background: `linear-gradient(135deg, ${BLUE}, #004d70)`,
                border: "none", color: "#fff", fontWeight: 700, fontSize: 14,
                padding: "14px 36px", borderRadius: 100, cursor: "pointer",
                boxShadow: `0 8px 32px ${BLUE}40`, transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = `0 12px 40px ${BLUE}55`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 8px 32px ${BLUE}40`; }}
            >← Back to Portfolio
            </button>
          </div>
        </FadeIn>

      </div>
    </div>
  );
}
