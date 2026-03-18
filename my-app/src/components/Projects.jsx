import React from "react";
import ProjectCard from "./ProjectCard"; // Import ProjectCard component

const Projects = () => {
  // Array of project data
  const projects = [
    {
      title: "Superhero Dashboard",
      description: "A website showcasing my favorite superheros",
      image: "https://preview.redd.it/redownloaded-reddit-just-to-say-that-no-character-in-v0-f2ufmu6atvl91.jpg?width=640&crop=smart&auto=webp&s=6eb7e2d0938601816528b411599dbde0f4fad8ee", 
      link: "https://jnhuang02.github.io/superhero-hub/" 
    },
    {
      title: "MLB Pitcher Durability Analysis",
      description: "An insight into MLB and pitching",
      image: "https://images.seattletimes.com/wp-content/uploads/2023/06/06032023_ms_144222.jpg?d=2040x1360", 
      link: "https://docs.google.com/presentation/d/1Xe51s4QxqVMGzgYuGSfdgykBxlORkp2KGfvEHUeFXVM/edit?slide=id.p#slide=id.p" 
    },
    {
      title: "Generative Marketing Data (SMOTE)",
      description: "Created artificial data using SMOTE for a marketing dataset.",
      image: "https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF0YXxlbnwwfHwwfHx8MA%3D%3D", 
      link: "https://drive.google.com/file/d/1-QCTsPo-FBfUOFjdJ5ap_irVOTK8pWQm/view?usp=sharing"
    },
    {
      title: "Text mining Amazon book reviews",
      description: "Text mining and sentiment analysis on Amazon book reviews.",
      image: "https://www.promptcloud.com/wp-content/uploads/2018/08/text-analytics-mining-data-1.png", 
      link: "https://docs.google.com/presentation/d/15sFH_3zUSQgiE1KM00Ll-Tocv3jPETBmGoQrg-57gv0/edit?slide=id.p#slide=id.phttps://www.promptcloud.com/wp-content/uploads/2018/08/text-analytics-mining-data-1.png" 
    },
    {
      title: "Portfolio Website",
      description: "A sleek personal portfolio built with React and Tailwind CSS.",
      image: "https://img.pikbest.com/wp/202347/architecture-portfolio-blue-luxury-background-with-abstract-wall-wave-3d-rendered-and-perfect-for-website-presentation-or-use_9759684.jpg!w700wp",
      link: "https://github.com/jnhuang02/juno"
    },
    {
      title: "Huffman Visulization",
      description: "A web-based dashboard for interactive data visualization.",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Huffman_tree_2.svg/1200px-Huffman_tree_2.svg.png",
      link: "https://github.com/saathvikpd/HuffmanViz"
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
