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

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} task-enter ${
        isExiting ? "task-exit" : ""
      }`}
    >
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