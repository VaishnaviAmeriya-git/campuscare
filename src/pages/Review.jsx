import { useState, useEffect } from "react";
import { db, auth, ensureAuth } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export default function Review() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateReview() {
    setLoading(true);
    await ensureAuth();

    const moodsRef = collection(db, "users", auth.currentUser.uid, "moods");
    const journalRef = collection(db, "users", auth.currentUser.uid, "journal");

    const moodSnap = await getDocs(query(moodsRef, orderBy("createdAt", "desc")));
    const journalSnap = await getDocs(query(journalRef, orderBy("createdAt", "desc")));

    const moods = [];
    const notes = [];

    moodSnap.forEach((d) => moods.push(d.data().mood));
    journalSnap.forEach((d) => notes.push(d.data().text));

    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" +
        import.meta.env.VITE_GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
Analyze mood patterns + journal reflections.

Moods: ${moods.join(", ")}
Journal notes: ${notes.join(" | ")}

Give:
• short emotional summary
• 1–2 strengths
• 1 gentle suggestion 
No medical advice.
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
    <div className="p-6">
      <h2 className="text-xl font-bold mb-3">Daily Review</h2>

      <button
        onClick={generateReview}
        className="bg-orange-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Generate Review"}
      </button>

      {summary && (
        <div className="mt-4 border p-3 rounded bg-gray-50 whitespace-pre-wrap">
          {summary}
        </div>
      )}
    </div>
  );
}
