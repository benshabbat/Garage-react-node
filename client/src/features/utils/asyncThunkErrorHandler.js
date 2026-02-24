import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * Extracts error message from error object
 * @param {Error} error - The error object
 * @returns {string} Formatted error message
 */
export const extractErrorMessage = (error) => {
  return (
    (error.response &&
      error.response.data &&
      error.response.data.message) ||
    error.message ||
    error.toString()
  );
};

/**
 * Creates an async thunk with standard error handling
 * @param {string} typePrefix - The action type prefix (e.g., 'user/getUser')
 * @param {Function} serviceFunction - The service function to call
 * @returns {AsyncThunk} Redux async thunk with error handling
 */
export const createAsyncThunkWithErrorHandling = (typePrefix, serviceFunction) => {
  return createAsyncThunk(typePrefix, async (params, thunkAPI) => {
    try {
      return await serviceFunction(params);
    } catch (error) {
      const message = extractErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  });
};

/**
 * Creates standard reducer cases for async thunks
 * @param {Object} builder - Redux builder object
 * @param {Object} asyncThunk - The async thunk
 * @param {string} stateKey - The state key to update (e.g., 'user', 'services')
 * @param {Function} [customFulfilled] - Optional custom fulfilled handler
 */
export const addAsyncThunkCases = (builder, asyncThunk, stateKey, customFulfilled = null) => {
  builder
    .addCase(asyncThunk.pending, (state) => {
      state.fetchState.isLoading = true;
      state.fetchState.isError = false;
      state.fetchState.isSuccess = false;
      state.fetchState.message = "";
    })
    .addCase(asyncThunk.fulfilled, (state, action) => {
      state.fetchState.isLoading = false;
      state.fetchState.isSuccess = true;
      if (customFulfilled) {
        customFulfilled(state, action);
      } else if (stateKey) {
        state[stateKey] = action.payload;
      }
    })
    .addCase(asyncThunk.rejected, (state, action) => {
      state.fetchState.isLoading = false;
      state.fetchState.isError = true;
      state.fetchState.message = action.payload;
      if (stateKey) {
        state[stateKey] = null;
      }
    });
};

