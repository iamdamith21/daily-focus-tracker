import { useState } from "react";
import "./TaskInput.css";

function TaskInput({ onAddTask }) {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueTime, setDueTime] = useState("");
  const [isPulsing, setIsPulsing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    onAddTask(inputValue, priority, dueTime);
    setInputValue("");
    setPriority("medium");
    setDueTime("");
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 300);
  }

  return (
    <form className="task-input-section" onSubmit={handleSubmit}>
      <div className="task-input-row">
        <select
          className="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
        <input
          className="task-input-field"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
        />
        <button
          className={`task-add-btn ${isPulsing ? "pulse" : ""}`}
          type="submit"
        >
          Add
        </button>
      </div>
      <div className="task-time-row">
        <label className="time-label">⏰ Due time:</label>
        <input
          className="time-input"
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
        />
        {dueTime && (
          <button
            type="button"
            className="time-clear-btn"
            onClick={() => setDueTime("")}
          >
            ✕ Clear
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskInput;