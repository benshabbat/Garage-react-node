// import axios from 'axios';

// axios.defaults.baseURL = "https://garage-server-dcv1.onrender.com/api";
// axios.defaults.withCredentials = true;



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

// export default axios;

import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://garage-server-dcv1.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor for error handling
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // מטפל בשגיאות אימות
      console.log('Authentication error');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export default instance;