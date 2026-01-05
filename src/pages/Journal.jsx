import { useState, useEffect } from "react";
import { db, auth, ensureAuth } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "firebase/firestore";

export default function Journal() {
  const [text, setText] = useState("");
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function load() {
      await ensureAuth();

      const ref = collection(
        db,
        "users",
        auth.currentUser.uid,
        "journal"
      );

      const q = query(ref, orderBy("createdAt", "desc"));

      return onSnapshot(q, (snap) => {
        const list = [];
        snap.forEach((doc) =>
          list.push({ id: doc.id, ...doc.data() })
        );
        setEntries(list);
      });
    }

    load();
  }, []);

  async function save() {
    if (!text.trim()) return;

    try {
      await ensureAuth();

      await addDoc(
        collection(db, "users", auth.currentUser.uid, "journal"),
        {
          text,
          createdAt: serverTimestamp()
        }
      );

      setText("");
      setStatus("Saved!");
    } catch (err) {
      console.error(err);
      setStatus("Error saving entry");
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-3">
        Daily Journal
      </h2>

      <textarea
        className="border w-full p-2 rounded"
        rows={4}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your thoughts here..."
      />

      <button
        className="mt-3 bg-purple-600 text-white px-4 py-2 rounded"
        onClick={save}
      >
        Save Entry
      </button>

      {status && <p className="mt-2">{status}</p>}

      <h3 className="text-lg font-semibold mt-6 mb-2">
        Previous entries
      </h3>

      {entries.length === 0 && <p>No entries yet.</p>}

      <ul className="space-y-3">
        {entries.map((e) => (
          <li key={e.id} className="border p-3 rounded">
            {e.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
