export default function ExecutionCounter({ stats }) {
  if (!stats) return null;

  return (
    <div className="
      bg-gray-900
      border border-gray-800
      rounded-3xl
      p-6
      text-center
    ">
      <div className="text-gray-400">
        Total Executions
      </div>

      <div className="
        text-5xl
        font-bold
        mt-4
      ">
        {stats.total_executions}
      </div>
    </div>
  );
}