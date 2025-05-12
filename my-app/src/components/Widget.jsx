import React, { useState } from "react";

const Widget = ({ videoSrc, thumbnail, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-60 h-40 md:w-80 md:h-52 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-110 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(link, "_blank")}
    >
      {/* Video or Thumbnail */}
      {isHovered ? (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        />
      ) : (
        <img
          src={thumbnail}
          alt="Widget Thumbnail"
          className="absolute w-full h-full object-cover"
        />
      )}

      {/* Overlay Effect */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    </div>
  );
};

export default Widget;
