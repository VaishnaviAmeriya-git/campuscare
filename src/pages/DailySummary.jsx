export default function DailySummary({ moods }) {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl">
      <h2 className="text-xl font-semibold mb-2">
        🌙 Your day, gently
      </h2>

      <p className="text-2xl">
        {moods.join(" ")}
      </p>

      <p className="text-sm text-gray-600 mt-3">
        Some days are heavy. Some are light.  
        You showed up anyway.
      </p>
    </div>
  );
}
