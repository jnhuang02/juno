import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FadeIn from "./FadeIn";
import NavBar from "./navbar";
import BlurText from "./reactbits/BlurText";
import CountUp from "./reactbits/CountUp";

import uclaImg from "../imgs/uclaIMG.jpg";

const UCLA_BLUE = "#2774AE";
const UCLA_GOLD = "#FFD100";

const COURSE_GROUPS = [
  {
    category: "Core Theory",
    courses: [
      { code: "STATS 400", name: "Introduction to Probability Models", desc: "Probability theory, probability models, and stochastic processes, with emphasis on concepts, intuitions, calculations, and real applications" },
      { code: "STATS 403", name: "Mathematical Statistics", desc: "A rigorous study of mathematical statistics covering random variables, distributions, estimation, and statistical inference, with formal proofs grounding concepts like the Central Limit Theorem in real-world applications across science, economics, and data analysis" },
      { code: "STATS 404", name: "Statistical Computing and Programming", desc: "Random variables, probability distributions, estimation, and statistical inference, with rigorous proofs of foundational theorems including the Central Limit Theorem and their applications to real-world data analysis" },
      { code: "STATS 421", name: "Advanced Statistical Communication", desc: "Strengthening verbal and written communication of statistical concepts and results in professional workplace settings" },
    ],
  },
  {
    category: "Machine Learning",
    courses: [
      { code: "STATS 413", name: "Statistical Machine Learning", desc: "Modern machine learning and AI methods, including deep learning, neural networks, RLHF, tree-based boosting, and support vector machines, with hands-on implementation in Python and PyTorch" },
      { code: "STATS 414", name: "Large Language Models", desc: "The full machine learning pipeline, from foundational classification techniques like logistic regression to regularization, PCA, clustering, and reinforcement learning" },
      { code: "STATS 426", name: "Deep Learning", desc: "Bridging statistical theory and deep learning practice, covering neural network fundamentals and modern architectures with hands-on PyTorch implementation" },
    ],
  },
  {
    category: "Applied Methods",
    courses: [
      { code: "STATS 404", name: "Data Management", desc: "The full data management pipeline from cleaning, validation, and transformation to exploratory analysis and visualization using Python, SQL, R, SAS, and Stata, with attention to data security and ethics" },
      { code: "STATS 419", name: "Experimental Design", desc: "Experimental design principles covering randomization, blocking, factorial and fractional factorial designs, Latin squares, and response surface methods" },
      { code: "STATS 425", name: "Large Language Models in Text Mining", desc: "Large language model architectures, fine-tuning, and deployment, with hands-on projects applying LLMs to real-world text mining tasks" },
    ],
  },
];

const ACTIVITIES = [
  {
    title: "Graduate Researcher",
    org: "UCLA Statistics Department",
    desc: "Thesis research on evaluating and aligning large language models across coding, reasoning, hallucination, and problem-solving domains. Advisor: Professor Yingnian Wu.",
    tags: ["LLMs", "Research", "NLP"],
  },
  {
    title: "DEI Graduate Student Representative",
    org: "Graduate Student Association",
    desc: "Meeting with university leadership on diversity, equity, and inclusion initiatives and advocating for graduate student needs.",
    tags: ["Diversity", "Representation", "Community"],
  },
  {
    title: "Data, Information, Technology & Privacy Committee",
    org: "UCLA GSA",
    desc: "Graduate student representative reviewing campus policy on data governance, cybersecurity, and emerging technologies.",
    tags: ["Policy", "Data Privacy", "Community"],
  },
];

const STATS = [
  { label: "Courses", count: 10, suffix: "+" },
  { label: "Graduation", count: 2026, from: 2020, duration: 2 },
  { label: "Focus", value: "LLMs & ML" },
  { label: "Location", value: "Los Angeles" },
];

const CourseCard = ({ course, accent }) => (
  <div className="card card-hover" style={{ padding: "18px 20px" }}>
    <span
      className="tag"
      style={{
        borderColor: `color-mix(in srgb, ${accent} 45%, transparent)`,
        color: accent,
      }}
    >
      {course.code}
    </span>
    <p
      style={{
        margin: "14px 0 8px",
        fontSize: "0.9375rem",
        fontWeight: 600,
        letterSpacing: "-0.015em",
        color: "var(--text-primary)",
      }}
    >
      {course.name}
    </p>
    <p style={{ margin: 0, fontSize: "0.8125rem", lineHeight: 1.65, color: "var(--text-secondary)" }}>
      {course.desc}
    </p>
  </div>
);

