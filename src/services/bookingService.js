import { privateAxios } from "./axiosInstance";

export const getAllBoookingByUserId = async (userId) => {
  try {
    const response = await privateAxios.get(`/api/bookings/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const createBooking = async (data, userId) => {
  try {
    const response = await privateAxios.post(
      `/api/bookings?userId=${userId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};

export const getAllBoookings = async () => {
  try {
    const response = await privateAxios.get(`/api/bookings/all`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response : error;
  }
};
