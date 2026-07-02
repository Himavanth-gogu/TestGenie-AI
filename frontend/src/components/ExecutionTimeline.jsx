export default function ExecutionTimeline({ loading }) {
  const steps = [
    "Website Analysis",
    "Page Discovery",
    "Test Generation",
    "Automation Execution",
    "Screenshot Capture",
    "Report Generation"
  ];

  return (
    <div className="bg-gray-900 rounded-3xl p-8">
      <h2 className="text-2xl mb-6">
        Execution Timeline
      </h2>

      <div className="space-y-4">
        {steps.map((step) => (
          <div
            key={step}
            className="flex items-center gap-4"
          >
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <p>{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}