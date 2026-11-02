import { useState, useEffect } from "react";
import { getCurrencies } from "./services/frankfurter";
import { useHistory } from "./hooks/useHistory";
import { useFavorites } from "./hooks/useFavorites";
import { useTopMovers } from "./hooks/useTopMovers";
import Converter from "./components/Converter";
import Favorites from "./components/Favorites";
import TopMovers from "./components/TopMovers";
import PeriodSelector from "./components/PeriodSelector";
import RateChart from "./components/RateChart";
import RateTable from "./components/RateTable";
import styles from "./App.module.css";

export default function App() {
  const [currencies, setCurrencies] = useState({});
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("BRL");
  const [days, setDays] = useState(30);

  const { data, loading, error } = useHistory(from, to, days);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { movers, loading: moversLoading, error: moversError } = useTopMovers(from);

  const [currenciesError, setCurrenciesError] = useState(null);

  useEffect(() => {
    getCurrencies()
      .then(setCurrencies)
      .catch((e) => setCurrenciesError(e.message));
  }, []);

  function swap() {
    setFrom(to);
    setTo(from);
  }

  function selectPair(newFrom, newTo) {
    setFrom(newFrom);
    setTo(newTo);
  }

  return (
    <main className={styles.container}>
      <h1>Currency Exchange</h1>
      {currenciesError && (
        <p className={styles.error}>
          Não foi possível carregar a lista de moedas: {currenciesError}
        </p>
      )}
      <Converter
        currencies={currencies}
        from={from}
        to={to}
        onFromChange={setFrom}
        onToChange={setTo}
        onSwap={swap}
      />

      <button onClick={() => toggleFavorite(from, to)} disabled={from === to}>
        {isFavorite(from, to) ? "★ Remover dos favoritos" : "☆ Favoritar"} {from} → {to}
      </button>

      <Favorites
        favorites={favorites}
        onSelect={selectPair}
        onRemove={toggleFavorite}
      />

      <TopMovers
        base={from}
        movers={movers}
        loading={moversLoading}
        error={moversError}
        currencies={currencies}
        onSelect={setTo}
      />

      <PeriodSelector days={days} onChange={setDays} />
      {loading && <p>Carregando...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && data.length === 0 && <p>Nenhum dado encontrado.</p>}
      {!loading && !error && data.length > 0 && (
        <>
          <RateChart data={data} />
          <RateTable rows={data} />
        </>
      )}
    </main>
  );
}