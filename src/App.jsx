import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import ProgressBar from "./components/ProgressBar";

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
    <div>
      <h1>Daily Focus Tracker</h1>

      <div>
        <label>දවසේ goal: </label>
        <input
          type="number"
          min="1"
          max="20"
          value={goal}
          onChange={(e) => setGoal(Number(e.target.value))}
        />
        <span> tasks</span>
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