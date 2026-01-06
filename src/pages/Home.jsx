import React, { useEffect, useState } from "react";

import { getUserProfile, createUserProfile } from "../api/userProfile";


export default function Home() {
  useEffect(() => {
  async function load() {
    const profile = await getUserProfile();

    if (!profile) {
      await createUserProfile({
        anonymous_name: "Friend",
        dark_mode: false
      });
    }
  }

  load();
}, []);
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
      <h2 className="text-xl font-bold">Welcome to CampusCare</h2>

      <p className="text-gray-600">
        Your wellbeing companion — track moods, journal thoughts, talk to Mitra,
        join circles, and reflect on your progress.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
        <a
          href="/mood"
          className="block border rounded-xl p-4 hover:shadow-md transition"
        >
          <h3 className="font-semibold">😊 Mood Tracker</h3>
          <p className="text-gray-600 text-sm">
            Log how you feel and notice emotional patterns.
          </p>
        </a>

        <a
          href="/journal"
          className="block border rounded-xl p-4 hover:shadow-md transition"
        >
          <h3 className="font-semibold">📓 Journal</h3>
          <p className="text-gray-600 text-sm">
            Write freely — thoughts, worries, gratitude.
          </p>
        </a>

        <a
          href="/peers"
          className="block border rounded-xl p-4 hover:shadow-md transition"
        >
          <h3 className="font-semibold">👥 Peer Circles</h3>
          <p className="text-gray-600 text-sm">
            Share experiences and support others safely.
          </p>
        </a>

        <a
          href="/review"
          className="block border rounded-xl p-4 hover:shadow-md transition"
        >
          <h3 className="font-semibold">📊 Daily Review</h3>
          <p className="text-gray-600 text-sm">
            AI reflection based on moods + journals.
          </p>
        </a>

        <a
          href="/mitra"
          className="block border rounded-xl p-4 hover:shadow-md transition"
        >
          <h3 className="font-semibold">🤖 Mitra AI</h3>
          <p className="text-gray-600 text-sm">
            Have a gentle conversation — get support.
          </p>
        </a>
      </div>
    </div>
  );
}
