import { privateAxios } from "./axiosInstance";

export const getAllWorkspaceTypes = async () => {
  try {
    const response = await privateAxios.get("/api/workSpaceTypes");
    return response.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const createWorkspaceType = async (data) => {
  try {
    const response = await privateAxios.post("/api/workSpaceTypes", data);
    return response.data.workspaceType;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const editWorkspaceTypeById = async (id, data) => {
  try {
    const response = await privateAxios.put(`/api/workSpaceTypes/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const deleteWorkspaceTypeById = async (id) => {
  try {
    const response = await privateAxios.delete(`/api/workSpaceTypes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};
