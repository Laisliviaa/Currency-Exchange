import { ACCENTS } from "../hooks/useSettings";
import { LANGS } from "../i18n/translations";
import styles from "./SettingsBar.module.css";

export default function SettingsBar({ t, theme, accent, lang, onTheme, onAccent, onLang }) {
  return (
    <div className={styles.bar}>
      <div className={styles.group} role="group" aria-label={t.settings.theme}>
        {["light", "dark"].map((mode) => (
          <button
            key={mode}
            type="button"
            className={theme === mode ? styles.active : ""}
            aria-pressed={theme === mode}
            onClick={() => onTheme(mode)}
          >
            {mode === "light" ? "☀️" : "🌙"} {t.settings[mode]}
          </button>
        ))}
      </div>

      <div className={styles.group} role="group" aria-label={t.settings.color}>
        {ACCENTS.map((a) => (
          <button
            key={a.id}
            type="button"
            className={`${styles.swatch} ${accent === a.id ? styles.swatchActive : ""}`}
            style={{ background: a.color }}
            title={t.settings.accents[a.id]}
            aria-label={t.settings.accents[a.id]}
            aria-pressed={accent === a.id}
            onClick={() => onAccent(a.id)}
          />
        ))}
      </div>

      <select
        value={lang}
        onChange={(e) => onLang(e.target.value)}
        aria-label={t.settings.language}
      >
        {LANGS.map((l) => (
          <option key={l.id} value={l.id}>{l.label}</option>
        ))}
      </select>
    </div>
  );
}
