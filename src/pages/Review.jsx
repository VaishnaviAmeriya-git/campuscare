import { useState } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { motion } from "framer-motion";
import { db } from "../firebase";

export default function Review() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateReview() {
    setLoading(true);


    const moodsRef = collection(db, "users", auth.currentUser.uid, "moods");
    const journalRef = collection(db, "users", auth.currentUser.uid, "journal");

    const moodSnap = await getDocs(query(moodsRef, orderBy("createdAt", "desc")));
    const journalSnap = await getDocs(query(journalRef, orderBy("createdAt", "desc")));

    const moods = [];
    const notes = [];

    moodSnap.forEach((d) => moods.push(d.data().mood));
    journalSnap.forEach((d) => notes.push(d.data().text));

    const res = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Use the information below and write:
• short emotional reflection
• strengths noticed
• 1 gentle suggestion
(no medical advice)

Moods: ${moods.join(", ")}
Journal: ${notes.join(" | ")}
`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await res.json();
    setSummary(data?.candidates?.[0]?.content?.parts?.[0]?.text || "No data yet.");

    setLoading(false);
  }

  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm space-y-3"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-bold">Daily Review</h2>

      <button
        onClick={generateReview}
        className="bg-orange-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Analyzing..." : "Generate Review"}
      </button>

      {summary && (
        <div className="mt-4 border p-3 rounded bg-gray-50 whitespace-pre-wrap">
          {summary}
        </div>
      )}
    </motion.div>
  );
}
