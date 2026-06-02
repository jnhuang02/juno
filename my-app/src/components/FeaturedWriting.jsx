import React, { useState } from "react";
import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";
import articles from "../data/articles";

const ArticleCard = ({ article }) => (
  <Link
    to={`/article/${article.slug}`}
    className="group block w-full rounded-2xl transition-all duration-300"
    style={{
      background: "linear-gradient(135deg, #0e1525, #131d35)",
      border: "1px solid rgba(99,102,241,0.15)",
      boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      textDecoration: "none",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.border = "1px solid rgba(99,102,241,0.4)";
      e.currentTarget.style.boxShadow = "0 8px 40px rgba(99,102,241,0.12)";
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.border = "1px solid rgba(99,102,241,0.15)";
      e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
      e.currentTarget.style.transform = "translateY(0)";
    }}
  >
    <div className="flex" style={{ minHeight: 160 }}>
      {/* Left accent bar */}
      <div
        className="w-1 rounded-l-2xl flex-shrink-0"
        style={{ background: "linear-gradient(180deg, #3b82f6, #6366f1)" }}
      />

      {/* Content */}
      <div className="flex flex-col justify-between p-7 flex-1">
        {/* Top row */}
        <div>
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex gap-2 flex-wrap">
              {article.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                  style={{
                    background: "rgba(99,102,241,0.18)",
                    border: "1px solid rgba(99,102,241,0.3)",
                    color: "#a5b4fc",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-gray-500 text-xs">{article.date}</span>
          </div>

          <h3 className="text-white font-bold text-xl mb-3 leading-snug group-hover:text-indigo-300 transition-colors duration-200">
            {article.title}
          </h3>

          <p className="text-gray-400 text-sm leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5">
          <span className="text-gray-600 text-xs">{article.readTime}</span>
          <span
            className="text-sm font-semibold transition-all duration-200 group-hover:gap-2"
            style={{ color: "#6366f1" }}
          >
            Read →
          </span>
        </div>
      </div>
    </div>
  </Link>
);

const FeaturedWriting = () => {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? articles : articles.slice(0, 3);

  return (
    <div className="w-full py-28 px-6" style={{ background: "#080c18" }}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <FadeIn>
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span
              className="w-8 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #3b82f6)" }}
            />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              What I've been thinking about
            </span>
            <span
              className="w-8 h-px"
              style={{ background: "linear-gradient(90deg, #3b82f6, transparent)" }}
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Featured Writing
          </h2>
          <div
            className="mt-4 mx-auto h-1 w-16 rounded-full"
            style={{ background: "linear-gradient(90deg, #3b82f6, #6366f1)" }}
          />
          <p className="mt-6 text-gray-400 max-w-xl mx-auto text-base">
            Personal essays, reflections, and notes on data, software, and whatever else is
            on my mind.
          </p>
        </div>
        </FadeIn>

        {/* Articles */}
        <div className="flex flex-col gap-5">
          {visible.map((article, i) => (
            <FadeIn key={i} delay={i * 100}>
              <ArticleCard article={article} />
            </FadeIn>
          ))}
        </div>

        {/* View more / less */}
        {articles.length > 3 && (
          <FadeIn delay={150}>
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setExpanded(!expanded)}
              className="px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(99,102,241,0.15))",
                border: "1px solid rgba(99,102,241,0.35)",
              }}
            >
              {expanded ? "Show Less ↑" : `View More (${articles.length - 3} more) ↓`}
            </button>
          </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
};

export default FeaturedWriting;
