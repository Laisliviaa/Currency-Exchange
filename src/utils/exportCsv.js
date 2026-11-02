export function exportCsv(rows, header = "date,from,to,rate", name = "rates") {
  if (!rows.length) return false;
  const lines = rows.map((r) => `${r.date},${r.from},${r.to},${r.rate}`);
  const blob = new Blob([[header, ...lines].join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${name}_${rows[0].from}-${rows[0].to}_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  return true;
}
