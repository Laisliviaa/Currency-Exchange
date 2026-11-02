import { useState, useEffect, useMemo } from "react";
import { getCurrencies } from "./services/frankfurter";
import { useHistory } from "./hooks/useHistory";
import { useFavorites } from "./hooks/useFavorites";
import { useTopMovers } from "./hooks/useTopMovers";
import { useSettings } from "./hooks/useSettings";
import { translations } from "./i18n/translations";
import { localizeCurrencies, formatError } from "./utils/currencies";
import SettingsBar from "./components/SettingsBar";
import Converter from "./components/Converter";
import Favorites from "./components/Favorites";
import TopMovers from "./components/TopMovers";
import PeriodSelector from "./components/PeriodSelector";
import RateChart from "./components/RateChart";
import RateTable from "./components/RateTable";
import styles from "./App.module.css";

export default function App() {
  const settings = useSettings();
  const t = translations[settings.lang];

  const [currencies, setCurrencies] = useState({});
  const [currenciesError, setCurrenciesError] = useState(null);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("BRL");
  const [days, setDays] = useState(30);

  const { data, loading, error } = useHistory(from, to, days);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { movers, loading: moversLoading, error: moversError } = useTopMovers(from);

  useEffect(() => {
    getCurrencies()
      .then(setCurrencies)
      .catch((e) => setCurrenciesError(e));
  }, []);

  // nomes das moedas no idioma escolhido
  const names = useMemo(
    () => localizeCurrencies(currencies, settings.lang),
    [currencies, settings.lang]
  );

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
      <header className={styles.header}>
        <h1>{t.title}</h1>
        <SettingsBar
          t={t}
          theme={settings.theme}
          accent={settings.accent}
          lang={settings.lang}
          onTheme={settings.setTheme}
          onAccent={settings.setAccent}
          onLang={settings.setLang}
        />
      </header>

      {currenciesError && (
        <p className={styles.error}>
          {t.common.currenciesError}: {formatError(currenciesError, t)}
        </p>
      )}

      <Converter
        t={t}
        currencies={names}
        from={from}
        to={to}
        onFromChange={setFrom}
        onToChange={setTo}
        onSwap={swap}
      />

      <button
        className={styles.favBtn}
        onClick={() => toggleFavorite(from, to)}
        disabled={from === to}
      >
        {isFavorite(from, to) ? t.favorites.remove : t.favorites.add} {from} → {to}
      </button>

      <Favorites
        t={t}
        favorites={favorites}
        onSelect={selectPair}
        onRemove={toggleFavorite}
      />

      <TopMovers
        t={t}
        base={from}
        movers={movers}
        loading={moversLoading}
        error={formatError(moversError, t)}
        currencies={names}
        onSelect={setTo}
      />

      <PeriodSelector t={t} days={days} onChange={setDays} />
      {loading && <p>{t.common.loading}</p>}
      {error && <p className={styles.error}>{formatError(error, t)}</p>}
      {!loading && !error && data.length === 0 && <p>{t.common.noData}</p>}
      {!loading && !error && data.length > 0 && (
        <>
          <RateChart t={t} data={data} />
          <RateTable t={t} rows={data} />
        </>
      )}
    </main>
  );
}
