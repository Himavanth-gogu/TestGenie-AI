import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function PieChartCard({
  summary = {}
}) {

  const passed = summary.passed || 0;
  const failed = summary.failed || 0;

  const data = [
    {
      name: "Passed",
      value: passed,
      color: "#22C55E"
    },
    {
      name: "Failed",
      value: failed,
      color: "#EF4444"
    }
  ];

  const successRate =
    summary.tests_executed > 0
      ? Math.round(
          (passed /
            summary.tests_executed) *
            100
        )
      : 0;

  return (
    <div className="
      bg-[#111827]
      border border-slate-700/50
      rounded-[28px]
      p-8
      shadow-2xl
      backdrop-blur-xl
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-8
      ">
        Execution Distribution
      </h2>

      <div className="
        grid
        grid-cols-1
        lg:grid-cols-2
        gap-6
        items-center
      ">

        {/* Chart */}
        <div className="
          h-[260px]
        ">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>
              <Pie
                data={data}
                innerRadius={65}
                outerRadius={95}
                paddingAngle={5}
                dataKey="value"
              >
                {
                  data.map(
                    (
                      entry,
                      index
                    ) => (
                      <Cell
                        key={index}
                        fill={
                          entry.color
                        }
                      />
                    )
                  )
                }
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="
          space-y-5
        ">

          <LegendRow
            color="bg-green-500"
            label="Passed"
            value={passed}
          />

          <LegendRow
            color="bg-red-500"
            label="Failed"
            value={failed}
          />

          <LegendRow
            color="bg-yellow-500"
            label="Restricted"
            value="0"
          />

          <LegendRow
            color="bg-cyan-500"
            label="SKIPPED"
            value="0"
          />

          <LegendRow
            color="bg-purple-500"
            label="Auth Required"
            value="0"
          />

          <div className="
            mt-8
            bg-slate-800/70
            rounded-2xl
            p-5
          ">
            <p className="
              text-gray-400
              text-sm
            ">
              Success Rate
            </p>

            <h2 className="
              text-4xl
              font-bold
              text-green-400
              mt-2
            ">
              {successRate}%
            </h2>
          </div>

        </div>

      </div>

    </div>
  );
}

function LegendRow({
  color,
  label,
  value
}) {
  return (
    <div className="
      flex
      justify-between
      items-center
    ">
      <div className="
        flex
        items-center
        gap-3
      ">
        <div className={`
          w-3
          h-3
          rounded-full
          ${color}
        `} />

        <span className="
          text-gray-300
        ">
          {label}
        </span>
      </div>

      <span className="
        font-semibold
        text-white
      ">
        {value}
      </span>
    </div>
  );
}