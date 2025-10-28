import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/", // important for Vite proxy
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ allow sending cookies (if using JWT cookies)
});
