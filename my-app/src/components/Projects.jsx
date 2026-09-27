import ProjectCard from "./ProjectCard";
import FadeIn from "./FadeIn";
import SectionHeader from "./SectionHeader";
import projects from "../data/projects";

const Projects = () => (
  <div className="section" style={{ background: "var(--bg-primary)", transition: "background 0.25s ease" }}>
    <div className="shell">
      <SectionHeader
        title="Projects & case studies"
        description="Six pieces of work spanning front-end engineering, machine learning, and applied statistics. Each one opens into the full write-up: the problem, what I built, and how it turned out."
      />

      <div className="projects-grid">
        {projects.map((project, index) => (
          <FadeIn key={project.slug} delay={(index % 3) * 70} className="projects-grid__cell">
            <ProjectCard
              index={index + 1}
              slug={project.slug}
              title={project.title}
              description={project.tagline}
              image={project.image}
              tags={project.tags}
              role={project.role}
              timeline={project.timeline}
            />
          </FadeIn>
        ))}
      </div>
    </div>
  </div>
);

export default Projects;
