export default function LoadingStatus() {
  const steps = [
    "Website Analysis",
    "Page Discovery",
    "AI Test Generation",
    "Automation Execution",
    "Screenshot Capture",
    "Report Generation"
  ];

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Live Execution Status
      </h2>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="
              flex
              items-center
              gap-4
              bg-gray-800
              rounded-xl
              p-4
            "
          >
            <div className="
              w-4
              h-4
              rounded-full
              bg-green-500
              animate-pulse
            " />

            <span>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}