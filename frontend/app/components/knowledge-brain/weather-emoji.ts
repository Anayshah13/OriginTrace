/**
 * Maps weather API / backend `weather_text` snippets to a representative emoji.
 */
export function weatherEmojiFromText(text: string): string {
  const t = text.toLowerCase();

  if (/hurricane|cyclone|typhoon|tornado/.test(t)) return '🌀';
  if (/thunder|lightning|storm/.test(t)) return '⛈️';
  if (/blizzard|snow|sleet|ice\s|freezing/.test(t)) return '❄️';
  if (/rain|drizzle|shower|precipitation/.test(t)) return '🌧️';
  if (/fog|mist|haze|smoke/.test(t)) return '🌫️';
  if (/wind|breezy|gale|blustery/.test(t)) return '💨';
  if (/clear|sunny|sun\b/.test(t)) return '☀️';
  if (/overcast|cloud/.test(t)) return '☁️';
  if (/partly/.test(t)) return '🌤️';
  if (/hot|heat/.test(t)) return '🌡️';
  if (/cold|frigid|frost/.test(t)) return '🧊';
  if (/unknown|unavailable|n\/a/.test(t)) return '🌍';

  return '🌐';
}
