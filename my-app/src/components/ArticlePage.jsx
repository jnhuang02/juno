import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import articles from "../data/articles";
import NavBar from "./navbar";
import BlurText from "./reactbits/BlurText";

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

  if (block.type === "h3") {
    return (
      <h3
        style={{
          margin: "16px 0 0",
          fontSize: "clamp(1.1rem, 1.7vw, 1.35rem)",
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: "var(--text-primary)",
        }}
      >
        <RichText content={block.text} />
      </h3>
    );
  }

  if (block.type === "blockquote") {
    return (
      <blockquote
        style={{
          margin: "18px 0",
          paddingLeft: 24,
          borderLeft: "2px solid var(--accent-line)",
        }}
      >
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

  if (block.type === "link") {
    return (
      <a
        href={block.href}
        target="_blank"
        rel="noopener noreferrer"
        className="reading-link"
      >
        <span className="label">Reference</span>
        <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
          {block.text || block.href}
        </span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7M9 7h8v8" />
        </svg>
      </a>
    );
  }

  return null;
};

/* ── Main article page ────────────────────────────────────────────── */
const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const article = articles.find((a) => a.slug === slug);
  const [readProgress, setReadProgress] = useState(0);

  const goBack = () => {
    sessionStorage.setItem("scrollTarget", "writing");
    navigate("/");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setReadProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!article) {
    return (
      <div style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
        <NavBar />
        <div className="shell-narrow" style={{ paddingTop: 200, paddingBottom: 120 }}>
          <p className="label">404</p>
          <h1 className="display-lg" style={{ marginTop: 18 }}>Article not found</h1>
          <p className="lead" style={{ marginTop: 16 }}>
            That essay does not exist. It may have been renamed.
          </p>
          <button onClick={goBack} className="btn btn-outline btn-mono" style={{ marginTop: 28 }}>
            Back to portfolio
          </button>
        </div>
      </div>
    );
  }

  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", transition: "background 0.25s ease" }}>
      <NavBar />

      {/* Reading progress */}
      <div
        className="no-print"
        style={{ position: "fixed", top: 0, left: 0, width: "100%", height: 2, zIndex: 60, background: "transparent" }}
      >
        <div
          style={{
            width: `${readProgress}%`,
            height: "100%",
            background: "var(--accent-alt)",
            transition: "width 0.12s linear",
          }}
        />
      </div>

      {/* ── Header ── */}
      <header className="shell-narrow" style={{ paddingTop: 132, paddingBottom: 32 }}>
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

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 32 }}>
          {article.tags.map((tag) => (
            <span key={tag} className="tag tag-accent">{tag}</span>
          ))}
        </div>

        <BlurText
          tag="h1"
          className="display-lg"
          style={{ marginTop: 22 }}
          text={article.title}
          delay={30}
          startDelay={0.1}
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            marginTop: 24,
            paddingTop: 16,
            borderTop: "1px solid var(--border-subtle)",
          }}
        >
          <span className="meta">{article.date}</span>
          <span className="meta">·</span>
          <span className="meta">{article.readTime}</span>
          <span className="meta" style={{ marginLeft: 8, color: "var(--accent-alt)" }}>
            {Math.round(readProgress)}% read
          </span>
        </div>
      </header>

      {/* ── Banner ── */}
      {article.banner && (
        <div className="shell-narrow" style={{ marginBottom: 8 }}>
          <img
            src={article.banner}
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

      {/* ── Body ── */}
      <article
        className="shell-narrow reading"
        style={{ paddingTop: "clamp(40px, 5vw, 64px)", paddingBottom: "clamp(56px, 7vw, 96px)" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {article.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <hr className="rule" style={{ marginTop: 72 }} />

        {/* ── Related ── */}
        {related.length > 0 && (
          <section style={{ marginTop: 48 }}>
            <p className="label">More writing</p>
            <div style={{ marginTop: 20 }}>
              {related.map((a) => (
                <Link key={a.slug} to={`/article/${a.slug}`} className="related-row">
                  <span className="label related-row__meta">{a.date}</span>
                  <span
                    style={{
                      display: "block",
                      fontSize: "1.0625rem",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: "var(--text-primary)",
                    }}
                  >
                    {a.title}
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

export default ArticlePage;
