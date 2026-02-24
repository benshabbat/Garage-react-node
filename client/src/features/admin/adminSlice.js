import { createSlice } from "@reduxjs/toolkit";
import adminService from "./adminService";
import { createAsyncThunkWithErrorHandling, addAsyncThunkCases } from "../utils/asyncThunkErrorHandler";

// Create all thunks using the factory
export const getUsers = createAsyncThunkWithErrorHandling("admin/getUsers", adminService.getUsers);
export const getServices = createAsyncThunkWithErrorHandling("admin/getServices", adminService.getServices);
export const getServicesByType = createAsyncThunkWithErrorHandling("admin/getServicesByType", adminService.getServicesByType);
export const getCars = createAsyncThunkWithErrorHandling("admin/getCars", adminService.getCars);
export const getCarsByType = createAsyncThunkWithErrorHandling("admin/getCarsByType", adminService.getCarsByType);
export const getMessages = createAsyncThunkWithErrorHandling("admin/getMessages", adminService.getMessages);
export const getMessagesContact = createAsyncThunkWithErrorHandling("admin/getMessagesContact", adminService.getMessagesContact);

// Define initial state for the slice
const initialState = {
  users: [],
  cars: [],
  services: [],
  messages: [],
  messagesContact: [],
  fetchState: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetAdmin: () => initialState,
    clearErrors: (state) => {
      state.fetchState.isError = false;
      state.fetchState.message = "";
    },
  },
  extraReducers: (builder) => {
    // Use centralized reducer helper 
    addAsyncThunkCases(builder, getUsers, "users");
    addAsyncThunkCases(builder, getServices, "services");
    addAsyncThunkCases(builder, getServicesByType, "services");
    addAsyncThunkCases(builder, getCars, "cars");
    addAsyncThunkCases(builder, getCarsByType, "cars");
    addAsyncThunkCases(builder, getMessages, "messages");
    addAsyncThunkCases(builder, getMessagesContact, "messagesContact");
  },
});

export const { resetAdmin, clearErrors } = adminSlice.actions;

export default adminSlice.reducer;
