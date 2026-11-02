import { useState, useEffect } from "react";

export const ACCENTS = [
  { id: "purple", color: "#7c3aed", contrast: "#ffffff" },
  { id: "pink", color: "#db2777", contrast: "#ffffff" },
  { id: "blue", color: "#2563eb", contrast: "#ffffff" },
  { id: "yellow", color: "#facc15", contrast: "#1a202c" },
  { id: "green", color: "#16a34a", contrast: "#ffffff" },
  { id: "orange", color: "#ea580c", contrast: "#ffffff" },
  { id: "red", color: "#dc2626", contrast: "#ffffff" },
];

const KEY = "currency-exchange:settings";

function initial() {
  let saved = {};
  try {
    saved = JSON.parse(localStorage.getItem(KEY)) || {};
  } catch {
    saved = {};
  }
  const nav = (navigator.language || "pt").slice(0, 2);
  return {
    theme: saved.theme === "dark" || saved.theme === "light" ? saved.theme : "light",
    accent: ACCENTS.some((a) => a.id === saved.accent) ? saved.accent : "blue",
    lang: ["pt", "en", "es"].includes(saved.lang)
      ? saved.lang
      : ["en", "es"].includes(nav) ? nav : "pt",
  };
}

export function useSettings() {
  const [settings, setSettings] = useState(initial);

  useEffect(() => {
    const root = document.documentElement;
    const accent = ACCENTS.find((a) => a.id === settings.accent);
    root.dataset.theme = settings.theme;
    root.lang = settings.lang;
    root.style.setProperty("--accent", accent.color);
    root.style.setProperty("--accent-contrast", accent.contrast);
    try {
      localStorage.setItem(KEY, JSON.stringify(settings));
    } catch {
      // sem localStorage: configurações valem só na sessão
    }
  }, [settings]);

  const update = (key) => (value) => setSettings((s) => ({ ...s, [key]: value }));

  return {
    ...settings,
    setTheme: update("theme"),
    setAccent: update("accent"),
    setLang: update("lang"),
  };
}