export default function UCLAPage() {
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const goBack = () => {
    sessionStorage.setItem("scrollTarget", "about");
    navigate("/");
  };

  const accent = UCLA_BLUE;

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", transition: "background 0.25s ease" }}>
      <NavBar />

      {/* ── Hero: ink band ── */}
      <header className="band-ink" style={{ paddingTop: 132, paddingBottom: "clamp(48px, 6vw, 72px)" }}>
        <div className="shell">
          <button
            onClick={goBack}
            className="label"
            style={{ background: "transparent", border: 0, padding: 0, display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            Back to portfolio
          </button>

          <p className="label" style={{ marginTop: 44 }}>Education / University of California, Los Angeles</p>

          <BlurText
            tag="h1"
            className="display-xl"
            style={{ marginTop: 20, maxWidth: 900 }}
            delay={45}
            segments={[
              { text: "Master of Science in" },
              {
                text: "Applied Statistics",
                className: "serif",
                style: { fontStyle: "italic" },
              },
              { text: "& Data Science" },
            ]}
          />

          <p className="lead muted" style={{ marginTop: 24, maxWidth: 620 }}>
            Deepening my work in statistical theory and modern machine learning, with a
            focus on LLM evaluation and reliable AI systems.
          </p>

          <p className="meta" style={{ marginTop: 18 }}>2024 — Present · Los Angeles, California</p>

          <dl className="edu-stats">
            {STATS.map(({ label, count, from, suffix, duration, value }) => (
              <div key={label}>
                <dt className="label">{label}</dt>
                <dd style={{ margin: "8px 0 0", fontSize: "1.35rem", fontWeight: 500, letterSpacing: "-0.03em" }}>
                  {count !== undefined ? (
                    <>
                      <CountUp to={count} from={from ?? 0} duration={duration ?? 1.6} />
                      {suffix}
                    </>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      {/* ── Campus banner ── */}
      <div className="shell" style={{ marginTop: "clamp(40px, 5vw, 64px)" }}>
        <img
          src={uclaImg}
          alt="UCLA campus"
          style={{
            width: "100%",
            aspectRatio: "21 / 9",
            objectFit: "cover",
            display: "block",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border-subtle)",
          }}
        />
      </div>

      <div className="shell" style={{ paddingBottom: "clamp(64px, 8vw, 110px)" }}>
        {/* ── Overview ── */}
        <FadeIn>
          <section className="edu-block">
            <div className="edu-block__head">
              <h2 className="label" style={{ color: "var(--text-primary)" }}>Overview</h2>
              <span className="label">01</span>
            </div>
            <p className="edu-lede">
              At UCLA I am deepening my expertise in rigorous statistical theory and modern
              machine learning. My graduate work focuses on LLM evaluation, machine learning
              research, and developing reliable AI systems — turning mathematical
              foundations into working solutions.
            </p>
          </section>
        </FadeIn>

        {/* ── Coursework ── */}
        <FadeIn delay={80}>
          <section className="edu-block">
            <div className="edu-block__head">
              <h2 className="label" style={{ color: "var(--text-primary)" }}>Coursework</h2>
              <span className="label">02</span>
            </div>
            {COURSE_GROUPS.map((group) => (
              <div key={group.category} style={{ marginBottom: 44 }}>
                <div className="course-group__head">
                  <span className="label" style={{ color: accent }}>{group.category}</span>
                  <span
                    aria-hidden="true"
                    style={{ flex: 1, height: 1, background: "var(--border-subtle)" }}
                  />
                  <span className="label">{String(group.courses.length).padStart(2, "0")}</span>
                </div>
                <div className="course-grid">
                  {group.courses.map((course) => (
                    <CourseCard key={`${group.category}-${course.code}-${course.name}`} course={course} accent={accent} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        </FadeIn>

        {/* ── Thesis ── */}
        <FadeIn delay={120}>
          <section className="edu-block">
            <div className="edu-block__head">
              <h2 className="label" style={{ color: "var(--text-primary)" }}>Thesis research</h2>
              <span className="label">03</span>
            </div>
            <div
              className="card"
              style={{
                padding: "clamp(24px, 3vw, 40px)",
                borderLeft: `2px solid ${accent}`,
                background: "var(--bg-card)",
              }}
            >
              <span className="tag" style={{ borderColor: `color-mix(in srgb, ${UCLA_GOLD} 55%, transparent)`, color: "var(--text-primary)" }}>
                M.S. Thesis
              </span>
              <h3 className="display-md" style={{ margin: "18px 0 14px" }}>
                Evaluating Large Language Models
              </h3>
              <p className="body-text" style={{ margin: 0, maxWidth: 720 }}>
                Looking at the reliability and calibration of large language models.
                Benchmarked GPT-4, Gemini Pro, Claude, and Grok across five knowledge
                domains using 2K+ prompts and seven statistical metrics, analyzing model
                reliability, reasoning, and hallucination rates across coding,
                problem-solving, and consistency tasks.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 24 }}>
                {["LLMs", "NLP", "Alignment", "Evaluation", "Python", "HuggingFace", "RAG"].map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── Activities ── */}
        <FadeIn delay={160}>
          <section className="edu-block">
            <div className="edu-block__head">
              <h2 className="label" style={{ color: "var(--text-primary)" }}>Campus life</h2>
              <span className="label">04</span>
            </div>
            <div className="course-grid">
              {ACTIVITIES.map((a) => (
                <div key={a.title} className="card card-hover" style={{ padding: "22px 24px" }}>
                  <p className="label" style={{ color: accent }}>{a.org}</p>
                  <h3
                    style={{
                      margin: "12px 0 10px",
                      fontSize: "1.0625rem",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: "var(--text-primary)",
                    }}
                  >
                    {a.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.875rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                    {a.desc}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 18 }}>
                    {a.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={200}>
          <button onClick={goBack} className="btn btn-outline btn-mono" style={{ marginTop: 8 }}>
            Back to portfolio
          </button>
        </FadeIn>
      </div>
    </div>
  );
}
