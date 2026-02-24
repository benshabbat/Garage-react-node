import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunkWithErrorHandling, addAsyncThunkCases } from "../utils/asyncThunkErrorHandler";
import { dashboardApi } from "../../api/services/dashboardApi";

const fetchState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const initialState = {
  stats: null,
  fetchState,
};

/**
 * Async thunk to fetch dashboard statistics
 * Requires admin authentication
 */
export const getDashboardStats = createAsyncThunkWithErrorHandling(
  "dashboard/getStats",
  async () => {
    return await dashboardApi.getStats();
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    resetDashboard: () => initialState,
  },
  extraReducers: (builder) => {
    addAsyncThunkCases(builder, getDashboardStats, "stats");
  },
});

export const { resetDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;
