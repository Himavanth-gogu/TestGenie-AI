import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";

export default function Analytics() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await fetch(
        "https://testgenie-ai-docker.onrender.com/dashboard/history"
      );

      const data = await response.json();

      setHistory(data);
    } catch (err) {
      console.log(err);
    }
  };

  const totalExecutions = history.length;

  const averageScore =
    totalExecutions > 0
      ? Math.round(
          history.reduce(
            (acc, item) =>
              acc + item.health_score,
            0
          ) / totalExecutions
        )
      : 0;

  const totalScreenshots =
    history.reduce(
      (acc, item) =>
        acc + item.screenshots,
      0
    );

  const averageTime =
    totalExecutions > 0
      ? (
          history.reduce(
            (acc, item) =>
              acc +
              item.execution_time,
            0
          ) / totalExecutions
        ).toFixed(1)
      : 0;

  return (
    <div className="
      flex
      min-h-screen
      bg-[#0B1120]
      text-white
    ">
      <Sidebar />

      <div className="
        flex-1
        p-10
        overflow-auto
      ">
        <h1 className="
          text-5xl
          font-bold
          mb-3
        ">
          Analytics
        </h1>

        <p className="
          text-gray-400
          mb-10
        ">
          Historical execution intelligence
        </p>

        <div className="
          grid
          lg:grid-cols-4
          gap-8
        ">
          <Card
            title="Executions"
            value={totalExecutions}
            icon="🚀"
          />

          <Card
            title="Avg Health"
            value={`${averageScore}%`}
            icon="💚"
          />

          <Card
            title="Screenshots"
            value={totalScreenshots}
            icon="📷"
          />

          <Card
            title="Avg Runtime"
            value={`${averageTime}s`}
            icon="⏱️"
          />
        </div>

        <div className="
          mt-10
          bg-[#111827]
          rounded-3xl
          p-10
        ">
          <h2 className="
            text-3xl
            font-bold
            mb-8
          ">
            Recent Analytics
          </h2>

          <div className="
            space-y-5
          ">
            {
              history.slice(0,10).map(
                (item,index)=>(
                  <div
                    key={index}
                    className="
                      bg-slate-800
                      rounded-2xl
                      p-5
                      flex
                      justify-between
                    "
                  >
                    <div>
                      <h3 className="
                        text-xl
                        font-bold
                      ">
                        {
                          new URL(
                            item.url
                          ).hostname
                        }
                      </h3>

                      <p className="
                        text-gray-400
                      ">
                        {
                          item.created_at
                        }
                      </p>
                    </div>

                    <div className="
                      text-right
                    ">
                      <div>
                        Score:
                        {
                          item.health_score
                        }%
                      </div>

                      <div>
                        Runtime:
                        {
                          item.execution_time
                        }s
                      </div>
                    </div>
                  </div>
                )
              )
            }
          </div>
        </div>

      </div>
    </div>
  );
}

function Card({
  title,
  value,
  icon
}) {
  return (
    <div className="
      bg-[#111827]
      rounded-3xl
      p-8
      border
      border-slate-700/50
    ">
      <div className="
        text-5xl
        mb-4
      ">
        {icon}
      </div>

      <p className="
        text-gray-400
      ">
        {title}
      </p>

      <h2 className="
        text-4xl
        font-bold
        mt-2
      ">
        {value}
      </h2>
    </div>
  );
}