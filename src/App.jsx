import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import ProgressBar from "./components/ProgressBar";
import StreakCounter from "./components/StreakCounter";
import WeekSummary from "./components/WeekSummary";
import ExportButton from "./components/ExportButton";
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

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("streak");
    return saved ? Number(saved) : 0;
  });

  const [lastCompletedDate, setLastCompletedDate] = useState(() => {
    return localStorage.getItem("lastCompletedDate") || null;
  });

  const [weekHistory, setWeekHistory] = useState(() => {
    const saved = localStorage.getItem("weekHistory");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("goal", goal);
  }, [goal]);

  useEffect(() => {
    localStorage.setItem("streak", streak);
  }, [streak]);

  useEffect(() => {
    localStorage.setItem("weekHistory", JSON.stringify(weekHistory));
  }, [weekHistory]);

  useEffect(() => {
    if (lastCompletedDate) {
      localStorage.setItem("lastCompletedDate", lastCompletedDate);
    }
  }, [lastCompletedDate]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const isGoalComplete = goal > 0 && completedCount >= goal;

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setWeekHistory((prev) => ({
      ...prev,
      [today]: completedCount,
    }));
  }, [completedCount]);

  useEffect(() => {
    if (!isGoalComplete) return;

    const today = new Date().toISOString().split("T")[0];
    if (lastCompletedDate === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (lastCompletedDate === yesterdayStr) {
      setStreak((s) => s + 1);
    } else {
      setStreak(1);
    }

    setLastCompletedDate(today);
  }, [isGoalComplete]);

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
    <div className="app-container">
      <div className="app-header">
        <h1>Daily Focus Tracker</h1>
        <p className="app-subtitle">අද දවසේ focus කරන්න</p>
      </div>

      <StreakCounter streak={streak} />

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
      <WeekSummary weekHistory={weekHistory} goal={goal} />
      <ExportButton tasks={tasks} weekHistory={weekHistory} />
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