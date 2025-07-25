import { useState, useEffect } from "react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-6 max-w-2xl flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Task Tracker
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}