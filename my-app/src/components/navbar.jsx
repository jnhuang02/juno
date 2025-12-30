import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="absolute top-3 left-0 w-full font-primary text-lg pt-4 bg-transparent text-white">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo Section */}
        <div className="text-2xl font-extrabold text-red-600">JH</div>

        {/* Navigation Links */}
        <ul className="flex space-x-8">
          {["Home", "Projects", "AboutMe"].map((item, index) => (
            <li key={index} className="relative group">
              <NavLink
                to={item === "Home" ? "/" : `${item}`}
                end={item === "Home"}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-xl transition duration-300 ${
                    isActive
                      ? "text-white font-extrabold scale-110 border-b-2 border-white pb-1"
                      : "text-gray-400 hover:text-gray-200"
                  }`
                }
              >
                {item}
                {/* Underline Animation for Hover (only for inactive links) */}
                {({ isActive }) =>
                  !isActive && (
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-white scale-x-0 transition-transform duration-300 ease-in-out origin-left group-hover:scale-x-100"></span>
                  )
                }
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Contact Button */}
        <NavLink
          to="/ContactMe"
          className={({ isActive }) =>
            isActive
              ? "bg-red-600 text-white text-xl px-5 py-2 rounded-full shadow-md font-extrabold scale-105 transition duration-300"
              : "bg-gray-700 hover:bg-gray-800 text-white text-xl px-5 py-2 rounded-full shadow-md transition duration-300"
          }
        >
          Contact
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
