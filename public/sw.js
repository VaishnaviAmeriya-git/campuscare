self.addEventListener("push", (event) => {
  let data = {};

  try {
    data = event.data?.json() || {};
  } catch {
    data = { body: "How did today feel for you?" };
  }

  self.registration.showNotification("CampusCare 🌱", {
    body: "How did today feel for you?",
    icon: "/icon.png",
    tag: "daily-checkin",
    requireInteraction: false,
    actions: [
      { action: "happy", title: "😊" },
      { action: "okay", title: "😐" },
      { action: "low", title: "😔" },
      { action: "stressed", title: "😣" }
    ]
  });
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const mood = event.action || "opened";

  console.log("Mood selected from notification:", mood);

  // OPTIONAL: send to app (later Firestore)
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        if (clients.length > 0) {
          clients[0].postMessage({
            type: "MOOD_SELECTED",
            mood
          });
        }
      })
  );
});
