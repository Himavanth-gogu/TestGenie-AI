import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://127.0.0.1:8000",
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

export const downloadHtmlReport = () => {
  window.open(
    `${import.meta.env.VITE_API_URL}/download/html`,
    "_blank"
  );
};

export const downloadPdfReport = () => {
  window.open(
    `${import.meta.env.VITE_API_URL}/download/pdf`,
    "_blank"
  );
};

export default API;