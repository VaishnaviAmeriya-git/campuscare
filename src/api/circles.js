import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { db, auth } from "../firebase";

export default function PeerCircles() {

  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const postsRef = collection(db, "peer_circles");
    const q = query(postsRef, orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snap) => {
      const list = [];
      snap.forEach((doc) =>
        list.push({ id: doc.id, ...doc.data() })
      );
      setPosts(list);
    });

    return () => unsub();
  }, []);

  async function submitPost() {
    if (!text.trim()) return;

    try {
      await addDoc(collection(db, "peer_circles"), {
        text,
        uid: auth.currentUser?.uid || "anon",
        createdAt: serverTimestamp()
      });

      setText("");
      setStatus("Shared!");
    } catch (err) {
      console.error(err);
      setStatus("Couldn't post. Check permissions.");
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm space-y-3">
      <h2 className="text-xl font-bold">Peer Circles</h2>

      <textarea
        className="border w-full p-2 rounded"
        rows={3}
        placeholder="Share something helpful or thoughtful…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={submitPost}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        Post
      </button>

      {status && <p className="text-green-600 text-sm">{status}</p>}

      <h3 className="font-semibold mt-4">Community posts</h3>

      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="border p-3 rounded bg-gray-50">
            {p.text}
          </div>
        ))}
      </div>
    </div>
  );
}
