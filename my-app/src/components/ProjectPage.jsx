import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import projects from "../data/projects";
import NavBar from "./navbar";

/* ── Full-width image with a caption set beneath it ───────────────── */
const ImageBlock = ({ src, alt, caption }) => (
  <figure className="reading-figure">
    <img src={src} alt={alt || ""} />
    {caption && <figcaption className="meta">{caption}</figcaption>}
  </figure>
);

/* ── Renders a string or array of {text, href} inline segments ───── */
const RichText = ({ content }) => {
  if (!Array.isArray(content)) return content;
  return content.map((segment, i) =>
    typeof segment === "string" ? (
      segment
    ) : (
      <a key={i} href={segment.href} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-alt)" }}>
        {segment.text}
      </a>
    )
  );
};

/* ── Content block renderer ───────────────────────────────────────── */
const Block = ({ block }) => {
  if (block.type === "p") {
    return (
      <p style={{ margin: 0 }}>
        <RichText content={block.text} />
      </p>
    );
  }

  if (block.type === "h2") {
    return (
      <h2
        style={{
          margin: "22px 0 0",
          paddingTop: 16,
          borderTop: "1px solid var(--border-strong)",
          fontSize: "clamp(1.3rem, 2.2vw, 1.65rem)",
          fontWeight: 600,
          letterSpacing: "-0.025em",
          color: "var(--text-primary)",
        }}
      >
        <RichText content={block.text} />
      </h2>
    );
  }

  if (block.type === "blockquote") {
    return (
      <blockquote style={{ margin: "18px 0", paddingLeft: 24, borderLeft: "2px solid var(--accent-line)" }}>
        <p
          className="serif"
          style={{
            margin: 0,
            fontSize: "clamp(1.25rem, 2.1vw, 1.6rem)",
            lineHeight: 1.4,
            color: "var(--text-primary)",
          }}
        >
          <RichText content={block.text} />
        </p>
      </blockquote>
    );
  }

  if (block.type === "image") {
    return <ImageBlock src={block.src} alt={block.alt} caption={block.caption} />;
  }

  if (block.type === "metric") {
    return (
      <div className="card" style={{ padding: "18px 20px" }}>
        <p className="label" style={{ margin: 0 }}>{block.label}</p>
        <p style={{ margin: "8px 0 0", fontSize: "1.5rem", fontWeight: 500, letterSpacing: "-0.03em", color: "var(--text-primary)" }}>
          {block.value}
        </p>
      </div>
    );
  }

  if (block.type === "link") {
    return (
      <a href={block.href} target="_blank" rel="noopener noreferrer" className="reading-link">
        <span className="label">Reference</span>
        <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{block.text || block.href}</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
      </a>
    );
  }

  return null;
};

/* ── Main project page ────────────────────────────────────────────── */
const ProjectPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  const goBack = () => {
    sessionStorage.setItem("scrollTarget", "projects");
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
        <NavBar />
        <div className="shell-narrow" style={{ paddingTop: 200, paddingBottom: 120 }}>
          <p className="label">404</p>
          <h1 className="display-lg" style={{ marginTop: 18 }}>Project not found</h1>
          <p className="lead" style={{ marginTop: 16 }}>
            That case study does not exist — it may have been renamed.
          </p>
          <button onClick={goBack} className="btn btn-outline btn-mono" style={{ marginTop: 28 }}>
            Back to portfolio
          </button>
        </div>
      </div>
    );
  }

  const related = projects.filter((p) => p.slug !== slug).slice(0, 3);

  const specRows = [
    project.role ? ["Role", project.role] : null,
    project.timeline ? ["Timeline", project.timeline] : null,
    project.stack?.length ? ["Stack", project.stack.join(", ")] : null,
  ].filter(Boolean);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", transition: "background 0.25s ease" }}>
      <NavBar />

      {/* ── Header ── */}
      <header className="shell-narrow" style={{ paddingTop: 132 }}>
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

        <div className="project-hero">
          {/* Left: title block */}
          <div>
            <p className="label" style={{ marginTop: 40 }}>Case study</p>

            <h1 className="display-lg" style={{ marginTop: 20 }}>{project.title}</h1>

            {project.tagline && (
              <p className="lead" style={{ marginTop: 22, maxWidth: 620 }}>{project.tagline}</p>
            )}

            {project.tags?.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 26 }}>
                {project.tags.map((tag) => (
                  <span key={tag} className="tag tag-accent">{tag}</span>
                ))}
              </div>
            )}

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-mono">
                  View live project
                </a>
              )}
              {project.repo && project.repo !== project.link && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-mono">
                  Source code
                </a>
              )}
            </div>
          </div>

          {/* Right: spec table */}
          {specRows.length > 0 && (
            <dl className="spec-table">
              {specRows.map(([term, value]) => (
                <div key={term} className="spec-table__row">
                  <dt className="label">{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </header>

      {/* ── Banner ── */}
      {project.image && (
        <div className="shell-narrow" style={{ marginTop: "clamp(40px, 5vw, 64px)" }}>
          <img
            src={project.image}
            alt=""
            style={{
              width: "100%",
              aspectRatio: "3 / 1",
              maxHeight: 300,
              objectFit: "cover",
              display: "block",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border-subtle)",
            }}
          />
        </div>
      )}

      {/* ── Metrics ── */}
      {project.metrics?.length > 0 && (
        <section className="shell-narrow" style={{ marginTop: "clamp(40px, 5vw, 64px)" }}>
          <p className="label" style={{ marginBottom: 16 }}>At a glance</p>
          <div className="metric-grid">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
                    fontWeight: 500,
                    letterSpacing: "-0.035em",
                    color: "var(--text-primary)",
                  }}
                >
                  {m.value}
                </p>
                <p className="label" style={{ margin: "8px 0 0" }}>{m.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Body ── */}
      <article
        className="shell-narrow reading"
        style={{ paddingTop: "clamp(48px, 6vw, 80px)", paddingBottom: "clamp(56px, 7vw, 96px)" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {project.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <hr className="rule" style={{ marginTop: 72 }} />

        {/* ── Related ── */}
        {related.length > 0 && (
          <section style={{ marginTop: 48 }}>
            <p className="label">More projects</p>
            <div style={{ marginTop: 20 }}>
              {related.map((p) => (
                <Link key={p.slug} to={`/project/${p.slug}`} className="related-row">
                  <span className="label related-row__meta">{p.timeline}</span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "1.0625rem",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: "var(--text-primary)",
                    }}
                  >
                    {p.title}
                  </span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)" }}>
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              ))}
            </div>
          </section>
        )}

        <button onClick={goBack} className="btn btn-outline btn-mono" style={{ marginTop: 48 }}>
          Back to portfolio
        </button>
      </article>
    </div>
  );
};

export default ProjectPage;
