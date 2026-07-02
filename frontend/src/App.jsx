import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Screenshots from "./pages/Screenshots";
import Reports from "./pages/Reports";
import History from "./pages/History";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/screenshots"
          element={<Screenshots />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;