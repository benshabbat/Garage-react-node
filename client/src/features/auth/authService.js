// הוספת תצורת ברירת מחדל ל-axios
import axios from "../../axiosConfig.js";
// authService.js - עדכון הנתיבים
const API_URL_REGISTER = "/auth/register";
const API_URL_LOGIN = "/auth/login";
const API_URL_LOGOUT = "/auth/logout";

// אפשרות להגדיר תצורת ברירת מחדל ל-axios

// //why i cant using with env how i could
// axios.defaults.baseURL = "https://garage-server-dcv1.onrender.com/api";
// axios.defaults.withCredentials = true; // חשוב עבור קוקיז

const authService = {
  register: async (userData) => {
    try {
      const response = await axios.post(API_URL_REGISTER, userData);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  login: async (userData) => {
    try {
      const response = await axios.post(API_URL_LOGIN, userData);
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await axios.post(API_URL_LOGOUT);
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("user"); // מחיקת המידע המקומי בכל מקרה
    }
  },

  refresh: async () => {
    try {
      const response = await axios.post("/auth/refresh");
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  
};

export default authService;
