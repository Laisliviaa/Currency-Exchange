import { test } from "node:test";
import assert from "node:assert/strict";
import { filterRows, sortRows } from "../src/utils/tableUtils.js";
import { getTopMovers } from "../src/utils/topMovers.js";
import { getRange, PERIODS, formatDate } from "../src/utils/dates.js";
import { exportCsv } from "../src/utils/exportCsv.js";

const rows = [
  { date: "2026-10-01", from: "USD", to: "BRL", rate: 5.4 },
  { date: "2026-10-02", from: "USD", to: "BRL", rate: 5.5 },
  { date: "2026-10-03", from: "USD", to: "BRL", rate: 5.2 },
];
const none = { startDate: "", endDate: "", minRate: "", maxRate: "" };

test("filterRows: sem filtros retorna tudo", () => {
  assert.equal(filterRows(rows, none).length, 3);
});
test("filterRows: data inicial e final", () => {
  assert.equal(filterRows(rows, { ...none, startDate: "2026-10-02" }).length, 2);
  assert.equal(filterRows(rows, { ...none, endDate: "2026-10-01" }).length, 1);
});
test("filterRows: cotação mínima e máxima", () => {
  assert.equal(filterRows(rows, { ...none, minRate: "5.4" }).length, 2);
  assert.equal(filterRows(rows, { ...none, maxRate: "5.3" }).length, 1);
});
test("filterRows: filtros combinados", () => {
  const f = { startDate: "2026-10-01", endDate: "2026-10-02", minRate: "5.5", maxRate: "6" };
  assert.deepEqual(filterRows(rows, f).map((r) => r.date), ["2026-10-02"]);
});
test("filterRows: sem resultado", () => {
  assert.equal(filterRows(rows, { ...none, minRate: "99" }).length, 0);
});

test("sortRows: data crescente e decrescente", () => {
  assert.equal(sortRows(rows, "date", "asc")[0].date, "2026-10-01");
  assert.equal(sortRows(rows, "date", "desc")[0].date, "2026-10-03");
});
test("sortRows: cotação crescente e decrescente", () => {
  assert.equal(sortRows(rows, "rate", "asc")[0].rate, 5.2);
  assert.equal(sortRows(rows, "rate", "desc")[0].rate, 5.5);
});
test("sortRows: não altera o array original", () => {
  const copy = [...rows];
  sortRows(rows, "rate", "asc");
  assert.deepEqual(rows, copy);
});

test("getTopMovers: ordena pela maior valorização e limita a 3", () => {
  const rates = {
    "2026-10-01": { A: 10, B: 10, C: 10, D: 10 },
    "2026-10-30": { A: 11, B: 15, C: 12, D: 9 },
  };
  const top = getTopMovers(rates);
  assert.deepEqual(top.map((m) => m.code), ["B", "C", "A"]);
  assert.equal(top[0].change, 50);
});
test("getTopMovers: menos de 2 datas retorna vazio", () => {
  assert.deepEqual(getTopMovers({ "2026-10-01": { A: 1 } }), []);
});

test("getRange: datas AAAA-MM-DD com start antes de end", () => {
  const { start, end } = getRange(7);
  assert.match(start, /^\d{4}-\d{2}-\d{2}$/);
  assert.match(end, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(start < end);
});
test("PERIODS: 8 períodos", () => {
  assert.equal(PERIODS.length, 8);
});

test("exportCsv: lista vazia não exporta", () => {
  assert.equal(exportCsv([]), false);
});
test("formatDate: AAAA-MM-DD vira DD/MM/AA", () => {
  assert.equal(formatDate("2026-10-27"), "27/10/26");
  assert.equal(formatDate(""), "");
});