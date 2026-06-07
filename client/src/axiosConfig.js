import axios from "axios";
import { useAuthStore } from "./stores/authStore.js";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || "http://localhost:8800/api";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // clearAuth avoids an API call so this interceptor cannot loop
      useAuthStore.getState().clearAuth();
      window.location.replace("/");
    }
    return Promise.reject(error);
  }
);

export default axios;
