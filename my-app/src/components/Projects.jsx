import React from "react";
import ProjectCard from "./ProjectCard"; // Import ProjectCard component

const Projects = () => {
  // Array of project data
  const projects = [
    {
      title: "MLB Pitcher Durability Analysis",
      description: "An insight into MLB and pitching",
      image: "https://via.placeholder.com/400", // Replace with actual project image
      link: "https://example.com/ai-chatbot" // Replace with actual project link
    },
    {
      title: "Generative Marketing Data",
      description: "Create artificial data using SMOTE",
      image: "https://via.placeholder.com/400", // Replace with actual project image
      link: "https://example.com/ai-chatbot" // Replace with actual project link
    },
    {
      title: "Recommendation System dataset",
      description: "An interactive chatbot powered by NLP and AI models.",
      image: "https://via.placeholder.com/400", // Replace with actual project image
      link: "https://example.com/ai-chatbot" // Replace with actual project link
    },
    {
      title: "Portfolio Website",
      description: "A sleek personal portfolio built with React and Tailwind CSS.",
      image: "https://via.placeholder.com/400",
      link: "https://example.com/portfolio"
    },
    {
      title: "Huffman Visulization",
      description: "A web-based dashboard for interactive data visualization.",
      image: "https://via.placeholder.com/400",
      link: "https://example.com/data-dashboard"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white mt-[80px] py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-8">My Projects</h1>
      <div className="flex flex-wrap justify-center gap-8">
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            title={project.title} 
            description={project.description} 
            image={project.image} 
            link={project.link} 
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
