import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy
} from "firebase/firestore";
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

export async function addJournalEntry({ title, content }) {
  const user = auth.currentUser || await waitForUser();

  return addDoc(collection(db, "journalEntries"), {
    user_id: user.uid,
    title,
    content,
    date: new Date().toISOString().split("T")[0],
    created_at: new Date().toISOString()
  });
}

export async function getJournalEntries() {
  const user = auth.currentUser || await waitForUser();

  const q = query(
    collection(db, "journalEntries"),
    where("user_id", "==", user.uid),
    orderBy("created_at", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}
