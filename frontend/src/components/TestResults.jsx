export default function TestResults({ results = [] }) {
  if (!results.length) {
    return null;
  }

  const getColor = (status) => {
    switch (status) {
      case "PASS":
        return "border-green-500 bg-green-900/30";

      case "FAIL":
        return "border-red-500 bg-red-900/30";

      case "RESTRICTED":
        return "border-yellow-500 bg-yellow-900/30";

      case "TIMEOUT":
        return "border-orange-500 bg-orange-900/30";

      case "AUTH_REQUIRED":
        return "border-purple-500 bg-purple-900/30";

      default:
        return "border-gray-700 bg-gray-800";
    }
  };

  const getIcon = (status) => {
    switch (status) {
      case "PASS":
        return "✅";

      case "FAIL":
        return "❌";

      case "RESTRICTED":
        return "🛡️";

      case "TIMEOUT":
        return "⏱️";

      case "AUTH_REQUIRED":
        return "🔐";

      default:
        return "ℹ️";
    }
  };

  return (
    <div className="
      bg-gray-900
      border border-gray-800
      rounded-3xl
      p-8
      mt-8
    ">
      <h2 className="
        text-2xl
        font-bold
        mb-6
      ">
        Automation Results
      </h2>

      <div className="space-y-5">
        {results.map((item, index) => (
          <div
            key={index}
            className={`
              border
              rounded-2xl
              p-5
              ${getColor(item.status)}
            `}
          >
            <div className="
              flex
              justify-between
              items-center
              mb-3
            ">
              <h3 className="font-bold text-lg">
                {item.test}
              </h3>

              <span className="text-xl">
                {getIcon(item.status)} {item.status}
              </span>
            </div>

            {item.details && (
              <p className="text-gray-300">
                {item.details}
              </p>
            )}

            {item.reason && (
              <p className="text-yellow-300 mt-2">
                <strong>Reason:</strong> {item.reason}
              </p>
            )}

            {item.recommendation && (
              <p className="text-blue-300 mt-2">
                <strong>Recommendation:</strong>{" "}
                {item.recommendation}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}