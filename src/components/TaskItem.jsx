import { useState } from "react";
import "./TaskItem.css";

function TaskItem({ task, onComplete, onDelete, onEdit }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.text);

  function handleDelete() {
    setIsExiting(true);
    setTimeout(() => {
      onDelete(task.id);
    }, 250);
  }

  function handleDoubleClick() {
    if (task.completed) return;
    setIsEditing(true);
  }

  function handleEditSubmit() {
    if (editValue.trim() === "") return;
    onEdit(task.id, editValue);
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleEditSubmit();
    if (e.key === "Escape") {
      setEditValue(task.text);
      setIsEditing(false);
    }
  }

  function isOverdue() {
    if (!task.dueTime || task.completed) return false;
    const now = new Date();
    const [hours, minutes] = task.dueTime.split(":").map(Number);
    const due = new Date();
    due.setHours(hours, minutes, 0, 0);
    return now > due;
  }

  function getTimeStatus() {
    if (!task.dueTime) return null;
    if (task.completed) return null;

    const now = new Date();
    const [hours, minutes] = task.dueTime.split(":").map(Number);
    const due = new Date();
    due.setHours(hours, minutes, 0, 0);

    const diffMs = due - now;
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 0) return { label: "Overdue", className: "time-overdue" };
    if (diffMins <= 30) return { label: `${diffMins}m left`, className: "time-soon" };
    return { label: task.dueTime, className: "time-normal" };
  }

  const priorityConfig = {
    high:   { label: "High",   className: "priority-high" },
    medium: { label: "Medium", className: "priority-medium" },
    low:    { label: "Low",    className: "priority-low" },
  };

  const priority = priorityConfig[task.priority] || priorityConfig.medium;
  const timeStatus = getTimeStatus();
  const overdue = isOverdue();

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} task-enter ${
        isExiting ? "task-exit" : ""
      } ${isEditing ? "editing" : ""} ${overdue ? "overdue" : ""}`}
    >
      <span className={`priority-badge ${priority.className}`}>
        {priority.label}
      </span>

      <div className="task-main">
        {isEditing ? (
          <input
            className="task-edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <span
            className={`task-text ${task.completed ? "completed" : ""}`}
            onDoubleClick={handleDoubleClick}
            title={task.completed ? "" : "Double-click to edit"}
          >
            {task.text}
          </span>
        )}

        {timeStatus && (
          <span className={`task-time ${timeStatus.className}`}>
            ⏰ {timeStatus.label}
          </span>
        )}
      </div>

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