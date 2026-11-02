export function getTopMovers(rates, limit = 3) {
  const dates = Object.keys(rates).sort();
  if (dates.length < 2) return [];
  const first = rates[dates[0]];
  const last = rates[dates[dates.length - 1]];
  return Object.keys(last)
    .filter((code) => first[code])
    .map((code) => ({
      code,
      rate: last[code],
      change: ((last[code] - first[code]) / first[code]) * 100,
    }))
    .sort((a, b) => b.change - a.change)
    .slice(0, limit);
}