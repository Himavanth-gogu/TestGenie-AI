import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function Settings() {

  const [darkMode,setDarkMode]=
    useState(true);

  const [
    screenshotsEnabled,
    setScreenshotsEnabled
  ] = useState(true);

  const [
    htmlReport,
    setHtmlReport
  ] = useState(true);

  const [
    pdfReport,
    setPdfReport
  ] = useState(true);

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
          Settings
        </h1>

        <p className="
          text-gray-400
          mb-10
        ">
          Configure automation
          behaviour and reports
        </p>

        <div className="
          grid
          lg:grid-cols-2
          gap-8
        ">

          <Card
            title="Appearance"
          >
            <Toggle
              label="Dark Mode"
              enabled={darkMode}
              onChange={
                setDarkMode
              }
            />
          </Card>

          <Card
            title="Automation"
          >
            <SettingRow
              label="Browser"
              value="Chromium"
            />

            <SettingRow
              label="Timeout"
              value="30 Seconds"
            />

            <Toggle
              label="Screenshots"
              enabled={
                screenshotsEnabled
              }
              onChange={
                setScreenshotsEnabled
              }
            />
          </Card>

          <Card
            title="Reports"
          >
            <Toggle
              label="HTML Reports"
              enabled={
                htmlReport
              }
              onChange={
                setHtmlReport
              }
            />

            <Toggle
              label="PDF Reports"
              enabled={
                pdfReport
              }
              onChange={
                setPdfReport
              }
            />
          </Card>

          <Card
            title="System"
          >
            <SettingRow
              label="Version"
              value="2.0.0"
            />

            <SettingRow
              label="Framework"
              value="FastAPI"
            />

            <SettingRow
              label="Frontend"
              value="React"
            />
          </Card>

        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  children
}) {
  return (
    <div className="
      bg-[#111827]
      border
      border-slate-700/50
      rounded-3xl
      p-8
    ">
      <h2 className="
        text-2xl
        font-bold
        mb-8
      ">
        {title}
      </h2>

      <div className="
        space-y-6
      ">
        {children}
      </div>
    </div>
  );
}

function SettingRow({
  label,
  value
}) {
  return (
    <div className="
      flex
      justify-between
      items-center
    ">
      <span>
        {label}
      </span>

      <span className="
        text-blue-400
      ">
        {value}
      </span>
    </div>
  );
}

function Toggle({
  label,
  enabled,
  onChange
}) {
  return (
    <div className="
      flex
      justify-between
      items-center
    ">
      <span>
        {label}
      </span>

      <button
        onClick={() =>
          onChange(
            !enabled
          )
        }
        className={`
          w-14
          h-8
          rounded-full
          transition-all
          ${
            enabled
            ? "bg-blue-500"
            : "bg-gray-700"
          }
        `}
      >
        <div className={`
          w-6
          h-6
          bg-white
          rounded-full
          mt-1
          transition-all
          ${
            enabled
            ? "ml-7"
            : "ml-1"
          }
        `}/>
      </button>
    </div>
  );
}