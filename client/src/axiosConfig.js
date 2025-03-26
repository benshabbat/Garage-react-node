import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8800/api";
// axios.defaults.baseURL = "https://garage-server-dcv1.onrender.com/api";
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8800/api';

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
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
    }
    return Promise.reject(error);
  }
);

export default axios;