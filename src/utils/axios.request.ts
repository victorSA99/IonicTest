import axios from "axios";
import { getToken } from "../services/initializeStorage.service";

const apiUrl = "http://127.0.0.1:8000/api";

console.log(apiUrl);

export const axiosRequest = axios.create({
  baseURL: apiUrl,
  withCredentials: false,
});

axiosRequest.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosRequest;
