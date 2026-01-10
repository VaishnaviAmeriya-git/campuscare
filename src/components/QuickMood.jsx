import { saveMood } from "../api/mood";

const moods = ["😊", "😐", "😔", "😣", "😌"];

export default function QuickMood() {
  async function pickMood(emoji) {
    await saveMood(emoji);
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        How’s your emotional weather right now?
      </p>

      <div className="flex gap-3 text-2xl">
        {moods.map(m => (
          <button
            key={m}
            onClick={() => pickMood(m)}
            className="hover:scale-110 transition"
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}
