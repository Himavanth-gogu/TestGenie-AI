export default function RecentRunsTable({ history }) {
  if (!history?.length) return null;

  return (
    <div className="bg-gray-900 rounded-3xl p-8">
      <h2 className="text-2xl mb-6">
        Recent Runs
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-gray-700">
            <th>Website</th>
            <th>Score</th>
            <th>Passed</th>
            <th>Failed</th>
          </tr>
        </thead>

        <tbody>
          {history.map((row, index) => (
            <tr key={index}>
              <td>{row.website}</td>
              <td>{row.health_score}</td>
              <td>{row.passed}</td>
              <td>{row.failed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}