import { axiosInstance } from "./index";

const handleRequestPost = async (url, data) => {
  try {
    const res = await axiosInstance.post(url, data);
    return res.data;
  } catch (error) {
    // Better error handling
    console.error("API Error:", error.response?.data || error.message);
    // Optional: throw for upper layers (like React toast handlers)
    throw error.response?.data || { success: false, message: "Server Error" };
  }
};

const handleRequestGet = async (url, data) => {
  try {
    const res = await axiosInstance.get(url, data);
    return res.data;
  } catch (error) {
    // Better error handling
    console.error("API Error:", error.response?.data || error.message);
    // Optional: throw for upper layers (like React toast handlers)
    throw error.response?.data || { success: false, message: "Server Error" };
  }
};

// ✅ Register a new user
export const RegisterUser = (data) =>
  handleRequestPost("/api/users/register", data);

// ✅ Login user
export const LoginUser = (data) => handleRequestPost("/api/users/login", data);

export const GetCurrentUser = (data) =>
  handleRequestGet("/api/users/current", data);
