const moods = [
  { emoji: "😊", label: "Good" },
  { emoji: "😐", label: "Okay" },
  { emoji: "😔", label: "Low" },
  { emoji: "😣", label: "Stressed" }
];

export default function MoodSelector({ onSelect }) {
  return (
    <div style={{ display: "flex", gap: "12px" }}>
      {moods.map(m => (
        <button
          key={m.label}
          onClick={() => onSelect(m)}
          style={{
            fontSize: "24px",
            background: "transparent",
            border: "none",
            cursor: "pointer"
          }}
        >
          {m.emoji}
        </button>
      ))}
    </div>
  );
}
