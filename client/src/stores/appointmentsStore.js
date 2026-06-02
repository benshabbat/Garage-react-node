import { create } from "zustand";
import axios from "../axiosConfig.js";
import { API_URL_APPOINTMENTS } from "../api/apiEndpoints.js";
import { setErr } from "./storeUtils.js";

export const useAppointmentsStore = create((set) => ({
  appointments: [],
  isLoading: false,
  isError: false,
  message: "",

  fetchAppointments: async () => {
    set({ isLoading: true });
    try {
      const { data } = await axios.get(API_URL_APPOINTMENTS);
      set({ appointments: data, isLoading: false });
    } catch (err) { setErr(set, err); }
  },

  createAppointment: async (appointmentData) => {
    set({ isLoading: true });
    try {
      const { data } = await axios.post(API_URL_APPOINTMENTS, appointmentData);
      set((s) => ({ appointments: [...s.appointments, data], isLoading: false }));
      return data;
    } catch (err) { setErr(set, err); }
  },

  updateAppointment: async ({ id, data: update }) => {
    try {
      const { data } = await axios.put(`${API_URL_APPOINTMENTS}/${id}`, update);
      set((s) => ({
        appointments: s.appointments.map((a) => (a._id === data._id ? data : a)),
      }));
    } catch (err) { setErr(set, err); }
  },

  deleteAppointment: async (id) => {
    try {
      await axios.delete(`${API_URL_APPOINTMENTS}/${id}`);
      set((s) => ({ appointments: s.appointments.filter((a) => a._id !== id) }));
    } catch (err) { setErr(set, err); }
  },

  resetAppointments: () =>
    set({ appointments: [], isLoading: false, isError: false, message: "" }),
}));
