export default function AnalyticsCards({ stats }) {
  if (!stats) return null;

  const cards = [
    {
      title: "Reports Generated",
      value: stats.reports_generated
    },
    {
      title: "Screenshots Captured",
      value: stats.screenshots_captured
    },
    {
      title: "Passed Tests",
      value: stats.total_passed
    },
    {
      title: "Failed Tests",
      value: stats.total_failed
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mt-8">

      {
        cards.map(card => (
          <div
            key={card.title}
            className="
              bg-gray-900
              border border-gray-800
              rounded-3xl
              p-6
            "
          >
            <div className="text-gray-400">
              {card.title}
            </div>

            <div className="
              text-4xl
              font-bold
              mt-4
            ">
              {card.value}
            </div>
          </div>
        ))
      }

    </div>
  );
}