import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import WebAppPages from "./pages/WebApp";
import Presale from "./pages/LandingSubpages/Presale";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Web App Routes routes first */}
        <Route path="/app/*" element={<WebAppPages />} />
        
        {/* Standalone Presale Page - No header/footer */}
        <Route path="/presale" element={<Presale />} />

        {/* Landing Page Routes - Catch-all route last */}
        <Route path="/*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
