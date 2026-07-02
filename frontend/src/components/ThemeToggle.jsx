import { useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="
        bg-gray-800
        px-4
        py-2
        rounded-xl
      "
    >
      {dark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}