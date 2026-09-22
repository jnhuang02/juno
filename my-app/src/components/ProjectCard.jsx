import { Link } from "react-router-dom";
import SpotlightCard from "./reactbits/SpotlightCard";

const ProjectCard = ({ index, slug, title, description, image, tags = [], role, timeline }) => (
  <SpotlightCard
    as={Link}
    to={`/project/${slug}`}
    className="project-card"
    style={{ textDecoration: "none" }}
  >
    <div className="project-card__media">
      <img src={image} alt="" loading="lazy" />
    </div>

    <div className="project-card__body">
      <div className="project-card__top">
        <span className="label">{String(index).padStart(2, "0")}</span>
        {(role || timeline) && (
          <span className="label" style={{ textTransform: "none", letterSpacing: "0.04em", fontSize: 11.5 }}>
            {[role, timeline].filter(Boolean).join(" · ")}
          </span>
        )}
      </div>

      <h3
        style={{
          margin: "14px 0 0",
          fontSize: "1.3rem",
          fontWeight: 600,
          letterSpacing: "-0.025em",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </h3>

      <p className="body-text" style={{ margin: "10px 0 0", fontSize: "0.9375rem" }}>
        {description}
      </p>

      {tags.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 18 }}>
          {tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}

      <span className="link-arrow project-card__cta" style={{ marginTop: 22 }}>
        View case study
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </div>
  </SpotlightCard>
);

export default ProjectCard;
