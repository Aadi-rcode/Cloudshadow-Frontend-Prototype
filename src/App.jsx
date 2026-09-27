import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CostAnalysis from "./pages/CostAnalysis.jsx";
import Services from "./pages/Services.jsx";
import RootCause from "./pages/RootCause.jsx";
import Dependencies from "./pages/Dependencies.jsx";
import Recommendations from "./pages/Recommendations.jsx";

const PAGE_TITLES = {
  "/": "Overview",
  "/cost": "Cost Analysis",
  "/services": "Services",
  "/root-cause": "Root Cause",
  "/dependencies": "Dependencies",
  "/recommendations": "Recommendations",
};

export default function App() {
  const [period, setPeriod] = useState("30d");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = PAGE_TITLES[location.pathname] ?? "CloudShadow";

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-column">
        <Navbar
          title={title}
          period={period}
          onPeriodChange={setPeriod}
          onMenuClick={() => setSidebarOpen((v) => !v)}
        />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard period={period} />} />
            <Route path="/cost" element={<CostAnalysis period={period} />} />
            <Route path="/services" element={<Services />} />
            <Route path="/root-cause" element={<RootCause />} />
            <Route path="/dependencies" element={<Dependencies />} />
            <Route
              path="/recommendations"
              element={<Recommendations />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
