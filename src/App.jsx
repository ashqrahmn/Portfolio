import { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Services from "./components/Services";
import Project from "./components/Project";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Determine initial dark mode
const getInitialTheme = () => {
  if (typeof localStorage !== "undefined") {
    if (localStorage.theme === "dark") return true;
    if (localStorage.theme === "light") return false;
  }
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
};

// Detect browser
const getBrowser = () => {
  if (typeof navigator === "undefined") return "Unknown";

  const ua = navigator.userAgent;
  const uaLower = ua.toLowerCase();

  if (navigator.brave && typeof navigator.brave.isBrave === "function") return "Brave";
  if (ua.includes("Vivaldi")) return "Vivaldi";
  if (ua.includes("DuckDuckGo")) return "DuckDuckGo";
  if (ua.includes("SamsungBrowser")) return "Samsung Internet";
  if (ua.includes("Librewolf")) return "Librewolf";
  if (uaLower.includes("tor")) return "Tor";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("OPR") || ua.includes("Opera")) return "Opera";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";

  return "Unknown";
};

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);
  const [visitorId, setVisitorId] = useState(null);

  // Dark mode
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      root.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [isDarkMode]);

  // Favicon
  useEffect(() => {
    const favicon = document.getElementById("favicon");
    if (favicon) favicon.href = isDarkMode ? "/A_white.svg" : "/A_black.svg";
  }, [isDarkMode]);

  // Disable right-click
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  // Visitor logs
 useEffect(() => {
    const existingId = sessionStorage.getItem("visitor_id");
    if (existingId) {
      setVisitorId(existingId);
      return;
    }

    const logVisitor = async () => {
      const browser = getBrowser();
      try {
        const res = await fetch("/api/visitor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ browser }),
        });
        const data = await res.json();
        sessionStorage.setItem("visitor_id", data.data.visitor_id);
        setVisitorId(data.data.visitor_id);
      } catch (error) {
        console.error("Failed to log visitor", error);
      }
    };

    logVisitor();
  }, []);

  return (
    <>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Header isDarkMode={isDarkMode} visitorId={visitorId} />
      <About isDarkMode={isDarkMode} />
      <Services isDarkMode={isDarkMode} />
      <Project isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </>
  );
};

export default App;