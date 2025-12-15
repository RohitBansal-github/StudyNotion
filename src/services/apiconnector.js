import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const apiConnector = async (method, url, bodyData, headers = {}, params) => {
  const lsToken = localStorage.getItem("token");

  // priority to manually passed token
  if (!headers.Authorization && lsToken) {
    headers.Authorization = `Bearer ${lsToken}`;
  }

  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData || null,
      headers: {
        ...headers,
      },
      params: params || null,
    });
    return response;
  } catch (error) {
    console.log("API Error:", error);
    throw error;
  }
};








