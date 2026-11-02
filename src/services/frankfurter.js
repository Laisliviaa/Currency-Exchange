const BASE_URL = "https://api.frankfurter.dev/v1";

async function request(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    // o texto da mensagem é montado na interface (traduzido)
    throw Object.assign(new Error(`HTTP ${res.status}`), { status: res.status });
  }
  return res.json();
}

export const getCurrencies = () => request("/currencies");

export const getLatestRate = (from, to) =>
  request(`/latest?base=${from}&symbols=${to}`);

export const getHistory = (from, to, start, end) =>
  request(`/${start}..${end}?base=${from}&symbols=${to}`);

export const getRatesSeries = (base, start, end) =>
  request(`/${start}..${end}?base=${base}`);
