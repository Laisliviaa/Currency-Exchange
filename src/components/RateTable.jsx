import { useState } from "react";
import { filterRows, sortRows } from "../utils/tableUtils";
import { exportCsv } from "../utils/exportCsv";
import styles from "./RateTable.module.css";

const EMPTY = { startDate: "", endDate: "", minRate: "", maxRate: "" };

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
          <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} />
        </label>
        <label>
          {t.table.to}
          <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} />
        </label>
        <label>
          {t.table.minRate}
          <input type="number" step="any" name="minRate" value={filters.minRate} onChange={handleChange} />
        </label>
        <label>
          {t.table.maxRate}
          <input type="number" step="any" name="maxRate" value={filters.maxRate} onChange={handleChange} />
        </label>
        <button onClick={() => setFilters(EMPTY)}>{t.table.clear}</button>
        <button onClick={() => exportCsv(visible, t.table.csvHeader, t.table.csvName)} disabled={visible.length === 0}>
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
                  <td>{r.date}</td>
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