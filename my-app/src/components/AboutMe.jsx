import { useNavigate } from "react-router-dom";
import pfp from "../imgs/pfp.png";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";

const skills = [
  {
    category: "Languages",
    items: ["Python", "JavaScript", "Java", "R", "SQL", "C++"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React", "Node.js", "TensorFlow", "PyTorch", "Tailwind CSS", "scikit-learn", "Apache Spark"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "Docker", "Pandas", "NumPy", "Jupyter", "PostgreSQL", "Kubernetes", "AWS", "GCP"],
  },
];

const timeline = [
  {
    year: "2024 - Present",
    title: "MS Applied Statistics & Data Science",
    org: "UCLA",
    detail: "Focus on AI/ML · thesis on large language models",
    route: "/education/ucla",
  },
  {
    year: "2020 - 2024",
    title: "BS Math-Computer Science",
    org: "UC San Diego",
    detail: "Minors in Data Science and Business-Economics",
    route: "/education/ucsd",
  },
];

const AboutMe = () => {
  const navigate = useNavigate();

  return (
    <div
      className="section"
      style={{ background: "var(--bg-secondary)", transition: "background 0.25s ease" }}
    >
      <div className="shell">
        <SectionHeader
          title="A builder's background"
          description="Statistics, software, and the long-running argument between the two. Here is where I studied, what I work with, and the sentence I keep coming back to."
        />

        {/* ── Portrait + bio ── */}
        <FadeIn delay={80}>
          <div className="about-grid" style={{ marginTop: "clamp(48px, 6vw, 80px)" }}>
            {/* Rail */}
            <div>
              <img
                src={pfp}
                alt="Portrait of Justin Huang"
                style={{
                  width: "100%",
                  maxWidth: 320,
                  aspectRatio: "1 / 1",
                  objectFit: "cover",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border-subtle)",
                  display: "block",
                  filter: "saturate(0.92)",
                }}
              />

              <dl style={{ marginTop: 24 }}>
                {[
                  ["Name", "Justin Huang"],
                  ["Based in", "Los Angeles, CA"],
                  ["Now", "MS student, UCLA"],
                  ["Focus", "ML & automation"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 16,
                      padding: "9px 0",
                      borderBottom: "1px solid var(--border-subtle)",
                    }}
                  >
                    <dt className="label">{k}</dt>
                    <dd style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-primary)" }}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Bio */}
            <div style={{ maxWidth: 620 }}>
              <p
                className="serif"
                style={{
                  fontSize: "clamp(1.4rem, 2.4vw, 1.95rem)",
                  lineHeight: 1.28,
                  color: "var(--text-primary)",
                  margin: 0,
                  marginBottom: 32,
                }}
              >
                Hello, my name is Justin. I'm a master's student at UCLA, a computer
                science graduate of UC San Diego, and someone who thinks data is
                another way to tell stories.
              </p>

              <div className="body-text" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <p style={{ margin: 0 }}>
                  I'm pursuing a Master's in Applied Statistics and Data Science, and I'm
                  currently working on my thesis on large language models. Before that I
                  studied Computer Science at UCSD, with minors in data science and
                  business-economics.
                </p>
                <p style={{ margin: 0 }}>
                  My projects and internships have centered on building scalable
                  workflows that remove manual work. Manual work is error-prone, tiring,
                  and slow, especially at volume. Used carefully, new technology can
                  absorb that load so people can spend their time on higher-level,
                  more creative problems.
                </p>
              </div>

              <p
                className="label"
                style={{ marginTop: 36, paddingTop: 16, borderTop: "1px solid var(--border-subtle)" }}
              >
                Currently: building automation for analytics, writing about it, and
                making small games in the browser.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* ── Education ── */}
        <div style={{ marginTop: "clamp(64px, 8vw, 110px)" }}>
          <FadeIn>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 24,
                borderTop: "1px solid var(--border-strong)",
                paddingTop: 14,
              }}
            >
              <h3 className="label" style={{ color: "var(--text-primary)" }}>Education</h3>
              <span className="label">02</span>
            </div>
          </FadeIn>

          <div className="hairline-list" style={{ marginTop: 20 }}>
            {timeline.map(({ year, title, org, detail, route }, i) => (
              <FadeIn key={title} delay={i * 80}>
                <button
                  onClick={() => navigate(route)}
                  className="edu-row"
                  aria-label={`Open ${org} page`}
                >
                  <span className="label edu-row__year">{year}</span>
                  <span className="edu-row__main">
                    <span
                      style={{
                        display: "block",
                        fontSize: "1.0625rem",
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        color: "var(--text-primary)",
                      }}
                    >
                      {title}
                    </span>
                    <span className="label" style={{ display: "block", marginTop: 6, textTransform: "none", letterSpacing: "0.04em", fontSize: 12 }}>
                      {org}
                    </span>
                  </span>
                  <span className="edu-row__detail body-text" style={{ fontSize: "0.9375rem" }}>
                    {detail}
                  </span>
                  <span className="link-arrow edu-row__cta" style={{ fontSize: "0.875rem" }}>
                    Explore
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* ── Skills ── */}
        <div style={{ marginTop: "clamp(64px, 8vw, 110px)" }}>
          <FadeIn>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 24,
                borderTop: "1px solid var(--border-strong)",
                paddingTop: 14,
              }}
            >
              <h3 className="label" style={{ color: "var(--text-primary)" }}>Technical toolkit</h3>
              <span className="label">03</span>
            </div>
          </FadeIn>

          <div className="skills-grid">
            {skills.map(({ category, items }, i) => (
              <FadeIn key={category} delay={i * 80}>
                <div>
                  <h4 className="display-md" style={{ fontSize: "1.25rem", marginBottom: 18 }}>
                    {category}
                  </h4>
                  <ul className="hairline-list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
                    {items.map((item) => (
                      <li
                        key={item}
                        style={{
                          padding: "10px 0",
                          fontFamily: "var(--font-mono)",
                          fontSize: 13,
                          letterSpacing: "0.02em",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
