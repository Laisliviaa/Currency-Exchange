import styles from "./Favorites.module.css";

export default function Favorites({ t, favorites, onSelect, onRemove }) {
  return (
    <section className={styles.box}>
      <h2>{t.favorites.title}</h2>
      {favorites.length === 0 ? (
        <p className={styles.empty}>{t.favorites.empty}</p>
      ) : (
        <ul className={styles.list}>
          {favorites.map((f) => (
            <li key={`${f.from}-${f.to}`} className={styles.item}>
              <button onClick={() => onSelect(f.from, f.to)}>
                {f.from} → {f.to}
              </button>
              <button
                onClick={() => onRemove(f.from, f.to)}
                aria-label={t.favorites.removeAria(f.from, f.to)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
