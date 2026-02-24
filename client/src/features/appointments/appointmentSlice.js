import { createSlice } from '@reduxjs/toolkit';
import { API_URL_APPOINTMENTS } from '../../api/apiEndpoints';
import { createAsyncThunkWithErrorHandling, addAsyncThunkCases } from '../utils/asyncThunkErrorHandler';
import axios from 'axios';

// Service functions
const appointmentService = {
  fetchAppointments: async () => {
    const response = await axios.get(API_URL_APPOINTMENTS);
    return response.data;
  },
  createAppointment: async (appointmentData) => {
    const response = await axios.post(API_URL_APPOINTMENTS, appointmentData);
    return response.data;
  },
  updateAppointment: async ({ id, data }) => {
    const response = await axios.put(`${API_URL_APPOINTMENTS}/${id}`, data);
    return response.data;
  },
  deleteAppointment: async (id) => {
    const response = await axios.delete(`${API_URL_APPOINTMENTS}/${id}`);
    return response.data;
  },
};

// Create thunks with error handling
export const fetchAppointments = createAsyncThunkWithErrorHandling(
  'appointments/fetchAll',
  appointmentService.fetchAppointments
);

export const createAppointment = createAsyncThunkWithErrorHandling(
  'appointments/create',
  appointmentService.createAppointment
);

export const updateAppointment = createAsyncThunkWithErrorHandling(
  'appointments/update',
  appointmentService.updateAppointment
);

export const deleteAppointment = createAsyncThunkWithErrorHandling(
  'appointments/delete',
  appointmentService.deleteAppointment
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    fetchState: {
      isError: false,
      isSuccess: false,
      isLoading: false,
      message: "",
    },
  },
  reducers: {
    resetAppointments: (state) => {
      state.appointments = [];
      state.fetchState = {
        isError: false,
        isSuccess: false,
        isLoading: false,
        message: "",
      };
    },
    clearErrors: (state) => {
      state.fetchState.isError = false;
      state.fetchState.message = "";
    },
  },
  extraReducers: (builder) => {
    // Fetch appointments
    addAsyncThunkCases(builder, fetchAppointments, 'appointments');
    
    // Create appointment - add to array
    addAsyncThunkCases(builder, createAppointment, null, (state, action) => {
      state.appointments.push(action.payload);
    });
    
    // Update appointment - update in array
    addAsyncThunkCases(builder, updateAppointment, null, (state, action) => {
      const index = state.appointments.findIndex(apt => apt._id === action.payload._id);
      if (index !== -1) {
        state.appointments[index] = action.payload;
      }
    });
    
    // Delete appointment - remove from array
    addAsyncThunkCases(builder, deleteAppointment, null, (state, action) => {
      state.appointments = state.appointments.filter(apt => apt._id !== action.payload.id);
    });
  }
});

export const { resetAppointments, clearErrors } = appointmentSlice.actions;

export default appointmentSlice.reducer;