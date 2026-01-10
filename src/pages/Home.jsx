import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import MitraCard from "../components/MitraCard";
import FeatureCard from "../components/FeatureCard";
import { getQuote } from "../utils/quotes";
import { getUserProfile, createUserProfile } from "../api/userProfile";
import { saveMood, getTodayMoods } from "../api/mood";

export default function Home() {
  const [todayMoods, setTodayMoods] = useState([]);

  /* ---------------- Daily Quote ---------------- */
  const quote = useMemo(() => getQuote(), []);

  /* ---------------- Load User Profile ---------------- */
  useEffect(() => {
    async function loadProfile() {
      const profile = await getUserProfile();
      if (!profile) {
        await createUserProfile({
          anonymous_name: "Friend",
          dark_mode: false
        });
      }
    }
    loadProfile();
  }, []);

  /* ---------------- Load Today’s Moods ---------------- */
  useEffect(() => {
    getTodayMoods().then(setTodayMoods);
  }, []);

  /* ---------------- Service Worker Listener ---------------- */
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        if (event.data?.type === "MOOD_SELECTED") {
          console.log("Mood from notification:", event.data.mood);
          saveMood(event.data.mood);
        }
      });
    }
  }, []);

  /* ---------------- Mood Handler ---------------- */
  const handleMood = async (emoji) => {
    await saveMood(emoji);
    setTodayMoods((prev) => [...prev, emoji]);
  };

  /* ---------------- Mood Summary ---------------- */
  function getMoodSummary(moods) {
    if (moods.length === 0) return "No check-ins today.";
    if (moods.includes("😣") || moods.includes("😔")) return "Today felt a bit heavy.";
    if (moods.includes("😄") || moods.includes("🙂")) return "There were some lighter moments today.";
    return "Today felt steady.";
  }

  /* ---------------- UI ---------------- */
return (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <Header />

    <main className="max-w-4xl mx-auto px-4 py-8 space-y-8">

      {/* Welcome */}
      <section className="bg-white dark:bg-gray-800 p-7 rounded-3xl shadow-sm space-y-3">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Welcome to CampusCare 🌱
        </h2>

        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Your gentle companion for emotional fitness — not therapy, not labels.
        </p>

        <p className="italic text-sm text-indigo-500 dark:text-indigo-400">
          {quote}
        </p>
      </section>

      {/* Today’s Mood Summary */}
      {todayMoods.length > 0 && (
        <section className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm space-y-2">
          <h3 className="text-base font-medium text-gray-800 dark:text-gray-200">
            Today’s mood
          </h3>

          <div className="text-2xl tracking-wide">
            {todayMoods.slice(-6).join(" ")}
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            {getMoodSummary(todayMoods)}
          </p>
        </section>
      )}

      {/* 🌼 Mitra Entry */}
      <section className="space-y-2">
        <MitraCard />

        <p className="text-xs text-gray-500 dark:text-gray-400 pl-2">
          If things ever feel unsafe,
          <a
            href="/support"
            className="text-indigo-600 dark:text-indigo-400 ml-1 underline underline-offset-2"
          >
            help is available.
          </a>
        </p>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FeatureCard
          href="/mood"
          title="😊 Mood Tracker"
          desc="Quick check-ins & gentle patterns."
        />
        <FeatureCard
          href="/journal"
          title="📓 Journal"
          desc="Write freely, no pressure."
        />
        <FeatureCard
          href="/peers"
          title="👥 Peer Circles"
          desc="Anonymous support spaces."
        />
        <FeatureCard
          href="/review"
          title="📊 Daily Review"
          desc="Gentle AI reflection."
        />
        <FeatureCard
          href="/mitra"
          title="🤖 Mitra AI"
          desc="Talk first. Decide later."
          highlight
        />
        <FeatureCard
          href="/resources"
          title="📚 Resources"
          desc="Short, calming reads."
        />
        <FeatureCard
          href="/exercises"
          title="🧘‍♀️ Exercises"
          desc="Simple things you can do on your own."
        />
        <FeatureCard
          href="/support"
          title="🚨 Need immediate support?"
          desc="Confidential help when things feel overwhelming."
        />
      </section>

      {/* Footer reassurance */}
      <p className="text-center text-xs text-gray-400 dark:text-gray-500 pt-6">
        CampusCare doesn’t replace people — it helps you reach them sooner 💙
      </p>

    </main>
  </div>
);

}
