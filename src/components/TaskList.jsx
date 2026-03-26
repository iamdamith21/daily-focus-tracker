import TaskItem from "./TaskItem";
import "./TaskList.css";

function TaskList({ tasks, onComplete, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty-message">No tasks yet. Add one above!</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onComplete={onComplete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;