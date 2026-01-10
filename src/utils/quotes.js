export const quotes = [
  "You don’t have to feel okay to be okay.",
  "Some days just need softness.",
  "You showed up. That counts.",
  "Nothing to fix right now.",
  "We can sit here a bit."
];

export function getQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}
