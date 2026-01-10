import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { query, where, getDocs } from "firebase/firestore";

export async function saveMood(emoji) {
  return addDoc(collection(db, "moods"), {
    emoji,
    createdAt: serverTimestamp()
  });
}

export async function getTodayMoods() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const q = query(
    collection(db, "moods"),
    where("createdAt", ">=", start)
  );

  const snap = await getDocs(q);
  return snap.docs.map(d => d.data().emoji);
}
