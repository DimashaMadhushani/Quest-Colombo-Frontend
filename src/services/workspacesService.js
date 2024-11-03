import { privateAxios } from "./axiosInstance";

export const getAllWorkspaces = async () => {
  try {
    const response = await privateAxios.get("/api/workSpaces");
    return response.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const getWorkspacesByTypeAndDate = async (workspace_type, date) => {
  try {
    const response = await privateAxios.get("/api/workSpacesByDate", {
      params: {
        workspace_type,
        date,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const createWorkspace = async (data) => {
  try {
    const response = await privateAxios.post("/api/workSpaces", data);
    return response.data.workspace;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const editWorkspaceById = async (id, data) => {
  try {
    const response = await privateAxios.put(`/api/workSpaces/${id}`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const deleteWorkspaceById = async (id) => {
  try {
    const response = await privateAxios.delete(`/api/workSpaces/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};
