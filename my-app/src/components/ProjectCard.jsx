import React, { useState } from "react";

const ProjectCard = ({ title, description, image, link, tags = [] }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="w-full cursor-pointer"
      style={{ perspective: "1000px", height: "260px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden flex items-end"
          style={{
            backfaceVisibility: "hidden",
            pointerEvents: isFlipped ? "none" : "auto",
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(8,12,24,0.95) 0%, rgba(8,12,24,0.5) 50%, rgba(8,12,24,0.2) 100%)",
            }}
          />
          <div className="relative z-10 p-5 w-full">
            <h3 className="text-lg font-bold text-white leading-tight">{title}</h3>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: "rgba(99,102,241,0.25)",
                      border: "1px solid rgba(99,102,241,0.35)",
                      color: "#a5b4fc",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-gray-400 text-xs mt-2">Click to learn more →</p>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl flex flex-col items-center justify-between p-6"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #0e1525, #131d35)",
            border: "1px solid rgba(99,102,241,0.25)",
            boxShadow: "0 0 40px rgba(99,102,241,0.1)",
          }}
        >
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
          </div>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-4 px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 hover:scale-105 inline-block"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #6366f1)",
              boxShadow: "0 4px 20px rgba(99,102,241,0.4)",
            }}
          >
            View Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
