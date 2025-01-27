import axios from "axios";
import store from "./app/store";
import { refresh } from "./features/auth/authSlice";

axios.defaults.baseURL = "https://garage-server-dcv1.onrender.com/api";
axios.defaults.withCredentials = true;

axios.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    ?.split("=")[1];
  
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch(refresh()).unwrap();
        return axios(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("user");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;