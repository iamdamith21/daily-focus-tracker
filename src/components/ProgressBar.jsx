import "./ProgressBar.css";

function ProgressBar({ completed, goal }) {
  const percentage = goal > 0 ? Math.min((completed / goal) * 100, 100) : 0;

  return (
    <div className="progress-section">
      <div className="progress-info">
        <span>{completed} / {goal} tasks complete</span>
        <span className="progress-percentage">{Math.round(percentage)}%</span>
      </div>
      <div className="progress-track">
        <div
          className={`progress-fill ${percentage === 100 ? "complete" : "incomplete"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {percentage === 100 && (
        <p className="progress-complete-msg">🎉 Goal complete!</p>
      )}
    </div>
  );
}

export default ProgressBar;