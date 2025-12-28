import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App"; // <-- default import instead of { App }
import "./index.css";

// create a root using React 18+/19 API
const rootElement = document.getElementById("root");
// (optional guard) if (!rootElement) throw new Error('Root element #root not found');

createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter basename="/juno">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);