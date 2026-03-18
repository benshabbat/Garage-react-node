/**
 * Export an array of flat objects to a CSV file download.
 * @param {Object[]} data  - Array of row objects
 * @param {string}   filename - Download filename (without extension)
 */
export function exportToCsv(data, filename = "export") {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const escape = (val) => {
    if (val === null || val === undefined) return "";
    const str = typeof val === "object" ? JSON.stringify(val) : String(val);
    return `"${str.replace(/"/g, '""')}"`;
  };

  const rows = data.map((row) => headers.map((h) => escape(row[h])).join(","));
  const csv = [headers.join(","), ...rows].join("\n");

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${filename}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
