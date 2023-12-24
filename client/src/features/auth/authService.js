import axios from "axios";

const API_URL_REGISTER = "/auth/register";
const API_URL_LOGIN = "/auth/login";
const API_URL_LOGOUT = "/auth/logout";
// const API_URL_USERS = "/api/users";

//Create a new User
const register = async (userData) => {
  const { data } = await axios.post(API_URL_REGISTER, userData);

  // if (data) {
  //   localStorage.setItem("user", JSON.stringify(data));
  // }
  return data;
};

//login
const login = async (userData) => {
  const { data } = await axios.post(API_URL_LOGIN, userData);

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  return data;
};

// Logout user
const logout = async() => {
  await axios.post(API_URL_LOGOUT);
  localStorage.removeItem("user");
};

// //refresh user
// const refresh = async (userData)=>{
//   const { data } = await axios.get(API_URL_USERS, userData);

//   if (data) {
//     localStorage.setItem("user", JSON.stringify(data));
//   }
//   return data;
// }

const authService = {
  register,
  logout,
  login
};

export default authService;
