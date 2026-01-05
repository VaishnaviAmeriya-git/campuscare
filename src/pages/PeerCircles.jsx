import { useState, useEffect } from "react";
import { db, ensureAuth, auth } from "../firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";

export default function PeerCircles() {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "peer_posts"), orderBy("createdAt", "desc"));

    return onSnapshot(q, (snap) => {
      const list = [];
      snap.forEach((d) => list.push(d.data()));
      setPosts(list);
    });
  }, []);

  async function post() {
    if (!text.trim()) return;

    await ensureAuth();

    await addDoc(collection(db, "peer_posts"), {
      text,
      uid: auth.currentUser.uid,
      createdAt: serverTimestamp()
    });

    setText("");
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-3">Peer Circles</h2>

      <textarea
        className="border w-full p-2 rounded mb-2"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share something supportive..."
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={post}>
        Post
      </button>

      <ul className="mt-4 space-y-2">
        {posts.map((p, i) => (
          <li key={i} className="border p-2 rounded bg-gray-50">
            {p.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
