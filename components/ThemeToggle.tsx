"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("cc-theme") as "dark" | "light" | null;
    if (saved) setTheme(saved);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.className = next;
    localStorage.setItem("cc-theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="テーマ切替"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2c2c2e] dark:bg-[#2c2c2e] light:bg-[#e5e5ea] text-[#8e8e93] text-lg shadow transition active:scale-95"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
