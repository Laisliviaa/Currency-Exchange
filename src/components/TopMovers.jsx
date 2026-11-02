
import styles from "./TopMovers.module.css";

export default function TopMovers({ base, movers, loading, error, currencies, onSelect }) {
  return (
    <section className={styles.box}>
      <h2>Onde {base} mais se valorizou (últimos 30 dias)</h2>
      {loading && <p>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && movers.length === 0 && <p>Sem dados para esta moeda.</p>}
      {!loading && !error && movers.length > 0 && (
        <ol className={styles.list}>
          {movers.map((m) => (
            <li key={m.code}>
              <button onClick={() => onSelect(m.code)}>
                <strong>{m.code}</strong>
                {currencies[m.code] ? ` · ${currencies[m.code]}` : ""}
                <span className={m.change >= 0 ? styles.up : styles.down}>
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