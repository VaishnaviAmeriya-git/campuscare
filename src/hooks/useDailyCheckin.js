export function schedule11PMCheckin() {
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  const now = new Date();
  const target = new Date();

  //target.setHours(23, 0, 0, 0);
  target.setMinutes(target.getMinutes() + 1);


  if (target <= now) {
    target.setDate(target.getDate() + 1);
  }

  const delay = target.getTime() - now.getTime();

  setTimeout(() => {
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification("CampusCare 🌱", {
        body: "How did today feel for you?",
        icon: "/icon.png",
        tag: "daily-checkin"
      });
    });
  }, delay);
}
