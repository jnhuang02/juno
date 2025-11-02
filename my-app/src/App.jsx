import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar'; // Ensure correct import path
import Home from './components/Home';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import ContactMe from './components/ContactMe';
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <>
      <div>
        <Navbar/>
        <ChatBot />

      </div>
      
      <Routes>
        <Route path = "/juno" element = {<Home />} />
        <Route path="/AboutMe" element={<AboutMe />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/ContactMe" element={<ContactMe />} />
      </Routes>


    </>

    

  );
}

export default App;