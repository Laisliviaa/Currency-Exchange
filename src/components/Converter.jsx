import { useState } from "react";
import { getLatestRate } from "../services/frankfurter";
import styles from "./Converter.module.css";

export default function Converter({ currencies, from, to, onFromChange, onToChange, onSwap }) {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleConvert() {
    const value = Number(amount);
    if (!amount || isNaN(value) || value <= 0) {
      setError("Informe um valor válido maior que zero.");
      setResult(null);
      return;
    }
    if (from === to) {
      setError("Escolha moedas diferentes.");
      setResult(null);
      return;
    }
    try {
      setError("");
      const json = await getLatestRate(from, to);
      const rate = json.rates[to];
      setResult({ value: value * rate, rate, date: json.date });
    } catch (e) {
      setError(e.message);
    }
  }

  const codes = currencies ? Object.keys(currencies) : [];

  return (
    <section className={styles.box}>
      <h2>Conversor de Moedas</h2>
      <div className={styles.row}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Valor"
        />
        <select value={from} onChange={(e) => onFromChange(e.target.value)}>
          {codes.length === 0 ? (
            <option value={from}>{from}</option>
          ) : (
            codes.map((c) => (
              <option key={c} value={c}>
                {c} {currencies[c] ? `- ${currencies[c]}` : ""}
              </option>
            ))
          )}
        </select>
        
        <button type="button" onClick={onSwap} className={styles.swapBtn}>⇄</button>
        
        <select value={to} onChange={(e) => onToChange(e.target.value)}>
          {codes.length === 0 ? (
            <option value={to}>{to}</option>
          ) : (
            codes.map((c) => (
              <option key={c} value={c}>
                {c} {currencies[c] ? `- ${currencies[c]}` : ""}
              </option>
            ))
          )}
        </select>
        
        <button type="button" onClick={handleConvert} className={styles.convertBtn}>
          Converter
        </button>
      </div>

      {error && <p className={styles.error}>{error}</p>}
      
      {result && (
        <div className={styles.result}>
          <p>
            {amount} {from} = <strong>{result.value.toFixed(2)} {to}</strong>
          </p>
          <small>Taxa: {result.rate} | Cotação de {result.date}</small>
        </div>
      )}
    </section>
  );
}