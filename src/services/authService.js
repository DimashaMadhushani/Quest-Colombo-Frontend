import { saveToken, saveUser } from "../utils/authUtils";
import { publicAxios } from "./axiosInstance";

export const userLogin = async (userCredentials) => {
  try {
    const { data } = await publicAxios.post("/api/login", userCredentials);
    const { token } = data;
    const { user } = data;
    saveToken(token);
    saveUser(JSON.stringify(user));
    return data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const userRegister = async (userDetails) => {
  try {
    const { data } = await publicAxios.post("/api/register", {
      ...userDetails,
      role: "user",
    });
    const { token } = data;
    const { user } = data;
    saveToken(token);
    saveUser(JSON.stringify(user));
    return data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const confirmEmail = async (email) => {
  try {
    const response = await publicAxios.post("/api/otp", email);

    return response.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const resetPassword = async (details) => {
  try {
    const response = await publicAxios.post("/api/reset-password", details);

    return response.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};
