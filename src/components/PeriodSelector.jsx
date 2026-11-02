import { PERIODS } from "../utils/dates";
import styles from "./PeriodSelector.module.css";

export default function PeriodSelector({ t, days, onChange }) {
  return (
    <div className={styles.group}>
      {PERIODS.map((p) => (
        <button
          key={p}
          className={days === p ? styles.active : ""}
          aria-pressed={days === p}
          onClick={() => onChange(p)}
        >
          {t.periods[p]}
        </button>
      ))}
    </div>
  );
}
