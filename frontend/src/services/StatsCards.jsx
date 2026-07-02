export default function StatsCards({ summary }) {

    if (!summary) return null;

    const cards = [
        {
            title: "Health Score",
            value: `${summary.health_score}%`
        },
        {
            title: "Tests Executed",
            value: summary.tests_executed
        },
        {
            title: "Passed",
            value: summary.passed
        },
        {
            title: "Failed",
            value: summary.failed
        }
    ];

    return (
        <div className="grid grid-cols-4 gap-6">

            {
                cards.map((card) => (
                    <div
                        key={card.title}
                        className="
                            bg-gray-900
                            rounded-3xl
                            p-6
                            border border-gray-800
                        "
                    >
                        <p className="text-gray-400">
                            {card.title}
                        </p>

                        <h2 className="text-4xl font-bold mt-4">
                            {card.value}
                        </h2>
                    </div>
                ))
            }

        </div>
    );
}