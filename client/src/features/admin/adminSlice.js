import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import adminService from "./adminService";

// Helper function to handle API errors consistently
const handleApiError = (error) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  return message;
};

// Create a thunk factory to reduce code duplication
const createAdminThunk = (typePrefix, serviceFunction) => {
  return createAsyncThunk(`admin/${typePrefix}`, async (params, thunkAPI) => {
    try {
      return await serviceFunction(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(handleApiError(error));
    }
  });
};

// Create all thunks using the factory
export const getUsers = createAdminThunk("getUsers", adminService.getUsers);
export const getServices = createAdminThunk(
  "getServices",
  adminService.getServices
);
export const getServicesByType = createAdminThunk(
  "getServicesByType",
  adminService.getServicesByType
);
export const getCars = createAdminThunk("getCars", adminService.getCars);
export const getCarsByType = createAdminThunk(
  "getCarsByType",
  adminService.getCarsByType
);

// Define initial state for the slice
const initialState = {
  users: [],
  cars: [],
  services: [],
  fetchState: {
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  },
};
// Create entity status reducer factory
const createStatusReducers = (builder, thunk, entityName) => {
  builder
    .addCase(thunk.pending, (state) => {
      state.fetchState.isLoading = true;
      state.fetchState.isError = false;
      state.fetchState.isSuccess = false;
      state.fetchState.message = "";
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.fetchState.isLoading = false;
      state.fetchState.isSuccess = true;
      state[entityName] = action.payload;
    })
    .addCase(thunk.rejected, (state, action) => {
      state.fetchState.isLoading = false;
      state.fetchState.isError = true;
      state.fetchState.message = action.payload;
      state[entityName] = null;
    });
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
    // Users reducers
    createStatusReducers(builder, getUsers, "users");

    // Services reducers - both regular services and services by type
    createStatusReducers(builder, getServices, "services");
    createStatusReducers(builder, getServicesByType, "services");

    // Cars reducers - both regular cars and cars by type
    createStatusReducers(builder, getCars, "cars");
    createStatusReducers(builder, getCarsByType, "cars");
  },
});

export const { resetAdmin, clearErrors } = adminSlice.actions;

export default adminSlice.reducer;
