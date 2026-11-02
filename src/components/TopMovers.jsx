import styles from "./TopMovers.module.css";

export default function TopMovers({ t, base, movers, loading, error, currencies, onSelect }) {
  return (
    <section className={styles.box}>
      <h2>{t.movers.title(base)}</h2>
      {loading && <p>{t.common.loading}</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && movers.length === 0 && <p>{t.movers.none}</p>}
      {!loading && !error && movers.length > 0 && (
        <ol className={styles.list}>
          {movers.map((m) => (
            <li key={m.code}>
              <button className={styles.card} onClick={() => onSelect(m.code)}>
                <span className={styles.name}>
                  <strong>{m.code}</strong>
                  {currencies[m.code] ? ` · ${currencies[m.code]}` : ""}
                </span>
                <span className={`${styles.badge} ${m.change >= 0 ? styles.up : styles.down}`}>
                  {m.change >= 0 ? "+" : ""}
                  {m.change.toFixed(2)}%
                </span>
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
