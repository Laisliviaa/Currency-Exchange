import { useState } from "react";
import { filterRows, sortRows } from "../utils/tableUtils";
import { exportCsv } from "../utils/exportCsv";
import styles from "./RateTable.module.css";

const EMPTY = { startDate: "", endDate: "", minRate: "", maxRate: "" };

export default function RateTable({ rows }) {
  const [filters, setFilters] = useState(EMPTY);
  const [sortField, setSortField] = useState("date");
  const [sortDir, setSortDir] = useState("desc");

  function handleChange(e) {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  function toggleSort(field) {
    if (field === sortField) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    if (!year || !month || !day) return dateString;
    return `${day}/${month}/${year.slice(-2)}`;
  };

  // Obtém a data atual no formato YYYY-MM-DD para bloquear datas futuras
  const today = new Date().toISOString().split("T")[0];

  const visible = sortRows(filterRows(rows, filters), sortField, sortDir);
  const arrow = (f) => (f === sortField ? (sortDir === "asc" ? " ↑" : " ↓") : "");

  return (
    <section className={styles.box}>
      <div className={styles.filters}>
        {/* Linha superior com os inputs de filtro limitados e validados */}
        <div className={styles.filterInputs}>
          <label>
            De
            <input 
              type="date" 
              name="startDate" 
              value={filters.startDate} 
              max={today} 
              onChange={handleChange} 
            />
          </label>
          <label>
            Até
            <input 
              type="date" 
              name="endDate" 
              value={filters.endDate} 
              max={today} 
              onChange={handleChange} 
            />
          </label>
          <label>
            Cotação mín.
            <input 
              type="number" 
              step="any" 
              min="0"
              name="minRate" 
              placeholder="0.00" 
              value={filters.minRate} 
              onChange={handleChange} 
            />
          </label>
          <label>
            Cotação máx.
            <input 
              type="number" 
              step="any" 
              min="0"
              name="maxRate" 
              placeholder="0.00" 
              value={filters.maxRate} 
              onChange={handleChange} 
            />
          </label>
        </div>

        {/* Botões na linha de baixo, separados dos inputs */}
        <div className={styles.actions}>
          <button type="button" onClick={() => setFilters(EMPTY)}>Limpar filtros</button>
          <button type="button" onClick={() => exportCsv(visible)} disabled={visible.length === 0}>
            Exportar CSV
          </button>
        </div>
      </div>

      <p className={styles.countText}>{visible.length} registro(s) encontrado(s)</p>

      {visible.length === 0 ? (
        <p>Nenhum registro para os filtros aplicados.</p>
      ) : (
        <div className={styles.scroll}>
          <table>
            <thead>
              <tr>
                <th onClick={() => toggleSort("date")} className={styles.sortable}>
                  Data{arrow("date")}
                </th>
                <th>Origem</th>
                <th>Destino</th>
                <th onClick={() => toggleSort("rate")} className={styles.sortable}>
                  Cotação{arrow("rate")}
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.date}>
                  <td>{formatDate(r.date)}</td>
                  <td>{r.from}</td>
                  <td>{r.to}</td>
                  <td>{r.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}