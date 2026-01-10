export default function Exercises() {
  const exercises = [
    {
      title: "🌬️ Calm breathing (1 minute)",
      steps: [
        "Breathe in slowly for 4 seconds",
        "Hold gently for 2 seconds",
        "Breathe out for 6 seconds",
        "Repeat a few times"
      ]
    },
    {
      title: "🪑 Grounding (where you are)",
      steps: [
        "Name 3 things you can see",
        "Name 2 things you can touch",
        "Name 1 sound you can hear"
      ]
    },
    {
      title: "🧠 Release tension",
      steps: [
        "Clench your shoulders for 3 seconds",
        "Let them drop",
        "Notice the difference"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        🧘‍♀️ Exercises
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Gentle things you can try.  
        No goals. No right way.
      </p>

      <div className="space-y-5">
        {exercises.map((ex, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {ex.title}
            </h3>

            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
              {ex.steps.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
