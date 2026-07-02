import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

export const analyzeWebsite = (url) => {
    return API.post("/analyze", {
        url
    });
};

export const getDashboardStats = () => {
    return API.get("/dashboard/stats");
};

export const downloadHtmlReport = () => {
    window.open(
        "http://127.0.0.1:8000/download/html",
        "_blank"
    );
};

export const downloadPdfReport = () => {
    window.open(
        "http://127.0.0.1:8000/download/pdf",
        "_blank"
    );
};

export default API;