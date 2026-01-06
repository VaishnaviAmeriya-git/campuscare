import React, { useEffect, useState } from "react";
import { addJournalEntry, getJournalEntries } from "../api/journal";

export default function Journal() {

  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getJournalEntries();
      setEntries(data);
      setLoading(false);
    }

    load();
  }, []);

  async function saveJournal() {
    if (!content.trim()) {
      alert("Write something first 🙂");
      return;
    }

    await addJournalEntry({ title, content });

    setTitle("");
    setContent("");

    const data = await getJournalEntries();
    setEntries(data);
  }

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-xl font-bold">Journal</h1>

      <input
        className="border p-2 w-full rounded"
        placeholder="Title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full rounded"
        rows={5}
        placeholder="Write your thoughts…"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={saveJournal}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>

      <hr />

      {loading ? (
        <p>Loading...</p>
      ) : entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        entries.map(e => (
          <div key={e.id} className="border p-3 rounded mb-2">
            <h3 className="font-semibold">{e.title || "Untitled"}</h3>
            <p className="text-sm text-gray-700">{e.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
