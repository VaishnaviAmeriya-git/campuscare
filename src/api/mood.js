import { db, auth } from "../firebase";
import { collection, addDoc, getDocs, query, where, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function waitForUser() {
  return new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        unsub();
        resolve(user);
      }
    });
  });
}

export async function addMoodEntry({ mood_score, mood_emoji, notes }) {
  const user = auth.currentUser || await waitForUser();

  const today = new Date().toISOString().split("T")[0];

  return addDoc(collection(db, "moodEntries"), {
    user_id: user.uid,
    mood_score,
    mood_emoji,
    notes: notes || "",
    date: today,
    created_at: new Date().toISOString()
  });
}

export async function getTodaysMood() {
  const user = auth.currentUser || await waitForUser();
  const today = new Date().toISOString().split("T")[0];

  const q = query(
    collection(db, "moodEntries"),
    where("user_id", "==", user.uid),
    where("date", "==", today),
    orderBy("created_at", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
