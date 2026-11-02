import styles from "./Favorites.module.css";

export default function Favorites({ favorites, onSelect, onRemove }) {
  return (
    <section className={styles.box}>
      <h2>Conversões favoritas</h2>
      {favorites.length === 0 ? (
        <p className={styles.empty}>Nenhuma favorita ainda. Use o botão ☆ acima.</p>
      ) : (
        <ul className={styles.list}>
          {favorites.map((f) => (
            <li key={`${f.from}-${f.to}`} className={styles.item}>
              <button onClick={() => onSelect(f.from, f.to)}>
                {f.from} → {f.to}
              </button>
              <button
                onClick={() => onRemove(f.from, f.to)}
                aria-label={`Remover ${f.from} para ${f.to}`}
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