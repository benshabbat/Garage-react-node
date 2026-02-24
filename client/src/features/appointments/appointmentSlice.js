import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL_APPOINTMENTS } from '../../api/apiEndpoints';

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAll',
  async () => {
    const response = await axios.get(API_URL_APPOINTMENTS);
    return response.data;
  }
);

export const createAppointment = createAsyncThunk(
  'appointments/create',
  async (appointmentData) => {
    const response = await axios.post(API_URL_APPOINTMENTS, appointmentData);
    return response.data;
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
      });
  }
});

export default appointmentSlice.reducer;