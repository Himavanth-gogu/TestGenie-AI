import axios from "axios";

const BACKEND_URL =
  "https://testgenie-ai-docker.onrender.com";

const API = axios.create({
  baseURL: BACKEND_URL,
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
    ? `${BACKEND_URL}/download/html/${executionId}`
    : `${BACKEND_URL}/download/html`;

  window.open(
    reportUrl,
    "_blank"
  );
};

export const downloadPdfReport = (
  executionId = ""
) => {
  const reportUrl = executionId
    ? `${BACKEND_URL}/download/pdf/${executionId}`
    : `${BACKEND_URL}/download/pdf`;

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

  return `${BACKEND_URL}/${screenshotPath}`;
};

export default API;