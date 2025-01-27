import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://garage-server-dcv1.onrender.com/api",
  withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    ?.split("=")[1];
  
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

let store = null;
export const injectStore = (_store) => {
  store = _store;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry && store) {
      originalRequest._retry = true;
      try {
        const { refresh } = await import('./features/auth/authSlice');
        await store.dispatch(refresh()).unwrap();
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("user");
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;