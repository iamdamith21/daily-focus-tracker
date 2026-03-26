import "./TaskItem.css";

function TaskItem({ task, onComplete, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <span className={`task-text ${task.completed ? "completed" : ""}`}>
        {task.text}
      </span>
      <button
        className="task-btn complete-btn"
        onClick={() => onComplete(task.id)}
      >✓</button>
      <button
        className="task-btn delete-btn"
        onClick={() => onDelete(task.id)}
      >✕</button>
    </div>
  );
}

export default TaskItem;