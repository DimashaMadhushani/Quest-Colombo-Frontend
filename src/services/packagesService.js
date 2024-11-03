import { privateAxios } from "./axiosInstance";

export const getAllPackages = async () => {
  try {
    const response = await privateAxios.get("/api/packages");

    return response.data.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const createPackage = async (data) => {
  try {
    const response = await privateAxios.post("/api/packages", data);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const editPackageById = async (id, data) => {
  try {
    const response = await privateAxios.put(`/api/packages/${id}`, data);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const deletePackageById = async (id) => {
  try {
    const response = await privateAxios.delete(`/api/packages/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};
