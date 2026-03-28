import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import "./WeekSummary.css";

function WeekSummary({ weekHistory, goal }) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split("T")[0];
    const dayName = days[date.getDay()];
    return {
      day: dayName,
      completed: weekHistory[dateStr] || 0,
      isToday: i === 6,
    };
  });

  return (
    <div className="week-summary-card">
      <p className="week-summary-title">This week</p>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={chartData} barSize={28}>
          <XAxis
            dataKey="day"
            tick={{ fill: "#6b7280", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis hide />
          <Tooltip
            cursor={{ fill: "#2a2a3a" }}
            contentStyle={{
              background: "#1a1a24",
              border: "1px solid #3a3a4a",
              borderRadius: "8px",
              color: "#e8e8f0",
              fontSize: "13px",
            }}
            formatter={(value) => [`${value} tasks`, "Completed"]}
          />
          <ReferenceLine
            y={goal}
            stroke="#a78bfa"
            strokeDasharray="4 4"
            strokeWidth={1.5}
          />
          <Bar
            dataKey="completed"
            radius={[6, 6, 0, 0]}
            fill="#a78bfa"
          />
        </BarChart>
      </ResponsiveContainer>
      <p className="week-summary-hint">
        Dashed line = goal ({goal} tasks)
      </p>
    </div>
  );
}

export default WeekSummary;