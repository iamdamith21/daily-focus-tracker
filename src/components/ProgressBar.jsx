function ProgressBar({ completed, goal }) {
  const percentage = goal > 0 ? Math.min((completed / goal) * 100, 100) : 0;

  return (
    <div>
      <p>
        {completed} / {goal} tasks complete ({Math.round(percentage)}%)
      </p>
      <div
        style={{
          width: "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: "8px",
          height: "16px",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            backgroundColor: percentage === 100 ? "#4caf50" : "#2196f3",
            borderRadius: "8px",
            height: "16px",
            transition: "width 0.3s ease",
          }}
        />
      </div>
      {percentage === 100 && <p>🎉 Goal complete!</p>}
    </div>
  );
}

export default ProgressBar;