import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

export default function TrendChart({ history = [] }) {

  if (history.length === 0) {
    return (
      <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800">
        <h2 className="text-2xl font-bold mb-4">
          Performance Trends
        </h2>

        <div className="text-gray-400">
          Run some tests to generate analytics.
        </div>
      </div>
    );
  }

  /*
    Only show latest 10 executions.
    Keeps chart extremely fast.
  */
  const chartData = history
    .slice(-10)
    .map((item, index) => ({
      run: index + 1,
      score: item.health_score || 0,
      duration: item.execution_time || 0,
      passed: item.passed || 0,
      failed: item.failed || 0
    }));

  return (
    <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Performance Trends
        </h2>

        <span className="text-gray-400 text-sm">
          Last {chartData.length} Executions
        </span>
      </div>

      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>

          <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="run" />

            <YAxis />

            <Tooltip />

            <Legend />

            {/* Health Score */}
            <Line
              type="monotone"
              dataKey="score"
              name="Health Score"
              stroke="#22c55e"
              strokeWidth={3}
              dot={true}
            />

            {/* Runtime */}
            <Line
              type="monotone"
              dataKey="duration"
              name="Execution Time (s)"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={true}
            />

          </LineChart>

        </ResponsiveContainer>
      </div>

    </div>
  );
}