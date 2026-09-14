import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/Home';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import FeaturedWriting from './components/FeaturedWriting';
import ContactMe from './components/ContactMe';
import ChatBot from "./components/ChatBot";
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

  return (
    <div style={{ background: "var(--bg-primary)", transition: "background 0.25s ease" }}>
      <Navbar />
      <ChatBot />

      <section id="home">
        <Home />
      </section>

      <hr className="rule" />

      <section id="about">
        <AboutMe />
      </section>

      <hr className="rule" />

      <section id="projects">
        <Projects />
      </section>

      <hr className="rule" />

      <section id="writing">
        <FeaturedWriting />
      </section>

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
      <Route path="/project/:slug" element={<ProjectPage />} />
      <Route path="/education/ucla" element={<UCLAPage />} />
      <Route path="/education/ucsd" element={<UCSDPage />} />
    </Routes>
  );
}

export default App;
