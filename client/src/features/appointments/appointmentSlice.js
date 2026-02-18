import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axiosConfig';

const API_URL = '/appointments';

// Fetch all appointments
export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch appointments');
    }
  }
);

// Fetch appointment by ID
export const fetchAppointmentById = createAsyncThunk(
  'appointments/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch appointment');
    }
  }
);

// Create appointment
export const createAppointment = createAsyncThunk(
  'appointments/create',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, appointmentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create appointment');
    }
  }
);

// Update appointment
export const updateAppointment = createAsyncThunk(
  'appointments/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update appointment');
    }
  }
);

// Delete appointment
export const deleteAppointment = createAsyncThunk(
  'appointments/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete appointment');
    }
  }
);

// Update appointment status
export const updateAppointmentStatus = createAsyncThunk(
  'appointments/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update status');
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    currentAppointment: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentAppointment: (state) => {
      state.currentAppointment = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all appointments
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      // Fetch by ID
      .addCase(fetchAppointmentById.fulfilled, (state, action) => {
        state.currentAppointment = action.payload;
      })
      // Create appointment
      .addCase(createAppointment.pending, (state) => {
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      // Update appointment
      .addCase(updateAppointment.fulfilled, (state, action) => {
        const index = state.appointments.findIndex(app => app._id === action.payload._id);
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
        if (state.currentAppointment?._id === action.payload._id) {
          state.currentAppointment = action.payload;
        }
      })
      .addCase(updateAppointment.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      // Delete appointment
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.appointments = state.appointments.filter(app => app._id !== action.payload);
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      // Update status
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        const index = state.appointments.findIndex(app => app._id === action.payload._id);
        if (index !== -1) {
          state.appointments[index] = action.payload;
        }
        if (state.currentAppointment?._id === action.payload._id) {
          state.currentAppointment = action.payload;
        }
      })
      .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  }
});

export const { clearError, clearCurrentAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;