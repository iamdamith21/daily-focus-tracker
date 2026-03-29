import "./ExportButton.css";

function ExportButton({ tasks, weekHistory }) {
  function exportCSV() {
    const today = new Date().toISOString().split("T")[0];

    const taskRows = [
      ["Type", "Date", "Task", "Status"],
      ...tasks.map((task) => [
        "Task",
        today,
        task.text,
        task.completed ? "Completed" : "Pending",
      ]),
    ];

    const historyRows = [
      [],
      ["Type", "Date", "Completed Tasks"],
      ...Object.entries(weekHistory).map(([date, count]) => [
        "History",
        date,
        count,
      ]),
    ];

    const allRows = [...taskRows, ...historyRows];

    const csvContent = allRows
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `focus-tracker-${today}.csv`;
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <button className="export-btn" onClick={exportCSV}>
      ↓ Export CSV
    </button>
  );
}

export default ExportButton;