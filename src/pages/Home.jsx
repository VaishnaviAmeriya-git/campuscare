import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">CampusCare</h1>

      <p className="mb-4">
        Your wellbeing companion — track moods, journal, talk to Mitra, join peer circles, and review your progress.
      </p>

      <div className="space-x-2">
        <Link className="bg-blue-600 text-white px-4 py-2 rounded" to="/mood">
          Mood Tracker
        </Link>

        <Link className="bg-purple-600 text-white px-4 py-2 rounded" to="/journal">
          Journal
        </Link>

        <Link className="bg-green-600 text-white px-4 py-2 rounded" to="/mitra">
          Mitra AI
        </Link>

        <Link className="bg-orange-600 text-white px-4 py-2 rounded" to="/review">
          Daily Review AI
        </Link>
      </div>
    </div>
  );
}
