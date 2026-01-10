const quotes = [
  "You survived today. That counts 🌱",
  "Even slow progress is progress 🐢",
  "Your mind deserves rest too ☁️",
  "You don’t have to be strong all the time 💙",
  "Small steps still move you forward ✨"
];

export default function DailyQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  return (
    <p style={{ fontStyle: "italic", opacity: 0.8 }}>
      {quote}
    </p>
  );
}
