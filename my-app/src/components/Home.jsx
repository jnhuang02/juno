import React from "react";
import RocketGame from "./RocketGame";
import Widget from "./Widget";
import { TypeAnimation } from "react-type-animation"; // ✅ Import TypeAnimation
import pfp from "../imgs/pfp.png";
import resumePdf from "../assets/huang_resume.pdf"; // Import the resume file

const Home = () => {
  return (
    <div className="flex flex-col w-screen items-center justify-center min-h-screen text-white pt-24">
      {/* Hero Section */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Left Section */}
        <div className="max-w-lg text-center md:text-left">
          <p className="text-blue-400 uppercase font-semibold tracking-wide">JH PORTFOLIO</p>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-4">
            HEY! I'M <span className="text-blue-400">JUSTIN</span>
          </h1>

          {/* ✅ Typing Animation for "I'M A ..." */}
          <h2 className="text-3xl md:text-5xl font-bold text-gray-300 mt-2">
            I'M A{" "}
            <TypeAnimation
              sequence={[
                "Developer", 1000,
                "Student", 1000,
                "Musician", 1000,
                "Data Scientist", 1000,
                "Gamer", 1000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-blue-400"
            />
          </h2>

          <p className="text-gray-400 mt-4">
            Passionate about building scalable and user-friendly applications.
            Always learning and improving.
          </p>
          <div className="mt-6 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
            <a href="mailto:huangjustinn@gmail.com">
              <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md">
                Hire Me
              </button>
            </a>
            <a href={resumePdf} download="huang_resume.pdf">
              <button className="px-6 py-3 border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white rounded-lg shadow-md">
                Download CV
              </button>
            </a>
          </div>
        </div>

        {/* Right Section - Rocket Game */}
        <div className="mt-20 md:mt-10">
          <RocketGame />
        </div>
      </div>

      {/* Footer / Branding */}
      <div className="mt-16 flex justify-center space-x-6">
        <Widget
          videoSrc="https://www.w3schools.com/html/movie.mp4"
          thumbnail={pfp}
          link="https://youtube.com"
        />
        <img src="https://via.placeholder.com/100" alt="Brand2" className="w-16 opacity-50" />
        <img src="https://via.placeholder.com/100" alt="Brand3" className="w-16 opacity-50" />
      </div>
    </div>
  );
};

export default Home;
