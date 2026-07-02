import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [screenshots, setScreenshots] = useState([]);

  return (
    <AppContext.Provider
      value={{
        result,
        setResult,
        history,
        setHistory,
        screenshots,
        setScreenshots,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}