function TaskItem({ task, onComplete, onDelete }) {
  return (
    <div>
      <span
        style={{
          textDecoration: task.completed ? "line-through" : "none",
        }}
      >
        {task.text}
      </span>
      <button onClick={() => onComplete(task.id)}>✓</button>
      <button onClick={() => onDelete(task.id)}>✕</button>
    </div>
  );
}

export default TaskItem;