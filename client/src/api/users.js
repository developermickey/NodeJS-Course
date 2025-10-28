import { axiosInstance } from "./index";
// register a new user

export const RegisterUser = async (value) => {
  try {
    const res = await axiosInstance.post("/api/users/register", value);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const LoginUser = async (value) => {
  try {
    const res = await axiosInstance.post("/api/users/login", value);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
