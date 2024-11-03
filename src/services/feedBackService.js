import { privateAxios } from "./axiosInstance";

export const getAllFeedBacks = async () => {
  try {
    const response = await privateAxios.get("/api/feedbacks");
    console.log("responses: service::", response);
    return response.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const createFeedBack = async (data) => {
  try {
    const response = await privateAxios.post("/api/feedback", data);
    console.log("responses: service::", response);
    return response.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const deleteInquiryById = async (id) => {
  try {
    const response = await privateAxios.delete(`/api/feedback/${id}`);
    console.log("responses: service::", response);
    return response.data.message;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};
