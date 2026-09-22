import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FadeIn from "./FadeIn";
import NavBar from "./navbar";
import BlurText from "./reactbits/BlurText";
import CountUp from "./reactbits/CountUp";

import ucsdImg from "../imgs/ucsdIMG.png";

const UCSD_BLUE = "#006A96";

const COURSE_GROUPS = [
  {
    category: "Computer Science",
    courses: [
      { code: "CSE 100", name: "Advanced Data Structures", desc: "Red-black trees, tries, skip lists, union-find, advanced sorting algorithms." },
      { code: "CSE 101", name: "Design & Analysis of Algorithms", desc: "Divide-and-conquer, dynamic programming, greedy algorithms, graph theory, NP-completeness." },
      { code: "CSE 105", name: "Theory of Computability", desc: "Computability theory, formal languages, finite automata and regular expressions, push-down automata and context-free languages, Turing machines, and the halting problem." },
    ],
  },
  {
    category: "Machine Learning & Data Science",
    courses: [
      { code: "MATH 173A", name: "Optimization in Data Science", desc: "Convex sets and functions, hyperplanes, support vector machines, linear and quadratic programming, duality, active-set and interior methods." },
      { code: "MATH 189", name: "Exploratory Data and Inference", desc: "Regression, classification, neural networks, SVMs, and unsupervised learning." },
      { code: "CSE 158", name: "Recommender Systems & Web Mining", desc: "Collaborative filtering, latent factor models, sentiment analysis, and web-scale data." },
      { code: "DSC 80", name: "Practice of Data Science", desc: "Data wrangling, exploratory analysis, feature engineering, and model evaluation." },
      { code: "DSC 106", name: "Introduction to Data Visualization", desc: "Graphics, human-computer interaction, cognitive psychology, statistical graphics, and visualization systems such as D3." },
    ],
  },
  {
    category: "Mathematics & Economics",
    courses: [
      { code: "MATH 114", name: "Introduction to Computational Stochastics", desc: "Random number generators, variance reduction, Monte Carlo (including Markov Chain Monte Carlo) simulation, and numerical methods for stochastic differential equations." },
      { code: "MATH 180A", name: "Introduction to Probability", desc: "Probability spaces, random variables, distributions, and limit theorems." },
      { code: "MATH 181A", name: "Introduction to Mathematical Statistics I", desc: "Multivariate distributions, functions of random variables, parameter estimation, maximum likelihood, confidence intervals, and hypothesis testing." },
      { code: "ECON 120B", name: "Econometrics B", desc: "Linear regression, hypothesis testing, quantifying uncertainty with confidence intervals, and distinguishing correlation from causality." },
      { code: "MGT 180", name: "Business Finance", desc: "Discounted cash flow, capital budgeting, valuation, portfolio theory, market efficiency, CAPM, capital structure, and options." },
    ],
  },
];

const ACTIVITIES = [
  {
    title: "ACM @ UCSD",
    org: "Mentor Lead",
    desc: "Attended and hosted technical workshops on algorithms, and collaborated on open-source side projects with other computer science students.",
    tags: ["Algorithms", "Open Source", "Full Stack"],
  },
  {
    title: "Recruitment Chair",
    org: "Computer Science and Engineering Student Society",
    desc: "Built end-to-end CS projects on real-world datasets, presented findings to peers, and mentored underclassmen in Python and machine learning fundamentals. Grew the club by 40 percent in one year through targeted outreach and campus campaigns.",
    tags: ["Python", "ML", "Mentorship", "Leadership"],
  },
];

const MINORS = [
  { name: "Data Science", desc: "Probabilistic modeling, data engineering, machine learning pipelines, and statistical inference at scale." },
  { name: "Business Economics", desc: "Microeconomic theory, game theory, corporate finance fundamentals, and quantitative business strategy." },
];

const STATS = [
  { label: "Courses", count: 13, suffix: "+" },
  { label: "Minors", value: "2" },
  { label: "Graduated", count: 2024, from: 2018, duration: 2 },
  { label: "Location", value: "La Jolla" },
];

const CourseCard = ({ course, accent }) => (
  <div className="card card-hover" style={{ padding: "18px 20px" }}>
    <span
      className="tag"
      style={{ borderColor: `color-mix(in srgb, ${accent} 45%, transparent)`, color: accent }}
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

export default function UCSDPage() {
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const goBack = () => {
    sessionStorage.setItem("scrollTarget", "about");
    navigate("/");
  };

  const accent = UCSD_BLUE;

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

          <p className="label" style={{ marginTop: 44 }}>Education / University of California, San Diego</p>

          <BlurText
            tag="h1"
            className="display-xl"
            style={{ marginTop: 20, maxWidth: 900 }}
            delay={45}
            segments={[
              { text: "Bachelor of Science in" },
              {
                text: "Math-Computer Science",
                className: "serif",
                style: { fontStyle: "italic" },
              },
            ]}
          />

          <p className="lead muted" style={{ marginTop: 24, maxWidth: 620 }}>
            Minors in Data Science and Business-Economics — where algorithms,
            probability, and economics first started to fit together.
          </p>

          <p className="meta" style={{ marginTop: 18 }}>2020 — 2024 · La Jolla, California</p>

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
          src={ucsdImg}
          alt="UC San Diego campus"
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
              Four years of algorithms, probability, and applied data work. UCSD is where I
              learned to build systems end to end, and where the mathematics behind machine
              learning stopped being abstract and started being useful.
            </p>
          </section>
        </FadeIn>

        {/* ── Minors ── */}
        <FadeIn delay={60}>
          <section className="edu-block">
            <div className="edu-block__head">
              <h2 className="label" style={{ color: "var(--text-primary)" }}>Areas of specialization</h2>
              <span className="label">02</span>
            </div>
            <div className="course-grid">
              {MINORS.map((m) => (
                <div key={m.name} className="card" style={{ padding: "22px 24px" }}>
                  <h3 className="display-md" style={{ fontSize: "1.15rem", margin: 0 }}>{m.name}</h3>
                  <p style={{ margin: "12px 0 0", fontSize: "0.9rem", lineHeight: 1.7, color: "var(--text-secondary)" }}>
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* ── Coursework ── */}
        <FadeIn delay={100}>
          <section className="edu-block">
            <div className="edu-block__head">
              <h2 className="label" style={{ color: "var(--text-primary)" }}>Coursework</h2>
              <span className="label">03</span>
            </div>
            {COURSE_GROUPS.map((group) => (
              <div key={group.category} style={{ marginBottom: 44 }}>
                <div className="course-group__head">
                  <span className="label" style={{ color: accent }}>{group.category}</span>
                  <span aria-hidden="true" style={{ flex: 1, height: 1, background: "var(--border-subtle)" }} />
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

        {/* ── Activities ── */}
        <FadeIn delay={140}>
          <section className="edu-block">
            <div className="edu-block__head">
              <h2 className="label" style={{ color: "var(--text-primary)" }}>Activities & leadership</h2>
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

        <FadeIn delay={180}>
          <button onClick={goBack} className="btn btn-outline btn-mono" style={{ marginTop: 8 }}>
            Back to portfolio
          </button>
        </FadeIn>
      </div>
    </div>
  );
}
