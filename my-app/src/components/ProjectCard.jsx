import React, { useState } from "react";

const ProjectCard = ({ title, description, image, link }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-80 h-56 md:w-96 md:h-64 perspective cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d", // Ensures 3D flipping
        }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full rounded-lg shadow-lg bg-cover bg-center flex items-center justify-center text-white text-2xl font-bold p-4"
          style={{
            backgroundImage: `url(${image})`,
            backfaceVisibility: "hidden", // Hides the back side when front is visible
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
          <span className="relative z-10">{title}</span>
        </div>

        {/* Back Side (Fixing Mirrored Text) */}
        <div
          className="absolute w-full h-full rounded-lg shadow-lg bg-gray-800 text-white p-4 flex flex-col justify-between transform rotate-y-180"
          style={{
            backfaceVisibility: "hidden", // Hides the front side when back is visible
            transform: "rotateY(180deg)", // Fixes mirrored text issue
          }}
        >
          <p className="text-lg">{description}</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-center"
          >
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
              View Project
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
