import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import Navbar from './components/navbar';
import Home from './components/Home';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import FeaturedWriting from './components/FeaturedWriting';
import ContactMe from './components/ContactMe';
import ChatBot from "./components/ChatBot";
import ArticlePage from './components/ArticlePage';

// Cloud/wave divider — fill color must match the NEXT section's bg
const CloudDivider = ({ fromColor, toColor, flip = false }) => (
  <div style={{ background: fromColor, lineHeight: 0, display: 'block', marginBottom: -1 }}>
    <svg
      viewBox="0 0 1440 110"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      style={{
        display: 'block',
        width: '100%',
        height: '90px',
        transform: flip ? 'scaleX(-1)' : 'none',
      }}
    >
      <path
        fill={toColor}
        d="
          M0,110 L0,70
          C60,35 120,85 180,58
          C240,30 300,80 360,55
          C420,28 480,78 540,52
          C600,25 660,75 720,52
          C780,28 840,78 900,55
          C960,30 1020,80 1080,55
          C1140,28 1200,78 1260,52
          C1320,28 1380,70 1440,52
          L1440,110 Z
        "
      />
    </svg>
  </div>
);

function Portfolio() {
  const { isDark } = useTheme();
  const bg1 = isDark ? "#080c18" : "#f4f7ff";
  const bg2 = isDark ? "#0e1525" : "#eaeeff";

  useEffect(() => {
    const target = sessionStorage.getItem("scrollTarget");
    if (target) {
      sessionStorage.removeItem("scrollTarget");
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, []);

  return (
  <div style={{ background: bg1, transition: "background 0.3s ease" }}>
    <Navbar />
    <ChatBot />

    <section id="home">
      <Home />
    </section>

    <CloudDivider fromColor={bg1} toColor={bg2} />

    <section id="about">
      <AboutMe />
    </section>

    <CloudDivider fromColor={bg2} toColor={bg1} flip={true} />

    <section id="projects">
      <Projects />
    </section>

    <section id="writing">
      <FeaturedWriting />
    </section>

    <CloudDivider fromColor={bg1} toColor={bg2} />

    <section id="contact">
      <ContactMe />
    </section>
  </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/article/:slug" element={<ArticlePage />} />
    </Routes>
  );
}

export default App;
