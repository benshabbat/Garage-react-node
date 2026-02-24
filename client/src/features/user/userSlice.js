import { createSlice } from "@reduxjs/toolkit";
import userService from "./userService";
import { createAsyncThunkWithErrorHandling, addAsyncThunkCases } from "../utils/asyncThunkErrorHandler";

const fetchState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const initialState = {
  user: undefined,
  services: [],
  messages: [],
  fetchState,
};

// Create async thunks with error handling
export const getUser = createAsyncThunkWithErrorHandling(
  "user/getUser",
  userService.getUser
);

export const getServicesByIdCar = createAsyncThunkWithErrorHandling(
  "user/getServicesByIdCar",
  userService.getServicesByIdCar
);

export const getCarsByIdUser = createAsyncThunkWithErrorHandling(
  "user/getCarsByIdUser",
  userService.getCarsByIdUser
);

export const getServicesByIdUser = createAsyncThunkWithErrorHandling(
  "user/getServicesByIdUser",
  userService.getServicesByIdUser
);

export const getMessagesByIdUser = createAsyncThunkWithErrorHandling(
  "user/getMessagesByIdUser",
  userService.getMessagesByIdUser
);

export const createReqService = createAsyncThunkWithErrorHandling(
  "user/createReqService",
  userService.createReqService
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: (state) => initialState,
  },
  extraReducers: (builder) => {
    addAsyncThunkCases(builder, getUser, "user");
    addAsyncThunkCases(builder, getServicesByIdCar, "services");
    addAsyncThunkCases(builder, getServicesByIdUser, "services");
    addAsyncThunkCases(builder, createReqService, "user");
    addAsyncThunkCases(builder, getMessagesByIdUser, "messages");
    
    // Special case: getCarsByIdUser updates nested state
    addAsyncThunkCases(builder, getCarsByIdUser, null, (state, action) => {
      state.user.cars = action.payload;
    });
  },
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
