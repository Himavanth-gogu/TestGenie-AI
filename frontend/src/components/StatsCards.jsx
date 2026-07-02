export default function StatsCards({
  summary = {}
}) {

  const cards = [
    {
      title: "Health Score",
      value: `${summary.health_score || 0}%`,
      subtitle:
        summary.health_score >= 90
          ? "Excellent Health"
          : "Needs Attention",
      trend: "↑ Stable",
      color: "text-green-400",
      bg: "from-green-500/20 to-green-600/10"
    },

    {
      title: "Tests Executed",
      value: summary.tests_executed || 0,
      subtitle: `${summary.passed || 0} Passed`,
      trend: `${summary.failed || 0} Failed`,
      color: "text-blue-400",
      bg: "from-blue-500/20 to-blue-600/10"
    },

    {
      title: "Passed Tests",
      value: summary.passed || 0,
      subtitle: "Automation Success",
      trend: `${Math.round(
        (
          (summary.passed || 0) /
          (summary.tests_executed || 1)
        ) * 100
      )}% Success Rate`,
      color: "text-emerald-400",
      bg: "from-emerald-500/20 to-emerald-600/10"
    },

    {
      title: "Failed Tests",
      value: summary.failed || 0,
      subtitle:
        summary.failed === 0
          ? "No Issues Found"
          : "Attention Required",
      trend:
        summary.failed === 0
          ? "System Healthy"
          : "Investigate Failures",
      color: "text-red-400",
      bg: "from-red-500/20 to-red-600/10"
    }
  ];

  return (
    <div className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-4
      gap-6
    ">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`
            bg-gradient-to-br
            ${card.bg}
            bg-[#111827]
            border border-slate-700/50
            rounded-[28px]
            p-7
            shadow-2xl
            backdrop-blur-xl
            hover:scale-[1.02]
            transition-all
            duration-300
          `}
        >

          <p className="
            text-gray-400
            text-sm
            mb-4
          ">
            {card.title}
          </p>

          <h2 className={`
            text-4xl
            font-bold
            ${card.color}
          `}>
            {card.value}
          </h2>

          <p className="
            mt-4
            text-gray-300
          ">
            {card.subtitle}
          </p>

          <p className="
            mt-2
            text-sm
            text-gray-500
          ">
            {card.trend}
          </p>

        </div>
      ))}
    </div>
  );
}