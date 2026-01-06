import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export async function getResources() {
  const q = query(
    collection(db, "resources"),
    orderBy("created_at", "desc")
  );

  const snap = await getDocs(q);

  return snap.docs.map(d => ({
    id: d.id,
    ...d.data()
  }));
}
