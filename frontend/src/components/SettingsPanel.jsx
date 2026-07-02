export default function SettingsPanel() {
  return (
    <div className="
      bg-gray-900
      border border-gray-800
      rounded-3xl
      p-8
    ">
      <h2 className="text-2xl font-bold mb-6">
        Settings
      </h2>

      <div className="space-y-4">

        <button className="
          bg-gray-800
          px-6 py-3
          rounded-xl
          w-full
        ">
          Toggle Theme
        </button>

        <button className="
          bg-gray-800
          px-6 py-3
          rounded-xl
          w-full
        ">
          Clear History
        </button>

      </div>
    </div>
  );
}