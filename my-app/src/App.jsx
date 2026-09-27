import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/Home';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import FeaturedWriting from './components/FeaturedWriting';
import ContactMe from './components/ContactMe';
import ChatBot from "./components/ChatBot";
import CursorTrail from "./components/CursorTrail";
import ArticlePage from './components/ArticlePage';
import ProjectPage from './components/ProjectPage';
import UCLAPage from './components/UCLAPage';
import UCSDPage from './components/UCSDPage';

function Portfolio() {
  useEffect(() => {
    const target = sessionStorage.getItem("scrollTarget");
    if (target) {
      sessionStorage.removeItem("scrollTarget");
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, []);

  // Scroll snapping is scoped to the home page: the long-form article and
  // case-study pages should scroll freely.
  useEffect(() => {
    document.documentElement.classList.add("snap-on");
    return () => document.documentElement.classList.remove("snap-on");
  }, []);

  // Rack-focus transition between sections. The section holding the viewport
  // stays sharp; the others are marked `is-off`, which is what drives the
  // blur. Nothing is hidden by default, so a missed callback degrades to a
  // plain section change rather than a blank one.
  useEffect(() => {
    const stages = Array.from(document.querySelectorAll(".stage"));
    if (!stages.length || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-off", entry.intersectionRatio < 0.55);
        });
      },
      { threshold: [0, 0.25, 0.55, 0.75, 1] }
    );

    stages.forEach((stage) => io.observe(stage));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="page-home"
      style={{ background: "var(--bg-primary)", transition: "background 0.25s ease" }}
    >
      <Navbar />
      <ChatBot />
      <CursorTrail />

      <section id="home" className="stage"><div className="stage__panel"><Home /></div></section>
      <section id="about" className="stage"><div className="stage__panel"><AboutMe /></div></section>
      <section id="projects" className="stage"><div className="stage__panel"><Projects /></div></section>
      <section id="writing" className="stage"><div className="stage__panel"><FeaturedWriting /></div></section>
      <section id="contact" className="stage"><div className="stage__panel"><ContactMe /></div></section>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/article/:slug" element={<ArticlePage />} />
      <Route path="/project/:slug" element={<ProjectPage />} />
      <Route path="/education/ucla" element={<UCLAPage />} />
      <Route path="/education/ucsd" element={<UCSDPage />} />
    </Routes>
  );
}

export default App;
