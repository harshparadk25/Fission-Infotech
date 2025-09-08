import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 
                 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 
                 shadow-md hover:shadow-lg transition"
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
