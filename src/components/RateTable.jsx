import { useState } from "react";
import { filterRows, sortRows } from "../utils/tableUtils";
import { exportCsv } from "../utils/exportCsv";
import { formatDate } from "../utils/dates"; // Importa a formatação global DD/MM/AA
import styles from "./RateTable.module.css";

const EMPTY = { startDate: "", endDate: "", minRate: "", maxRate: "" };

// Data de hoje (AAAA-MM-DD) para bloquear datas futuras nos filtros
const today = new Date().toISOString().split("T")[0];

export default function RateTable({ t, rows }) {
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


  const visible = sortRows(filterRows(rows, filters), sortField, sortDir);
  const arrow = (f) => (f === sortField ? (sortDir === "asc" ? " ↑" : " ↓") : "");

  return (
    <section className={styles.box}>
      <div className={styles.filters}>
        <label>
          {t.table.from}
          <input 
            type="date" 
            name="startDate" 
            value={filters.startDate} 
            max={today} 
            onChange={handleChange} 
          />
        </label>
        <label>
          {t.table.to}
          <input 
            type="date" 
            name="endDate" 
            value={filters.endDate} 
            max={today} 
            onChange={handleChange} 
          />
        </label>
        <label>
          {t.table.minRate}
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
          {t.table.maxRate}
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

      <div className={styles.actions}>
        <button className={styles.actionBtn} onClick={() => setFilters(EMPTY)}>
          {t.table.clear}
        </button>
        <button
          className={styles.actionBtn}
          onClick={() => exportCsv(visible, t.table.csvHeader, t.table.csvName)}
          disabled={visible.length === 0}
        >
          {t.table.export}
        </button>
      </div>

      <p className={styles.count}>{t.table.records(visible.length)}</p>

      {visible.length === 0 ? (
        <p>{t.table.empty}</p>
      ) : (
        <div className={styles.scroll}>
          <table>
            <thead>
              <tr>
                <th onClick={() => toggleSort("date")} className={styles.sortable}>
                  {t.table.date}{arrow("date")}
                </th>
                <th>{t.table.origin}</th>
                <th>{t.table.dest}</th>
                <th onClick={() => toggleSort("rate")} className={styles.sortable}>
                  {t.table.rate}{arrow("rate")}
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