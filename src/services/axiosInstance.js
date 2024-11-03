import axios from "axios";
import { getToken, removeToken, removeUser } from "../utils/authUtils";
import { redirect } from "react-router-dom";

const BASE_URL = "http://localhost:8000";

export const publicAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

privateAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 Unauthorized or other errors (e.g., refreshing token logic)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (optional)
      // e.g., Redirect to login, clear invalid token, etc.
      removeToken();
      removeUser();
      return redirect("/");
    }
    return Promise.reject(error);
  }
);
