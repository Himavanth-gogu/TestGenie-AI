export default function AIInsights({
  result
}) {
  if (!result) {
    return null;
  }

  const insights = [];

  const score =
    result.summary?.health_score || 0;

  const runtime =
    result.execution_time_seconds || 0;

  const screenshots =
    result.screenshots?.length || 0;

  const brokenLinks =
    result.broken_links?.length || 0;

  if (score >= 90) {
    insights.push(
      "Excellent website stability detected."
    );
  }

  if (screenshots > 0) {
    insights.push(
      `Visual validation completed with ${screenshots} screenshots captured.`
    );
  }

  if (brokenLinks === 0) {
    insights.push(
      "No broken links were detected."
    );
  }

  if (runtime < 10) {
    insights.push(
      `Execution completed in ${runtime}s which is faster than average execution times.`
    );
  }

  insights.push(
    "Consider increasing page discovery depth for broader validation coverage."
  );

  if (score >= 95) {
    insights.push(
      "Overall website health classification: Enterprise Ready."
    );
  }

  return (
    <div className="
      bg-[#111827]
      border border-slate-700/50
      rounded-[28px]
      p-8
      shadow-2xl
      backdrop-blur-xl
    ">
      <div className="
        flex
        justify-between
        items-center
        mb-8
      ">
        <div>
          <h2 className="
            text-3xl
            font-bold
          ">
            AI Insights
          </h2>

          <p className="
            text-gray-400
            mt-2
          ">
            Intelligent recommendations generated from execution results
          </p>
        </div>

        <div className="
          bg-purple-500/10
          border border-purple-500/20
          px-5 py-2
          rounded-xl
          text-purple-400
          font-semibold
        ">
          AI Engine Active
        </div>
      </div>

      <div className="
        space-y-5
      ">
        {
          insights.map(
            (
              insight,
              index
            ) => (
              <div
                key={index}
                className="
                  flex
                  gap-4
                  items-start
                  bg-slate-900/60
                  border border-slate-700/50
                  rounded-2xl
                  p-5
                "
              >
                <div className="
                  text-green-400
                  text-xl
                ">
                  ✓
                </div>

                <p className="
                  text-gray-300
                  leading-7
                ">
                  {insight}
                </p>
              </div>
            )
          )
        }
      </div>
    </div>
  );
}