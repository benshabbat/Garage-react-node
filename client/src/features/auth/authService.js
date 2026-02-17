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
    const response = await axios.post(API_URL_REGISTER, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },

  login: async (userData) => {
    const response = await axios.post(API_URL_LOGIN, userData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: async () => {
    await axios.post(API_URL_LOGOUT);
    localStorage.removeItem("user");
  },
};

export default authService;
