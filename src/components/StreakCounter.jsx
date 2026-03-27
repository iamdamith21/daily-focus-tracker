import "./StreakCounter.css";

function StreakCounter({ streak }) {
  return (
    <div className={`streak-card ${streak >= 3 ? "streak-hot" : ""}`}>
      <span className="streak-flame">🔥</span>
      <div className="streak-info">
        <span className="streak-number">{streak}</span>
        <span className="streak-label">day streak</span>
      </div>
      {streak === 0 && (
        <span className="streak-msg">Complete today's goal to start!</span>
      )}
      {streak >= 3 && (
        <span className="streak-msg">You're on fire! Keep going!</span>
      )}
    </div>
  );
}

export default StreakCounter;