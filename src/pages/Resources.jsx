export default function Resources() {
  const resources = [
    {
      title: "Feeling overwhelmed?",
      desc: "Short reads to calm your mind when everything feels too much."
    },
    {
      title: "Exam stress",
      desc: "Simple ways to steady yourself before tests and deadlines."
    },
    {
      title: "Low energy days",
      desc: "Gentle ideas for days when motivation is low."
    },
    {
      title: "Sleep & rest",
      desc: "Why rest matters — without pressure or guilt."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        📚 Resources
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        No pressure. Just gentle things you can read when you want.
      </p>

      <div className="space-y-4">
        {resources.map((r, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {r.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {r.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
