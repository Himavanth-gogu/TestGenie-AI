export default function HealthGauge({
  score = 0
}) {

  const getStatus = () => {
    if (score >= 90) return "Excellent Stability";
    if (score >= 75) return "Good Stability";
    if (score >= 50) return "Moderate Stability";

    return "Needs Attention";
  };

  const getColor = () => {
    if (score >= 90) return "text-green-400";
    if (score >= 75) return "text-blue-400";
    if (score >= 50) return "text-yellow-400";

    return "text-red-400";
  };

  return (
    <div
      className="
      bg-[#111827]
      border border-slate-700/50
      rounded-[28px]
      p-8
      shadow-2xl
      backdrop-blur-xl
      "
    >
      <h2 className="
        text-2xl
        font-bold
        mb-8
      ">
        Health Score
      </h2>

      {/* Main Score */}
      <div className="
        flex
        flex-col
        items-center
        justify-center
      ">
        <div className="
          w-44
          h-44
          rounded-full
          border-[10px]
          border-green-500/30
          flex
          items-center
          justify-center
          mb-6
        ">
          <div className="text-center">
            <div className={`
              text-5xl
              font-bold
              ${getColor()}
            `}>
              {score}%
            </div>

            <p className="
              text-gray-400
              text-sm
              mt-2
            ">
              Health
            </p>
          </div>
        </div>

        <h3 className={`
          text-xl
          font-semibold
          ${getColor()}
        `}>
          {getStatus()}
        </h3>
      </div>

      {/* Metrics */}
      <div className="
        mt-10
        space-y-5
      ">

        <MetricRow
          label="Availability"
          value="99%"
          color="bg-green-500"
        />

        <MetricRow
          label="Performance"
          value="98%"
          color="bg-blue-500"
        />

        <MetricRow
          label="Coverage"
          value={`${score}%`}
          color="bg-cyan-500"
        />

      </div>

      {/* Footer */}
      <div className="
        mt-8
        text-center
        text-sm
        text-gray-500
      ">
        Last Updated

        <div className="
          mt-2
          text-gray-300
        ">
          {
            new Date().toLocaleTimeString()
          }
        </div>
      </div>

    </div>
  );
}

function MetricRow({
  label,
  value,
  color
}) {
  return (
    <div>

      <div className="
        flex
        justify-between
        mb-2
      ">
        <span className="
          text-gray-400
        ">
          {label}
        </span>

        <span className="
          font-semibold
        ">
          {value}
        </span>
      </div>

      <div className="
        h-2
        bg-slate-800
        rounded-full
        overflow-hidden
      ">
        <div
          className={`
            h-full
            rounded-full
            ${color}
          `}
          style={{
            width: value
          }}
        />
      </div>

    </div>
  );
}