import { useState, useEffect } from "react";

const STORAGE_KEY = "currency-exchange:favorites";

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // localStorage indisponível: favoritos valem só durante a sessão
    }
  }, [favorites]);

  const isFavorite = (from, to) =>
    favorites.some((f) => f.from === from && f.to === to);

  function toggleFavorite(from, to) {
    if (from === to) return;
    setFavorites((prev) =>
      prev.some((f) => f.from === from && f.to === to)
        ? prev.filter((f) => !(f.from === from && f.to === to))
        : [...prev, { from, to }]
    );
  }

  return { favorites, isFavorite, toggleFavorite };
}
