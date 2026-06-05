import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FadeIn from "./FadeIn";
import NavBar from "./navbar";
import { useTheme } from "../ThemeContext";

const BLUE  = "#2774AE";
const GOLD  = "#FFD100";
const DARK  = "#040d1a";

// Drop in a campus photo here to enable the hero banner, e.g.:
import uclaImg from "../imgs/uclaIMG.jpg";
const BANNER_IMG = uclaImg;


const COURSE_GROUPS = [
  {
    category: "Core Theory",
    icon: "",
    courses: [
      { code: "STATS 400", name: "Introduction to Probability Models",        desc: "Probability theory, probability models, and stochastic processes, with emphasis on concepts, intuitions, calculations, and real applications" },
      { code: "STATS 403", name: "Mathematical Statistics",   desc: "A rigorous study of mathematical statistics covering random variables, distributions, estimation, and statistical inference, with formal proofs grounding concepts like the Central Limit Theorem in real-world applications across science, economics, and data analysis" },
      { code: "STATS 404", name: "Statistical Computing and Programming", desc: "random variables, probability distributions, estimation, and statistical inference, with rigorous proofs of foundational theorems including the Central Limit Theorem and their applications to real-world data analysis" },
      { code: "STATS 421", name: "Advanced Statistical Communication",  desc: "Course focused on strengthening verbal and written communication of statistical concepts and results in professional workplace settings," },
    ],
  },
  {
    category: "Machine Learning",
    icon: "",
    courses: [
      { code: "STATS 413", name: "Statistical Machine Learning", desc: "Course exploring modern machine learning and AI methods, including deep learning, neural networks, RLHF, tree-based boosting, and support vector machines, with hands-on implementation in Python and PyTorch" },
      { code: "STATS 414",    name: "Large Language Models",        desc: "Course covering the full machine learning pipeline, from foundational classification techniques like logistic regression to advanced topics including regularization, PCA, clustering, and reinforcement learning" },
      { code: "STATS 426", name: "Deep Learning",        desc: "Course bridging statistical theory and deep learning practice, covering neural network fundamentals and modern architectures with hands-on PyTorch implementation for statistical applications" },
    ],
  },
  {
    category: "Applied Methods",
    courses: [
      { code: "STATS 404",   name: "Data Management",  desc: "Course covering the full data management pipeline from cleaning, validation, and transformation to exploratory analysis and visualization by using tools including Python, SQL, R, SAS, and Stata, with attention to data security and ethics" },
      { code: "STATS 419", name: "Experimental Design",  desc: "Course on experimental design principles, covering randomization, blocking, factorial and fractional factorial designs, Latin squares, and response surface methods to maximize information while minimizing costs" },
      { code: "STATS  425", name: "Large Language Models in Text Mining", desc: "Course exploring large language model architectures, fine-tuning, and deployment, with hands-on projects applying LLMs to real-world text mining tasks." },
    ],
  },
];

