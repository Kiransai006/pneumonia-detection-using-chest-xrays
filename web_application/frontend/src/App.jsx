import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DetectPage from "./pages/DetectPage.jsx";
import PerformancePage from "./pages/PerformancePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";


export default function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn") === "true");
  const [activePage, setActivePage] = useState("detect");

  function handleLogin() {
    localStorage.setItem("loggedIn", "true");
    setLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
  }

if (!loggedIn) {
  return <LoginPage onLogin={handleLogin} />;
}

  return (
    <div>
      <Navbar activePage={activePage} setActivePage={setActivePage} onLogout={handleLogout} />
      <div className="container">
        {activePage === "detect" && <DetectPage />}
        {activePage === "performance" && <PerformancePage />}
        {activePage === "about" && <AboutPage />}
      </div>
    </div>
  );
}