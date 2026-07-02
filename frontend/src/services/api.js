import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const analyzeWebsite = (url) => {
  return API.post("/analyze", {
    url,
  });
};

export const getDashboardStats = () => {
  return API.get("/dashboard/stats");
};

export const getExecutionHistory = () => {
  return API.get("/dashboard/history");
};

export const downloadHtmlReport = (
  executionId = ""
) => {
  const reportUrl = executionId
    ? `${API.defaults.baseURL}/download/html/${executionId}`
    : `${API.defaults.baseURL}/download/html`;

  window.open(
    reportUrl,
    "_blank"
  );
};

export const downloadPdfReport = (
  executionId = ""
) => {
  const reportUrl = executionId
    ? `${API.defaults.baseURL}/download/pdf/${executionId}`
    : `${API.defaults.baseURL}/download/pdf`;

  window.open(
    reportUrl,
    "_blank"
  );
};

export const getScreenshotUrl = (
  screenshotPath
) => {
  if (!screenshotPath) {
    return "";
  }

  if (
    screenshotPath.startsWith("http")
  ) {
    return screenshotPath;
  }

  return `${API.defaults.baseURL}/${screenshotPath}`;
};

export default API;