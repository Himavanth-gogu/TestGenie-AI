import Sidebar from "../components/Sidebar";
import ReportPreview from "../components/ReportPreview";

import { useApp } from "../context/AppContext";

export default function Reports() {
  const { result } = useApp();

  return (
    <div className="flex bg-[#0B1120] min-h-screen text-white">
      <Sidebar />

      <div className="flex-1 p-10 overflow-auto">

        <h1 className="text-5xl font-bold mb-3">
          Reports Center
        </h1>

        <p className="text-gray-400 mb-10">
          View and download generated reports
        </p>

        {
          result?.reports ? (
            <ReportPreview />
          ) : (
            <EmptyState />
          )
        }

      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-[#111827] rounded-3xl p-12 text-center">
      <div className="text-6xl mb-6">
        📄
      </div>

      <h2 className="text-3xl font-bold mb-4">
        No Reports Available
      </h2>

      <p className="text-gray-400">
        Run a test execution to generate reports.
      </p>
    </div>
  );
}