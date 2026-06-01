import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8800/api';

axios.defaults.withCredentials = true;

// httpOnly cookies are sent automatically via withCredentials=true
// No manual token handling needed here

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