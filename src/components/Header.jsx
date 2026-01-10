import { useTheme } from "../context/ThemeContext";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center px-4 py-3 bg-white dark:bg-gray-800 shadow-sm">
      <h1 className="font-bold text-lg text-gray-900 dark:text-white">
        CampusCare
      </h1>

      <button
        onClick={toggleTheme}
        className="text-sm px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
      >
        {theme === "dark" ? "☀ Light" : "🌙 Dark"}
      </button>
      <nav className="flex gap-4 text-sm text-gray-600 dark:text-gray-300">
          <a href="/">Home</a>
          <a href="/mood">Mood</a>
          <a href="/mitra">Mitra</a>
          <a href="/review">Review</a>
          <a href="/peers">Circles</a>
        </nav>
    </header>
  );
}
