import { useCallback, useEffect, useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/Home';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import FeaturedWriting from './components/FeaturedWriting';
import ContactMe from './components/ContactMe';
import ChatBot from "./components/ChatBot";
import CursorTrail from "./components/CursorTrail";
import RouteWipe from "./components/RouteWipe";
import ArticlePage from './components/ArticlePage';
import ProjectPage from './components/ProjectPage';
import UCLAPage from './components/UCLAPage';
import UCSDPage from './components/UCSDPage';

/** The home page reads as a deck of scenes rather than a scrolling page. */
const SECTIONS = [
  { id: "home", Panel: Home },
  { id: "about", Panel: AboutMe },
  { id: "projects", Panel: Projects },
  { id: "writing", Panel: FeaturedWriting },
  { id: "contact", Panel: ContactMe },
];

function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  // Set while a section jump is in flight, so the slots scrolling past on the
  // way do not each activate their scene.
  const jumping = useRef(false);

  const goToSection = useCallback((id) => {
    const index = SECTIONS.findIndex((section) => section.id === id);
    if (index < 0) return;

    jumping.current = true;
    setActiveIndex(index);

    // Jump the scroll cursor rather than sweeping through the deck. The
    // content never moves with the scroll, so nothing is lost by cutting
    // straight to the target, and the scenes in between never come up.
    document
      .getElementById(`${id}-slot`)
      ?.scrollIntoView({ behavior: "instant" });

    const panel = document.getElementById(id)?.querySelector(".stage__panel");
    if (panel) panel.scrollTop = 0;

    // IntersectionObserver reports the new position on the next frame or two.
    setTimeout(() => {
      jumping.current = false;
    }, 250);
  }, []);

  useEffect(() => {
    const target = sessionStorage.getItem("scrollTarget");
    if (!target) return;
    sessionStorage.removeItem("scrollTarget");
    const timer = setTimeout(() => goToSection(target), 150);
    return () => clearTimeout(timer);
  }, [goToSection]);

  // Scroll snapping is scoped to the home page: the long-form article and
  // case-study pages should scroll freely.
  useEffect(() => {
    document.documentElement.classList.add("snap-on");
    return () => document.documentElement.classList.remove("snap-on");
  }, []);

  // The scroll slots are invisible full-height placeholders that carry the
  // scroll length. Whichever one holds the middle of the viewport decides
  // which scene is showing, so the content swaps in place instead of sliding.
  // If this never runs, the deck simply stays on the first scene.
  useEffect(() => {
    const slots = Array.from(document.querySelectorAll(".deck__slot"));
    if (!slots.length || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || jumping.current) return;
          setActiveIndex(Number(entry.target.dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    slots.forEach((slot) => io.observe(slot));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className="page-home"
      style={{ background: "var(--bg-primary)", transition: "background 0.25s ease" }}
    >
      <Navbar activeSection={SECTIONS[activeIndex].id} onNavigate={goToSection} />
      <ChatBot />
      <CursorTrail />

      {/* Scroll length only. Nothing here is ever painted. */}
      <div className="deck" aria-hidden="true">
        {SECTIONS.map(({ id }, i) => (
          <div key={id} id={`${id}-slot`} className="deck__slot" data-index={i} />
        ))}
      </div>

      {/* The scenes. Stacked and fixed, so a change swaps content in place
          rather than moving the page. */}
      <div className="deck__view">
        {SECTIONS.map(({ id, Panel }, i) => {
          // Where a scene rests depends on which side of the current one it
          // sits, which is what makes the zoom directional: coming down from
          // a smaller scale reads as a push in, coming back up from a larger
          // scale reads as a pull out. No direction state needed.
          const relation =
            i === activeIndex ? "is-active" : i < activeIndex ? "is-above" : "is-below";

          return (
            <section
              key={id}
              id={id}
              className={`stage ${relation}`}
              inert={i !== activeIndex}
            >
              <div className="stage__panel">
                <Panel />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <RouteWipe />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/article/:slug" element={<ArticlePage />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
        <Route path="/education/ucla" element={<UCLAPage />} />
        <Route path="/education/ucsd" element={<UCSDPage />} />
      </Routes>
    </>
  );
}

export default App;
