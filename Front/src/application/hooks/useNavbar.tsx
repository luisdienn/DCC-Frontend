"use client";
import { useState, useEffect, useRef } from "react";

export const useNavbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // Simulación de autenticación
  const [isMenuOpenDesktop, setIsMenuOpenDesktop] = useState<boolean>(false);
  const [isMenuOpenMobile, setIsMenuOpenMobile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const menuRefDesktop = useRef<HTMLDivElement>(null);
  const menuRefMobile = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRefDesktop.current && !menuRefDesktop.current.contains(event.target as Node)) {
        setIsMenuOpenDesktop(false);
      }
      if (menuRefMobile.current && !menuRefMobile.current.contains(event.target as Node)) {
        setIsMenuOpenMobile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    isAuthenticated: true,
    isMenuOpenDesktop,
    setIsMenuOpenDesktop,
    isMenuOpenMobile,
    setIsMenuOpenMobile,
    isDarkMode,
    toggleDarkMode,
    menuRefDesktop,
    menuRefMobile,
  };
};
