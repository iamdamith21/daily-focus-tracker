import { useState } from "react";
import "./TaskItem.css";

function TaskItem({ task, onComplete, onDelete }) {
  const [isExiting, setIsExiting] = useState(false);

  function handleDelete() {
    setIsExiting(true);
    setTimeout(() => {
      onDelete(task.id);
    }, 250);
  }

  const priorityConfig = {
    high:   { label: "High",   className: "priority-high" },
    medium: { label: "Medium", className: "priority-medium" },
    low:    { label: "Low",    className: "priority-low" },
  };

  const priority = priorityConfig[task.priority] || priorityConfig.medium;

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} task-enter ${
        isExiting ? "task-exit" : ""
      }`}
    >
      <span className={`priority-badge ${priority.className}`}>
        {priority.label}
      </span>
      <span className={`task-text ${task.completed ? "completed" : ""}`}>
        {task.text}
      </span>
      <button
        className="task-btn complete-btn"
        onClick={() => onComplete(task.id)}
      >
        ✓
      </button>
      <button className="task-btn delete-btn" onClick={handleDelete}>
        ✕
      </button>
    </div>
  );
}

export default TaskItem;