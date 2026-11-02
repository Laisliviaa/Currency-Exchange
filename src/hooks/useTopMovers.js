import { useState, useEffect } from "react";
import { getRatesSeries } from "../services/frankfurter";
import { getRange } from "../utils/dates";
import { getTopMovers } from "../utils/topMovers";

export function useTopMovers(base) {
  const [movers, setMovers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!base) return;
    let cancelled = false;
    const { start, end } = getRange(30);

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const json = await getRatesSeries(base, start, end);
        if (!cancelled) setMovers(getTopMovers(json.rates));
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [base]);

  return { movers, loading, error };
}