const ACTIVITIES = [
  {
    title: "Graduate Researcher",
    org: "UCLA Statistics Department",
    desc: "Conducting thesis research on evaluating and aligning large language models in coding, reasoning, hallucination, problem solving domains. Thesis advisor is Professor Yingnian Wu",
    tags: ["LLMs", "Research", "NLP"],
  },
  {
    title: "Diversity Equity and Inclusion, Graduate Student Representative",
    org: "Graduate Student Association",
    desc: "Monthly or biweekly discussing DEI initiatives with university leadership and advocating for graduate student needs and concerns.",
    tags: ["Diversity", "Representation", "Community"],
  },
  {
    icon: "🎓",
    title: "Committee on Data Information, Technology, and Privacy, Graduate Student Representative",
    org: "UCLA GSA",
    desc: "Grad student representative for university comittee protecting data privacy and security of students, reviewing campus policies on data governance, cybersecurity, and emerging technologies.",
    tags: ["Community", "Data Privacy", "Policy"],
  },
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

function ThesisCard({ blue, gold }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ marginBottom: 80 }}>
      <h3 style={{ color: "var(--text-primary)", fontSize: 28, fontWeight: 800, textAlign: "center", margin: "0 0 32px" }}>Thesis Research</h3>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: "relative", overflow: "hidden", cursor: "default",
          background: hov
            ? `linear-gradient(135deg, ${blue}20, ${gold}12)`
            : `linear-gradient(135deg, ${blue}12, ${gold}08)`,
          border: `1px solid ${hov ? blue + "70" : blue + "35"}`,
          borderRadius: 20, padding: "36px 40px",
          transform: hov ? "translateY(-3px)" : "none",
          boxShadow: hov ? `0 16px 48px ${blue}25` : "none",
          transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: hov ? 6 : 4, height: "100%",
          background: `linear-gradient(to bottom, ${blue}, ${gold})`,
          transition: "width 0.3s ease",
        }} />
        <div style={{ paddingLeft: 12 }}>
          <span style={{
            display: "inline-block", marginBottom: 14,
            background: `${gold}20`, border: `1px solid ${gold}45`,
            color: "#b8860b", fontSize: 10, fontWeight: 700, letterSpacing: 2,
            textTransform: "uppercase", padding: "4px 12px", borderRadius: 100,
            transition: "background 0.2s",
          }}>M.S. Thesis</span>
          <h4 style={{ color: "var(--text-primary)", fontWeight: 800, fontSize: 22, margin: "0 0 14px" }}>
            Evaluating Large Language Models
          </h4>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.85, margin: "0 0 20px", maxWidth: 700 }}>
            Looking at the reliability and calibration of large language models. Benchmarked GPT-4, Gemini Pro, Claude, and Grok across 5 knowledge domains using 2K+ prompts and 7 statistical metrics, analyzing model reliability, reasoning, and hallucination rates across coding, problem-solving, and consistency tasks.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["LLMs", "NLP", "Alignment", "Evaluation", "Python", "HuggingFace", "RAG"].map(t => (
              <span key={t} style={{
                background: hov ? `${blue}28` : `${blue}18`,
                border: `1px solid ${hov ? blue + "55" : blue + "35"}`,
                color: blue, fontSize: 11, fontWeight: 600,
                padding: "4px 12px", borderRadius: 100,
                transition: "all 0.2s",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UCLAPage() {
  const navigate = useNavigate();
  useTheme(); // subscribe to theme changes
  const courses  = useCounter(10, 400);
  const year     = useCounter(2026, 600);

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
          background: "rgba(10,10,14,0.88)", backdropFilter: "blur(12px)",
          border: `1px solid ${BLUE}40`, color: GOLD,
          fontWeight: 700, fontSize: 13, padding: "8px 18px",
          borderRadius: 100, cursor: "pointer", display: "flex",
          alignItems: "center", gap: 8, transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.background = `${BLUE}25`; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = `${BLUE}40`; e.currentTarget.style.background = "rgba(10,10,14,0.88)"; }}
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
        <div style={{ position: "absolute", top: -120, left: -120, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${BLUE}28 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, right: -80, width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${GOLD}18 0%, transparent 70%)`, pointerEvents: "none" }} />
        {BANNER_IMG && (
          <img
            src={BANNER_IMG}
            alt=""
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
              opacity: 0.18, filter: "blur(4px)", transform: "scale(1.15)",
              pointerEvents: "none", userSelect: "none",
            }}
          />
        )}
        <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 820 }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28,
            background: `${BLUE}18`, border: `1px solid ${BLUE}40`, borderRadius: 100, padding: "8px 22px",
          }}>
            <span style={{ fontSize: 18 }}>🐻</span>
            <span style={{ color: BLUE, fontWeight: 700, fontSize: 11, letterSpacing: 3, textTransform: "uppercase" }}>
              University of California, Los Angeles
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "0 0 12px" }}>
            Master of Science in{" "}
            <span style={{ background: `linear-gradient(135deg, ${BLUE}, ${GOLD})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Applied Statistics
            </span>
          </h1>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 22, margin: "0 0 10px" }}>& Data Science</p>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, margin: "0 0 24px" }}>2024 – Present · Los Angeles, California</p>

          {/* Stat cards */}
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 16 }}>
            {[
              { label: "Courses", value: `${courses}+` },
              { label: "Grad Year", value: year },
              { label: "Focus", value: "LLMs & ML" },
              { label: "City", value: "Los Angeles" },
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

        {/* Scroll hint */}
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
              <span style={{ color: BLUE, fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em" }}>Academic Journey</span>
              <span style={{ display: "block", width: 32, height: 1, background: `linear-gradient(90deg, ${BLUE}, transparent)` }} />
            </div>
            <h2 style={{ color: "var(--text-primary)", fontSize: 38, fontWeight: 800, margin: "0 0 20px", letterSpacing: "-0.02em" }}>Graduate Studies at UCLA</h2>
            <div style={{ width: 56, height: 3, background: `linear-gradient(90deg, ${BLUE}, ${GOLD})`, borderRadius: 100, margin: "0 auto 24px" }} />
            <p style={{ color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.85, maxWidth: 680, margin: "0 auto" }}>
              At UCLA, I am deepening my expertise at rigorous statistical theory and modern machine learning. My graduate work focuses on LLM evaluation, Machine Learning research, and developing reliable AI systems, turning mathematical foundations into real-world solutions.
            </p>
          </div>
        </FadeIn>

        {/* Coursework */}
        <FadeIn delay={100}>
          <div style={{ marginBottom: 80 }}>
            <h3 style={{ color: "var(--text-primary)", fontSize: 28, fontWeight: 800, textAlign: "center", margin: "0 0 40px" }}>Coursework</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
              {COURSE_GROUPS.map((g) => (
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

        {/* Research */}
        <FadeIn delay={150}>
          <ThesisCard blue={BLUE} gold={GOLD} />
        </FadeIn>

        {/* Activities */}
        <FadeIn delay={200}>
          <div style={{ marginBottom: 80 }}>
            <h3 style={{ color: "var(--text-primary)", fontSize: 28, fontWeight: 800, textAlign: "center", margin: "0 0 32px" }}>Campus Life</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
              {ACTIVITIES.map((a) => (
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
        <FadeIn delay={250}>
          <div style={{ textAlign: "center" }}>
            <button
              onClick={goBack}
              style={{
                background: `linear-gradient(135deg, ${BLUE}, #1a5fa0)`,
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
