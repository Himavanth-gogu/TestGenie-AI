export default function ReportPreview() {
  const reports = [
    {
      title: "HTML Report",
      description:
        "Interactive browser report with execution details.",
      color:
        "from-green-500/20 to-green-600/10",
      preview:
        "http://127.0.0.1:8000/reports/report.html",
      download:
        "http://127.0.0.1:8000/download/html",
      badge: "Available"
    },
    {
      title: "PDF Report",
      description:
        "Portable report suitable for sharing with teams.",
      color:
        "from-red-500/20 to-red-600/10",
      preview:
        "http://127.0.0.1:8000/reports/report.pdf",
      download:
        "http://127.0.0.1:8000/download/pdf",
      badge: "Ready"
    }
  ];

  return (
    <div className="
      bg-[#111827]
      border border-slate-700/50
      rounded-[28px]
      p-8
      shadow-2xl
      backdrop-blur-xl
    ">
      <div className="
        flex
        justify-between
        items-center
        mb-8
      ">
        <div>
          <h2 className="
            text-3xl
            font-bold
          ">
            Reports Center
          </h2>

          <p className="
            text-gray-400
            mt-2
          ">
            Download and share execution reports
          </p>
        </div>

        <div className="
          bg-blue-500/10
          border border-blue-500/20
          px-5 py-2
          rounded-xl
          text-blue-400
          font-semibold
        ">
          2 Reports
        </div>
      </div>

      <div className="
        grid
        md:grid-cols-2
        gap-8
      ">
        {reports.map((report) => (
          <div
            key={report.title}
            className={`
              bg-gradient-to-br
              ${report.color}
              border border-slate-700/50
              rounded-3xl
              p-7
              hover:scale-[1.02]
              transition-all
              duration-300
            `}
          >
            <div className="
              flex
              justify-between
              items-center
              mb-6
            ">
              <h3 className="
                text-2xl
                font-bold
              ">
                {report.title}
              </h3>

              <span className="
                text-sm
                bg-white/10
                px-3 py-1
                rounded-full
              ">
                {report.badge}
              </span>
            </div>

            <p className="
              text-gray-300
              mb-8
            ">
              {report.description}
            </p>

            <div className="
              flex
              gap-4
            ">
              <a
                href={report.preview}
                target="_blank"
                rel="noreferrer"
                className="
                  flex-1
                  text-center
                  bg-blue-600
                  hover:bg-blue-700
                  py-3
                  rounded-xl
                  transition
                "
              >
                Open Preview
              </a>

              <a
                href={report.download}
                className="
                  flex-1
                  text-center
                  bg-slate-700
                  hover:bg-slate-600
                  py-3
                  rounded-xl
                  transition
                "
              >
                Download
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}