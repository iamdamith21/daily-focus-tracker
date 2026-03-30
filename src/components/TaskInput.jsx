import { useState } from "react";
import "./TaskInput.css";

function TaskInput({ onAddTask }) {
  const [inputValue, setInputValue] = useState("");
  const [isPulsing, setIsPulsing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    onAddTask(inputValue);
    setInputValue("");
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 300);
  }

  return (
    <form className="task-input-section" onSubmit={handleSubmit}>
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