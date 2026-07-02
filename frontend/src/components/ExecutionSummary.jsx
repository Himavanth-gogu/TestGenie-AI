export default function ExecutionSummary({
  result
}) {
  if (!result) {
    return null;
  }

  const website =
    result.analysis?.url
      ? getDomain(result.analysis.url)
      : "-";

  return (
    <div
      className="
      mt-8
      rounded-3xl
      border border-blue-500/20
      bg-gradient-to-r
      from-blue-500/10
      to-cyan-500/10
      backdrop-blur-xl
      p-8
      "
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="
          w-14
          h-14
          rounded-2xl
          bg-green-500/20
          flex
          items-center
          justify-center
          text-3xl
          "
        >
          ✅
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            Execution Completed
          </h2>

          <p className="text-gray-400 mt-1">
            Automation finished successfully
          </p>
        </div>
      </div>

      {/* Cards */}
      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
        "
      >
        <SummaryItem
          title="Website"
          value={website}
        />

        <SummaryItem
          title="Execution Time"
          value={`${result.execution_time_seconds || 0}s`}
        />

        <SummaryItem
          title="Health Score"
          value={`${result.summary?.health_score || 0}%`}
        />

        <SummaryItem
          title="Tests Executed"
          value={result.summary?.tests_executed || 0}
        />

        <SummaryItem
          title="Screenshots"
          value={result.screenshots?.length || 0}
        />

        <SummaryItem
          title="Reports Generated"
          value="2"
        />
      </div>
    </div>
  );
}

function SummaryItem({
  title,
  value
}) {
  const longText =
    String(value).length > 18;

  return (
    <div
      className="
      bg-white/5
      border border-white/10
      rounded-2xl
      p-5
      min-h-[140px]
      flex
      flex-col
      justify-center
      transition-all
      duration-300
      hover:border-blue-500/30
      hover:bg-white/10
      "
    >
      <p
        className="
        text-gray-400
        text-sm
        mb-3
        "
      >
        {title}
      </p>

      <div
        className={`
          font-bold
          text-white
          break-words
          leading-tight
          ${
            longText
              ? "text-lg"
              : "text-3xl"
          }
        `}
      >
        {value}
      </div>
    </div>
  );
}

function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}