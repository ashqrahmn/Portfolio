import { useEffect, useLayoutEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Services from "./components/Services";
import Project from "./components/Project";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Helper function to determine the initial theme based on localStorage or system preference
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

const App = () => {
  // State to manage the dark mode theme
  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  // Effect to apply the dark mode class to the root element and update localStorage
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

  // Effect to update the website's favicon based on the current theme
  useEffect(() => {
    const favicon = document.getElementById("favicon");
    if (favicon) {
      favicon.href = isDarkMode ? "/A_white.svg" : "/A_black.svg";
    }
  }, [isDarkMode]);

  // Effect to disable the right-click context menu
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return (
    <>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Header isDarkMode={isDarkMode} />
      <About isDarkMode={isDarkMode} />
      <Services isDarkMode={isDarkMode} />
      <Project isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </>
  );
};

export default App;