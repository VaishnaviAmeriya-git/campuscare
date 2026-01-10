import { useState } from "react";
import { saveMood } from "../api/mood";

export default function MitraCard() {
  const [selectedMood, setSelectedMood] = useState(null);

  function handleMoodSelect(emoji) {
    setSelectedMood(emoji);
    saveMood(emoji); // silent + private
  }

  return (
    <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700 p-5 rounded-2xl shadow-sm space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        🌼 Mitra
      </h3>

      <p className="text-gray-700 dark:text-gray-300 text-sm">
        I’m here to listen.  
        No judgment. No labels.
      </p>

      {/* Mood buttons */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          How’s your energy right now?
        </p>

        <div className="flex justify-between text-2xl">
          {["😄", "🙂", "😐", "😕", "😞"].map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleMoodSelect(emoji)}
              className="hover:scale-110 transition"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Mitra response */}
      {selectedMood && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl text-sm space-y-2">
          <p className="text-gray-700 dark:text-gray-300">
            Thanks for sharing that 💙  
            You don’t have to explain anything.
          </p>

          <p className="italic text-gray-600 dark:text-gray-400">
            Want to talk — or just sit quietly for a bit?
          </p>

          <div className="flex gap-4 pt-2">
            <a
              href="/mitra"
              className="text-sm font-medium text-indigo-600 hover:underline"
            >
              Talk with Mitra
            </a>

            <a
              href="/mood"
              className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
            >
              Track & continue
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
