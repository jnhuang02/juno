import { useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";
import articles from "../data/articles";

const ArticleRow = ({ article, index }) => (
  <Link to={`/article/${article.slug}`} className="writing-row hover-invert" style={{ textDecoration: "none" }}>
    {/* Rail: index + date + read time */}
    <div className="writing-row__rail">
      <span className="label">{String(index + 1).padStart(2, "0")}</span>
      <span className="label" style={{ textTransform: "none", letterSpacing: "0.04em", fontSize: 12 }}>
        {article.date}
      </span>
      <span className="meta" style={{ fontSize: 11.5 }}>{article.readTime}</span>
    </div>

    {/* Content */}
    <div className="writing-row__body">
      <h3
        style={{
          margin: 0,
          fontSize: "clamp(1.15rem, 1.7vw, 1.45rem)",
          fontWeight: 600,
          letterSpacing: "-0.025em",
          color: "var(--text-primary)",
        }}
      >
        {article.title}
      </h3>

      <p className="body-text" style={{ margin: "10px 0 0", fontSize: "1rem", maxWidth: 640 }}>
        {article.excerpt}
      </p>

      {article.tags?.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 16 }}>
          {article.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </div>

    {/* Affordance */}
    <span className="writing-row__arrow" aria-hidden="true">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  </Link>
);

const FeaturedWriting = () => {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? articles : articles.slice(0, 4);

  return (
    <div className="section" style={{ background: "var(--bg-secondary)", transition: "background 0.25s ease" }}>
      <div className="shell">
        <SectionHeader
          title="Notes & essays"
          description="Personal essays and reflections on data, software, and whatever else is on my mind."
        />

        <div className="hairline-list" style={{ marginTop: "clamp(40px, 5vw, 64px)" }}>
          {visible.map((article, i) => (
            <FadeIn key={article.slug} delay={Math.min(i, 4) * 60}>
              <ArticleRow article={article} index={i} />
            </FadeIn>
          ))}
        </div>

        {articles.length > 4 && (
          <FadeIn delay={120}>
            <div style={{ marginTop: 36 }}>
              <button
                onClick={() => setExpanded(!expanded)}
                className="btn btn-outline btn-mono"
              >
                {expanded ? "Show fewer" : `Show all ${articles.length} essays`}
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  style={{ transform: expanded ? "rotate(180deg)" : "none", transition: "transform 0.25s ease" }}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
};

export default FeaturedWriting;
