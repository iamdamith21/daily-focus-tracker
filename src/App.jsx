import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(taskText) {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  }

  function handleComplete(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleDelete(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  return (
    <div>
      <h1>Daily Focus Tracker</h1>
      <TaskInput onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onComplete={handleComplete}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;