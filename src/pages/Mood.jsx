import { useState, useEffect } from "react";
import { db, auth, ensureAuth } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";

export default function Mood() {
  const [mood, setMood] = useState("🙂");
  const [status, setStatus] = useState("");
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    async function load() {
      await ensureAuth();

      const moodsRef = collection(
        db,
        "users",
        auth.currentUser.uid,
        "moods"
      );

      const q = query(moodsRef, orderBy("createdAt", "desc"));

      return onSnapshot(q, (snap) => {
        const list = [];
        snap.forEach((doc) => list.push(doc.data()));
        setMoods(list);
      });
    }

    load();
  }, []);

  async function saveMood() {
    try {
      await ensureAuth();

      await addDoc(
        collection(db, "users", auth.currentUser.uid, "moods"),
        {
          mood,
          createdAt: serverTimestamp()
        }
      );

      setStatus("Mood saved!");
    } catch (err) {
      console.error(err);
      setStatus("Error saving mood");
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-3">How are you feeling?</h2>

      <select
        className="border p-2 rounded"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      >
        <option>🙂</option>
        <option>😢</option>
        <option>😡</option>
        <option>😟</option>
        <option>😎</option>
      </select>

      <button
        className="block mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={saveMood}
      >
        Save Mood
      </button>

      {status && <p className="mt-3">{status}</p>}

      <h3 className="text-lg font-semibold mt-6 mb-2">
        Recent moods
      </h3>

      {moods.length === 0 && <p>No moods yet.</p>}

      <ul className="space-y-2">
        {moods.map((m, i) => (
          <li key={i} className="border p-2 rounded">
            {m.mood}
          </li>
        ))}
      </ul>
    </div>
  );
}
