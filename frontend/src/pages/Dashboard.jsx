import { useState } from "react";
import { analyzeWebsite } from "../services/api";
import { useApp } from "../context/AppContext";

import Sidebar from "../components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";

import ExecutionSummary from "../components/ExecutionSummary";
import StatsCards from "../components/StatsCards";
import PieChartCard from "../components/PieChartCard";
import HealthGauge from "../components/HealthGauge";

import ScreenshotGallery from "../components/ScreenshotGallery";
import TestResults from "../components/TestResults";
import ReportPreview from "../components/ReportPreview";

import TrendChart from "../components/TrendChart";
import RecentRunsTable from "../components/RecentRunsTable";

import AIInsights from "../components/AIInsights";
import LiveActivityFeed from "../components/LiveActivityFeed";

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    result,
    setResult,
    history,
    setHistory,
    screenshots,
    setScreenshots,
  } = useApp();

  const runTest = async () => {
    if (!url.trim()) {
      alert("Please enter a website URL");
      return;
    }

    try {
      setLoading(true);

      const response = await analyzeWebsite(url);

      const data = response.data;

      setResult(data);

      setScreenshots(
        data.screenshots || []
      );

      try {
        const statsResponse = await fetch(
          "http://127.0.0.1:8000/dashboard/stats"
        );

        const statsData =
          await statsResponse.json();

        setHistory(
          statsData.execution_history || []
        );
      } catch (err) {
        console.log(err);
      }

      setUrl("");
    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(
          error.response.data.detail ||
          error.response.data.message ||
          "Backend Error"
        );
      } else {
        alert(
          "Unable to connect to backend server."
        );
      }
    } finally {
      setLoading(false);
    }
  };

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
        overflow-auto
        px-10
        py-8
      ">

        {/* Header */}
        <div className="
          flex
          justify-between
          items-start
          mb-10
        ">
          <div>
            <h1 className="
              text-5xl
              font-bold
            ">
              TestGenie AI
            </h1>

            <p className="
              text-gray-400
              text-lg
              mt-3
            ">
              Enterprise QA Intelligence Platform
            </p>

            <div className="
              flex
              gap-6
              mt-5
              text-sm
              text-gray-500
              flex-wrap
            ">
              <span>Automated Testing</span>
              <span>Screenshot Capture</span>
              <span>AI Reporting</span>
              <span>Visual Validation</span>
            </div>
          </div>

          <ThemeToggle />
        </div>

        {/* Run Test Card */}
        <div className="
          bg-[#111827]
          border border-slate-700/50
          rounded-[28px]
          p-8
          shadow-2xl
          backdrop-blur-xl
          mb-8
        ">
          <h2 className="
            text-2xl
            font-bold
            mb-6
          ">
            Start Website Analysis
          </h2>

          <div className="
            flex
            gap-4
            flex-col
            lg:flex-row
          ">
            <input
              type="text"
              value={url}
              disabled={loading}
              placeholder="Enter website URL (example: python.org)"
              onChange={(e) =>
                setUrl(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  runTest();
                }
              }}
              className="
                flex-1
                bg-slate-800/70
                border border-slate-700
                rounded-2xl
                px-6
                py-4
                text-lg
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-500/20
              "
            />

            <button
              onClick={runTest}
              disabled={loading}
              className="
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-gray-700
                disabled:cursor-not-allowed
                px-8
                py-4
                rounded-2xl
                font-semibold
                transition-all
                duration-300
              "
            >
              {
                loading
                  ? "Running Analysis..."
                  : "Run AI Testing"
              }
            </button>
          </div>

          {loading && (
            <div className="
              mt-6
              text-gray-400
              space-y-2
            ">
              <p>🌐 Analyzing Website...</p>
              <p>🔍 Discovering Pages...</p>
              <p>🤖 Generating Tests...</p>
              <p>📷 Capturing Screenshots...</p>
              <p>📄 Generating Reports...</p>
            </div>
          )}
        </div>

        {/* Execution Summary */}
        {result && (
          <ExecutionSummary
            result={result}
          />
        )}

        {/* KPI Cards */}
        {result?.summary && (
          <div className="mt-8">
            <StatsCards
              summary={result.summary}
            />
          </div>
        )}

        {/* Analytics */}
        {result?.summary && (
          <div className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-8
            mt-8
          ">
            <PieChartCard
              summary={result.summary}
            />

            <HealthGauge
              score={
                result.summary
                  .health_score
              }
            />
          </div>
        )}

        {/* Screenshots */}
        {
          screenshots.length > 0 && (
            <div className="mt-8">
              <ScreenshotGallery
                screenshots={
                  screenshots
                }
              />
            </div>
          )
        }

        {/* Test Results */}
        {
          result?.automation_results && (
            <div className="mt-8">
              <TestResults
                results={
                  result.automation_results
                }
              />
            </div>
          )
        }

        {/* Reports */}
        {
          result?.reports && (
            <div className="mt-8">
              <ReportPreview />
            </div>
          )
        }

        {/* AI Insights */}
        {result && (
          <div className="mt-8">
            <AIInsights
              result={result}
            />
          </div>
        )}

        {/* Activity Feed */}
        {result && (
          <div className="mt-8">
            <LiveActivityFeed
              result={result}
            />
          </div>
        )}

        {/* Trend Chart */}
        {
          history.length > 0 && (
            <div className="mt-8">
              <TrendChart
                history={history}
              />
            </div>
          )
        }

        {/* History Table */}
        {
          history.length > 0 && (
            <div className="
              mt-8
              mb-10
            ">
              <RecentRunsTable
                history={history}
              />
            </div>
          )
        }

      </div>
    </div>
  );
}