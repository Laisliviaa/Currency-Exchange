import { useState } from "react";
import { getLatestRate } from "../services/frankfurter";
import { formatError } from "../utils/currencies";
import styles from "./Converter.module.css";

export default function Converter({ t, currencies, from, to, onFromChange, onToChange, onSwap }) {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleConvert() {
    const value = Number(amount);
    if (!amount || isNaN(value) || value <= 0) {
      setError(t.converter.invalidAmount);
      setResult(null);
      return;
    }
    if (from === to) {
      setError(t.converter.sameCurrency);
      setResult(null);
      return;
    }
    try {
      setError(null);
      const json = await getLatestRate(from, to);
      const rate = json.rates[to];
      setResult({ value: value * rate, rate, date: json.date, amount, from, to });
    } catch (e) {
      setError(formatError(e, t));
    }
  }

  const codes = currencies ? Object.keys(currencies) : [];
  const options = (current) =>
    codes.length === 0 ? (
      <option value={current}>{current}</option>
    ) : (
      codes.map((c) => (
        <option key={c} value={c}>{c} - {currencies[c]}</option>
      ))
    );

  return (
    <section className={styles.box}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder={t.converter.amount}
      />
      <select value={from} onChange={(e) => onFromChange(e.target.value)}>
        {options(from)}
      </select>

      <button type="button" className={styles.swap} onClick={onSwap} aria-label={t.converter.swap} title={t.converter.swap}>
        ⇄
      </button>

      <select value={to} onChange={(e) => onToChange(e.target.value)}>
        {options(to)}
      </select>

      <button type="button" className={styles.primary} onClick={handleConvert}>
        {t.converter.convert}
      </button>

      {error && <p className={styles.error}>{error}</p>}

      {result && (
        <p className={styles.result}>
          {result.amount} {result.from} = <strong>{result.value.toFixed(2)} {result.to}</strong>
          <br />
          {t.converter.rate}: {result.rate} | {t.converter.quoteOf} {result.date}
        </p>
      )}
    </section>
  );
}
