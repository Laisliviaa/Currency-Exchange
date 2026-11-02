export const PERIODS = [7, 15, 30, 90, 180, 365, 1825, 3650];

const fmt = (d) => d.toISOString().slice(0, 10);

export function getRange(days) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);
  return { start: fmt(start), end: fmt(end) };
}

// Função global para formatar de YYYY-MM-DD para DD/MM/AA em todo o site
export function formatDate(dateString) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  if (!year || !month || !day) return dateString;
  return `${day}/${month}/${year.slice(-2)}`;
}