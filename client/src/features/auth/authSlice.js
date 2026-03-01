import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { createAsyncThunkWithErrorHandling } from "../utils/asyncThunkErrorHandler";

//Get User from localStorage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Create new User
export const register = createAsyncThunkWithErrorHandling(
  "auth/register",
  authService.register
);

//Login
export const login = createAsyncThunkWithErrorHandling(
  "auth/login",
  authService.login
);

//Logout 
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// Shared case handlers for auth thunks
const authPending = (state) => {
  state.isLoading = true;
};
const authRejected = (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload;
  state.user = null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.user = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, authPending)
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, authRejected)
      .addCase(login.pending, authPending)
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, authRejected)
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;