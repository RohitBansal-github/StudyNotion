import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const apiConnector = async (method, url, bodyData, headers, params) => {
    try {
        const response = await axiosInstance({
            method,
            url,
            data: bodyData ? bodyData : null,
            headers: headers ? headers : null,
            params: params ? params : null,
        });
        return response;
    }
    catch (error) {
        console.log("API Error:", error);
        throw error;
    }
};




