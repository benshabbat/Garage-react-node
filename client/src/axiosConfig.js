import axios from 'axios';

axios.defaults.baseURL = "https://garage-server-dcv1.onrender.com/api";
axios.defaults.withCredentials = true;


// // הוספת ה-interceptor שיוסיף את הטוקן לכל בקשה
// axios.interceptors.request.use(
//   (config) => {
//     const token = document.cookie
//       .split('; ')
//       .find(row => row.startsWith('access_token='))
//       ?.split('=')[1];
    
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // טיפול בשגיאות
// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('user');
//       // אפשר להוסיף ניתוב לדף התחברות
//     }
//     return Promise.reject(error);
//   }
// );

export default axios;