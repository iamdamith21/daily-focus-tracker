import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import ProgressBar from "./components/ProgressBar";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [goal, setGoal] = useState(() => {
    const saved = localStorage.getItem("goal");
    return saved ? Number(saved) : 5;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("goal", goal);
  }, [goal]);

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

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Daily Focus Tracker</h1>
        <p className="app-subtitle">අද දවසේ focus කරන්න</p>
      </div>

      <div className="goal-section">
        <span className="goal-label">දවසේ goal:</span>
        <input
          className="goal-input"
          type="number"
          min="1"
          max="20"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
        />
        <span className="goal-tasks-label">tasks</span>
      </div>

      <ProgressBar completed={completedCount} goal={goal} />
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