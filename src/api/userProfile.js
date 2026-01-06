import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

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

export async function getUserProfile() {
  const user = auth.currentUser || await waitForUser();
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
}

export async function createUserProfile(data) {
  const user = auth.currentUser || await waitForUser();
  const ref = doc(db, "users", user.uid);
  await setDoc(ref, data);
}

export async function updateUserProfile(data) {
  const user = auth.currentUser || await waitForUser();
  const ref = doc(db, "users", user.uid);
  await updateDoc(ref, data);
}
