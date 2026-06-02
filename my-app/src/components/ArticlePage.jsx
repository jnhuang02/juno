import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import articles from "../data/articles";
import NavBar from "./navbar";

/* ── Image block with hover caption ──────────────────────────────── */
const ImageBlock = ({ src, alt, caption }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-2xl my-4 cursor-default select-none"
      style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt={alt || ""}
        className="w-full object-cover block"
        style={{
          maxHeight: 460,
          filter: hovered
            ? "brightness(0.3) saturate(0.6)"
            : "brightness(0.92) saturate(1.05)",
          transition: "filter 0.45s ease",
        }}
      />

      {/* Caption overlay */}
      {caption && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-10"
          style={{
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        >
          {/* Quote mark */}
          <svg
            width="32"
            height="24"
            viewBox="0 0 32 24"
            fill="none"
            className="mb-4 opacity-60"
          >
            <path
              d="M0 24V14.4C0 6.4 4.26667 1.86667 12.8 0L14.4 3.2C11.7333 3.86667 9.73333 5.06667 8.4 6.8C7.06667 8.53333 6.4 10.4 6.4 12.4H12.8V24H0ZM19.2 24V14.4C19.2 6.4 23.4667 1.86667 32 0L33.6 3.2C30.9333 3.86667 28.9333 5.06667 27.6 6.8C26.2667 8.53333 25.6 10.4 25.6 12.4H32V24H19.2Z"
              fill="#818cf8"
            />
          </svg>
          <p
            className="text-white text-center leading-relaxed font-medium"
            style={{
              fontSize: "1.05rem",
              maxWidth: 520,
              textShadow: "0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            {caption}
          </p>
        </div>
      )}

      {/* Bottom gradient for caption label */}
      {!caption && (
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{
            background: "linear-gradient(to top, rgba(8,12,24,0.6), transparent)",
            opacity: hovered ? 0 : 1,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};

/* ── Renders a string or array of {text, href} inline segments ───── */
const RichText = ({ content }) => {
  if (!Array.isArray(content)) return content;
  return content.map((segment, i) =>
    typeof segment === "string" ? (
      segment
    ) : (
      <a
        key={i}
        href={segment.href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium underline underline-offset-2 transition-colors duration-150"
        style={{ color: "#818cf8" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#a5b4fc")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#818cf8")}
      >
        {segment.text}
      </a>
    )
  );
};

/* ── Content block renderer ───────────────────────────────────────── */
const Block = ({ block, index }) => {
  if (block.type === "p") {
    return (
      <p
        className="text-gray-300 leading-[1.9]"
        style={{ fontSize: "1.08rem" }}
      >
        <RichText content={block.text} />
      </p>
    );
  }

  if (block.type === "h2") {
    return (
      <div className="flex items-center gap-3 mt-8 mb-1">
        <span
          className="flex-shrink-0 w-1 h-7 rounded-full"
          style={{ background: "linear-gradient(180deg, #3b82f6, #6366f1)" }}
        />
        <h2 className="text-white text-2xl font-bold tracking-tight">
          <RichText content={block.text} />
        </h2>
      </div>
    );
  }

  if (block.type === "blockquote") {
    return (
      <div
        className="relative rounded-2xl px-8 py-7 my-2"
        style={{
          background:
            "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(59,130,246,0.06))",
          border: "1px solid rgba(99,102,241,0.25)",
        }}
      >
        {/* Large decorative quote mark */}
        <div
          className="absolute top-4 left-6 text-6xl leading-none font-serif select-none pointer-events-none"
          style={{ color: "#6366f1", opacity: 0.25 }}
        >
          "
        </div>
        <p
          className="relative text-gray-100 italic leading-relaxed font-medium"
          style={{ fontSize: "1.15rem", paddingLeft: "1rem" }}
        >
          <RichText content={block.text} />
        </p>
      </div>
    );
  }

  if (block.type === "image") {
    return (
      <ImageBlock src={block.src} alt={block.alt} caption={block.caption} />
    );
  }

  if (block.type === "link") {
    return (
      <a
        href={block.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 rounded-xl px-5 py-3 my-1 transition-all duration-200"
        style={{
          background: "rgba(99,102,241,0.08)",
          border: "1px solid rgba(99,102,241,0.25)",
          textDecoration: "none",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(99,102,241,0.15)";
          e.currentTarget.style.border = "1px solid rgba(99,102,241,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(99,102,241,0.08)";
          e.currentTarget.style.border = "1px solid rgba(99,102,241,0.25)";
        }}
      >
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "#818cf8" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <span className="font-medium text-sm" style={{ color: "#a5b4fc" }}>
          {block.text || block.href}
        </span>
        <svg className="w-3.5 h-3.5 ml-auto flex-shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ color: "#6366f1" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
      <div style={{ background: "#080c18", minHeight: "100vh" }}>
        <NavBar />
        <div className="flex flex-col items-center justify-center" style={{ minHeight: "80vh" }}>
          <p className="text-white text-2xl font-bold mb-4">Article not found</p>
          <button onClick={goBack} className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium">
            ← Back to portfolio
          </button>
        </div>
      </div>
    );
  }

  const related = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <div style={{ background: "#080c18", minHeight: "100vh" }}>
      <NavBar />

      {/* Reading progress bar */}
      <div
        className="fixed left-0 w-full z-[60]"
        style={{ top: 0, height: 3, background: "rgba(255,255,255,0.04)" }}
      >
        <div
          style={{
            width: `${readProgress}%`,
            height: "100%",
            background: "linear-gradient(90deg, #3b82f6, #6366f1, #a855f7)",
            transition: "width 0.15s linear",
          }}
        />
      </div>

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <div
        className="w-full pt-36 pb-24 px-6 relative overflow-hidden"
        style={{
          background: article.banner ? "transparent" : "linear-gradient(180deg, #0d1528 0%, #080c18 100%)",
          borderBottom: "1px solid rgba(99,102,241,0.1)",
        }}
      >
        {/* Banner image — blurred + dimmed behind the text */}
        {article.banner && (
          <>
            <img
              src={article.banner}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full pointer-events-none select-none"
              style={{
                objectFit: "cover",
                objectPosition: "center",
                filter: "blur(2px) brightness(0.38) saturate(0.25)",
                transform: "scale(1.08)",
              }}
            />
            {/* Dark gradient overlay so text stays readable */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(8,12,24,0.45) 0%, rgba(8,12,24,0.65) 100%)",
              }}
            />
          </>
        )}

        {/* Grid dot pattern (non-banner only) */}
        {!article.banner && (
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage:
                "radial-gradient(circle, #818cf8 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        )}

        {/* Radial glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: 700,
            height: 350,
            background:
              "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-4xl mx-auto relative">
          {/* Back link */}
          <button
            onClick={goBack}
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-300 transition-colors text-sm font-medium mb-12 group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to portfolio
          </button>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full font-semibold"
                style={{
                  background: "rgba(99,102,241,0.18)",
                  border: "1px solid rgba(99,102,241,0.35)",
                  color: "#a5b4fc",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1
            className="font-extrabold text-white leading-[1.15] tracking-tight mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
          >
            {article.title}
          </h1>

          {/* Accent bar */}
          <div
            className="h-[3px] w-14 rounded-full mb-7"
            style={{ background: "linear-gradient(90deg, #3b82f6, #6366f1)" }}
          />

          {/* Meta row */}
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-400">{article.date}</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span className="text-gray-400">{article.readTime}</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span
              className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
              style={{
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.2)",
                color: "#60a5fa",
              }}
            >
              {Math.round(readProgress)}% read
            </span>
          </div>
        </div>
      </div>

      {/* ── Article body ────────────────────────────────────────────── */}
      <div className="w-full px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-5">
            {article.content.map((block, i) => (
              <Block key={i} block={block} index={i} />
            ))}
          </div>

          {/* Divider */}
          <div
            className="mt-24 mb-12 flex items-center gap-4"
          >
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
            />
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-[0.2em] font-semibold mb-5">
                More writing
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((a) => (
                  <Link
                    key={a.slug}
                    to={`/article/${a.slug}`}
                    className="group block rounded-xl p-5 transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(99,102,241,0.35)";
                      e.currentTarget.style.background = "rgba(99,102,241,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    }}
                  >
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {a.tags.slice(0, 1).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                          style={{
                            background: "rgba(99,102,241,0.15)",
                            color: "#a5b4fc",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-white text-sm font-semibold leading-snug mb-2 group-hover:text-indigo-300 transition-colors">
                      {a.title}
                    </p>
                    <p className="text-gray-500 text-xs">{a.readTime}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Bottom back link */}
          <div className="mt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors group"
              style={{ color: "#6366f1" }}
            >
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
