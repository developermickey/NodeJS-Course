import axios from "axios";

// ✅ Auto-detect correct base URL
const BASE_URL =
  import.meta.env.MODE === "development"
    ? "/" // for Vite proxy
    : import.meta.env.VITE_API_BASE_URL || "https://your-production-api.com";

// ✅ Create Axios instance
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // allow sending cookies (JWT/session)
});

// ✅ Request Interceptor (always gets the latest token)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor (global error handling)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (status === 401) {
      console.warn("Unauthorized — redirecting to login...");
    }

    console.error(`[Axios Error ${status || "Network"}]:`, message);
    return Promise.reject({ status, message });
  }
);
