import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import RecentRunsTable from "../components/RecentRunsTable";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/dashboard/history"
      );

      const data = await response.json();

      setHistory(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
      flex
      bg-[#0B1120]
      min-h-screen
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
          Execution History
        </h1>

        <p className="
          text-gray-400
          mb-10
        ">
          Historical executions stored permanently
        </p>

        {
          loading ? (
            <div className="
              bg-[#111827]
              rounded-3xl
              p-10
              text-center
            ">
              Loading history...
            </div>
          ) : history.length > 0 ? (
            <RecentRunsTable
              history={history}
            />
          ) : (
            <div className="
              bg-[#111827]
              rounded-3xl
              p-12
              text-center
            ">
              <div className="
                text-6xl
                mb-6
              ">
                📜
              </div>

              <h2 className="
                text-3xl
                font-bold
                mb-4
              ">
                No Execution History
              </h2>

              <p className="
                text-gray-400
              ">
                Run your first test to create history.
              </p>
            </div>
          )
        }
      </div>
    </div>
  );
}