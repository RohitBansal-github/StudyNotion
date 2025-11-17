import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const apiConnector = async (method, url, bodyData, headers, params) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData || null,
      headers: headers || {},
      params: params || null,
    });
    return response;
  } catch (error) {
    console.log("API Error:", error);
    throw error;
  }
};






