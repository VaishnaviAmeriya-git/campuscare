import React, { useEffect, useState } from "react";
import { getResources } from "../api/resources";

export default function Resources() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getResources();
      setItems(data);
      setLoading(false);
    }

    load();
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Helpful Resources</h1>

      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No resources yet.</p>
      ) : (
        items.map(r => (
          <div key={r.id} className="border rounded p-3 space-y-1">
            <h3 className="font-semibold">{r.title}</h3>

            <p className="text-sm text-gray-600">
              {r.description}
            </p>

            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
              {r.category}
            </span>

            <a
              className="text-blue-600 block mt-1 underline"
              href={r.link}
              target="_blank"
              rel="noreferrer"
            >
              Open
            </a>
          </div>
        ))
      )}
    </div>
  );
}
