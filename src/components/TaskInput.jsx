import { useState } from "react";
import "./TaskInput.css";

function TaskInput({ onAddTask }) {
  const [inputValue, setInputValue] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isPulsing, setIsPulsing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    onAddTask(inputValue, priority);
    setInputValue("");
    setPriority("medium");
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 300);
  }

  return (
    <form className="task-input-section" onSubmit={handleSubmit}>
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
    </form>
  );
}

export default TaskInput;