import { privateAxios, publicAxios } from "./axiosInstance";

export const getAllUsers = async (role) => {
  try {
    const response = await privateAxios.get(`api/user?role=${role}`);
    console.log("responses: service::", response);
    return response.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await privateAxios.get(`api/user/${id}`);
    console.log("responses: service::", response);
    return response.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const createAdmin = async (data) => {
  try {
    const newAdmin = {
      username: data.username,
      email: data.email,
      password: data.password,
      role: "admin",
    };
    const response = await publicAxios.post("/api/register", newAdmin);
    console.log("responses: service::", response);
    return response.data.message;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const deleteUserById = async (id) => {
  try {
    const response = await privateAxios.delete(`/api/user/${id}`);
    console.log("responses: service::", response);
    return response.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};
