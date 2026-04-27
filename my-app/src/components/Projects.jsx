import React from "react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Superhero Dashboard",
    description: "A website showcasing my favorite superheroes with dynamic data and interactive UI.",
    image:
      "https://preview.redd.it/redownloaded-reddit-just-to-say-that-no-character-in-v0-f2ufmu6atvl91.jpg?width=640&crop=smart&auto=webp&s=6eb7e2d0938601816528b411599dbde0f4fad8ee",
    link: "https://jnhuang02.github.io/superhero-hub/",
    tags: ["React", "JavaScript"],
  },
  {
    title: "MLB Pitcher Durability",
    description: "Data-driven insight into MLB pitching workloads and durability trends.",
    image: "https://images.seattletimes.com/wp-content/uploads/2023/06/06032023_ms_144222.jpg?d=2040x1360",
    link: "https://docs.google.com/presentation/d/1Xe51s4QxqVMGzgYuGSfdgykBxlORkp2KGfvEHUeFXVM/edit?slide=id.p#slide=id.p",
    tags: ["Data Science", "Python"],
  },
  {
    title: "Generative Marketing Data",
    description: "Created artificial data using SMOTE oversampling for an imbalanced marketing dataset.",
    image:
      "https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF0YXxlbnwwfHwwfHx8MA%3D%3D",
    link: "https://drive.google.com/file/d/1-QCTsPo-FBfUOFjdJ5ap_irVOTK8pWQm/view?usp=sharing",
    tags: ["ML", "SMOTE", "Python"],
  },
  {
    title: "Amazon Book Review Mining",
    description: "Text mining and sentiment analysis pipeline on a large corpus of Amazon book reviews.",
    image: "https://www.promptcloud.com/wp-content/uploads/2018/08/text-analytics-mining-data-1.png",
    link: "https://docs.google.com/presentation/d/15sFH_3zUSQgiE1KM00Ll-Tocv3jPETBmGoQrg-57gv0/edit?slide=id.p#slide=id.p",
    tags: ["NLP", "Python", "Data Science"],
  },
  {
    title: "Portfolio Website",
    description: "This sleek personal portfolio built with React, Tailwind CSS, and modern design principles.",
    image:
      "https://img.pikbest.com/wp/202347/architecture-portfolio-blue-luxury-background-with-abstract-wall-wave-3d-rendered-and-perfect-for-website-presentation-or-use_9759684.jpg!w700wp",
    link: "https://github.com/jnhuang02/juno",
    tags: ["React", "Tailwind CSS"],
  },
  {
    title: "Huffman Visualization",
    description: "Interactive web-based visualization of Huffman encoding tree construction.",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Huffman_tree_2.svg/1200px-Huffman_tree_2.svg.png",
    link: "https://github.com/saathvikpd/HuffmanViz",
    tags: ["Algorithms", "JavaScript"],
  },
];

const Projects = () => {
  return (
    <div className="w-full py-28 px-6" style={{ background: "#080c18" }}>
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span
              className="w-8 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #3b82f6)" }}
            />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              What I've built
            </span>
            <span
              className="w-8 h-px"
              style={{ background: "linear-gradient(90deg, #3b82f6, transparent)" }}
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Projects
          </h2>
          <div
            className="mt-4 mx-auto h-1 w-16 rounded-full"
            style={{ background: "linear-gradient(90deg, #3b82f6, #6366f1)" }}
          />
          <p className="mt-6 text-gray-400 max-w-xl mx-auto text-base">
            Click any card to flip it and learn more. A selection of work spanning web development,
            machine learning, and data science.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {projects.map((project, index) => (
            <div key={index} className="w-full max-w-sm">
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                link={project.link}
                tags={project.tags}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
