import React from "react";
import { TypeAnimation } from "react-type-animation";
import pfp from "../imgs/pfp.png";
import FadeIn from "./FadeIn";
import { useTheme } from "../ThemeContext";

const skills = [
  {
    category: "Languages",
    icon: "⌨️",
    items: ["Python", "JavaScript", "Java", "R", "SQL", "C++"],
  },
  {
    category: "Frameworks & Libraries",
    icon: "🧩",
    items: ["React", "Node.js", "TensorFlow", "PyTorch", "Tailwind CSS", "scikit-learn", "Apache Spark"],
  },
  {
    category: "Tools & Platforms",
    icon: "🛠️",
    items: ["Git", "Docker", "Pandas", "NumPy", "Jupyter", "PostgreSQL", "Kubernetes", "AWS", "GCP"],
  },
];

const timeline = [
  {
    year: "2024–Present",
    title: "MS Applied Statistics & Data Science",
    org: "UCLA",
    detail: "Focus on AI/ML",
  },
  {
    year: "2020–2024",
    title: "BS Math-Computer Science",
    org: "UC San Diego",
    detail: "minor in Data Science, minor Business-Economics",
  },

];

const AboutMe = () => {
  const { isDark } = useTheme();
  return (
    <div
      className="w-full py-28 px-6"
      style={{ background: "var(--bg-secondary)", transition: "background 0.3s ease" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <FadeIn>
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4">
            <span
              className="w-8 h-px"
              style={{ background: "linear-gradient(90deg, transparent, #3b82f6)" }}
            />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Get to know me
            </span>
            <span
              className="w-8 h-px"
              style={{ background: "linear-gradient(90deg, #3b82f6, transparent)" }}
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <div
            className="mt-4 mx-auto h-1 w-16 rounded-full"
            style={{ background: "linear-gradient(90deg, #3b82f6, #6366f1)" }}
          />
        </div>
        </FadeIn>

        {/* Profile card + bio */}
        <FadeIn delay={100} className="flex flex-col lg:flex-row gap-12 mb-20">
          {/* Profile */}
          <div className="flex-shrink-0 flex flex-col items-center gap-6">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-xl opacity-50 scale-110"
                style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)" }}
              />
              <img
                src={pfp}
                alt="Justin Huang"
                className="relative w-44 h-44 rounded-full object-cover"
                style={{
                  border: "2px solid rgba(96,165,250,0.4)",
                  boxShadow: "0 0 40px rgba(99,102,241,0.25)",
                }}
              />
            </div>
            <div className="text-center">
              <p className="font-bold text-white text-lg">Justin Huang</p>
              <p className="text-blue-400 text-sm font-medium mt-0.5">MS Student · UCLA</p>
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Typing speech bubble */}
            <div
              className="rounded-2xl px-6 py-5"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <TypeAnimation
                sequence={[
                  "Hello, my name is Justin.", 1400,
                  "I'm a master's student at UCLA.", 1400,
                  "I studied CS at UCSD.", 1400,
                  "I enjoy full stack development and machine learning.", 1400,
                ]}
                wrapper="p"
                speed={55}
                repeat={Infinity}
                className="text-xl md:text-2xl font-semibold text-white"
              />
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-gray-400 text-base leading-relaxed">
              <p>
                I'm a graduate student at UCLA pursuing a Master's in Applied Statistics and
                Data Science, I did my undergrad at UCSD studying Computer Science, I am currently
                working on my thesis on Large Language Models.
              </p>
              <p>
                My work in past projects and internships have been in regards to building scalable workflows for automation to help with reducing the time
                for manual work. Manual work has problems of being error-prone, fatigue, time consuming and inefficient, especially when done in largue quanities.
                Use of new technology such as AI when done correctly can mitigate that and allow people to focus on more creative and high level work. 
              </p>
              <blockquote
                className="text-gray-500 italic text-sm leading-relaxed pl-4"
                style={{ borderLeft: "2px solid rgba(99,102,241,0.5)" }}
              >
                I believe data is another way to tell stories. 
              </blockquote>
            </div>
          </div>
        </FadeIn>

        {/* Timeline */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Education</h3>
          <div className="relative flex flex-col gap-6 max-w-3xl mx-auto">
            {/* Vertical line */}
            <div
              className="absolute left-[19px] top-4 bottom-4 w-px hidden md:block"
              style={{ background: "linear-gradient(to bottom, #3b82f6, #6366f1, transparent)" }}
            />
            {timeline.map(({ year, title, org, detail }, i) => (
              <FadeIn key={title} delay={i * 100} className="flex gap-6 items-start">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                    boxShadow: "0 0 16px rgba(99,102,241,0.4)",
                    color: "#fff",
                  }}
                >
                  ●
                </div>
                <div
                  className="flex-1 rounded-2xl px-6 py-4"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-white">{title}</span>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(99,102,241,0.15)",
                        color: "#818cf8",
                        border: "1px solid rgba(99,102,241,0.2)",
                      }}
                    >
                      {year}
                    </span>
                  </div>
                  <p className="text-blue-400 text-sm font-medium mb-1">{org}</p>
                  <p className="text-gray-500 text-sm">{detail}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Technical Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map(({ category, icon, items }, i) => (
              <FadeIn key={category} delay={i * 100}>
              <div
                className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{icon}</span>
                  <h4
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "#60a5fa" }}
                  >
                    {category}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm rounded-full font-medium"
                      style={{
                        background: "rgba(59,130,246,0.08)",
                        border: "1px solid rgba(59,130,246,0.2)",
                        color: "#93c5fd",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
