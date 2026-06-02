import { create } from "zustand";
import axios from "../axiosConfig.js";
import { getUserId } from "../api/services/userApi.js";
import { ADMIN_ID } from "../api/apiEndpoints.js";

const API = {
  services: "/services",
  messages: "/messages",
  cars: "/cars",
};

const setErr = (set, err) =>
  set({ isLoading: false, isError: true, message: err.response?.data?.message ?? err.message });

export const useUserStore = create((set) => ({
  user: undefined,
  services: [],
  messages: [],
  isLoading: false,
  isError: false,
  message: "",

  getUser: async (id) => {
    set({ isLoading: true });
    try {
      const data = await getUserId(id);
      set({ user: data, isLoading: false });
    } catch (err) { setErr(set, err); }
  },

  getServicesByIdCar: async (carId) => {
    set({ isLoading: true });
    try {
      const { data } = await axios.get(`${API.services}/car/${carId}`);
      set({ services: data, isLoading: false });
    } catch (err) { setErr(set, err); }
  },

  getServicesByIdUser: async (userId) => {
    set({ isLoading: true });
    try {
      const { data } = await axios.get(`${API.services}/user/${userId}`);
      set({ services: data, isLoading: false });
    } catch (err) { setErr(set, err); }
  },

  getMessagesByIdUser: async (userId) => {
    set({ isLoading: true });
    try {
      const { data } = await axios.get(`${API.messages}/user/${userId}`);
      set({ messages: data, isLoading: false });
    } catch (err) { setErr(set, err); }
  },

  getCarsByIdUser: async (userId) => {
    set({ isLoading: true });
    try {
      const { data } = await axios.get(`${API.cars}/user/${userId}`);
      set((s) => ({ user: { ...s.user, cars: data }, isLoading: false }));
    } catch (err) { setErr(set, err); }
  },

  createReqService: async (dataMessage) => {
    set({ isLoading: true });
    try {
      const { data } = await axios.post(`${API.messages}/to/${ADMIN_ID}`, dataMessage);
      set({ isLoading: false });
      return data;
    } catch (err) { setErr(set, err); }
  },

  resetUser: () =>
    set({ user: undefined, services: [], messages: [], isLoading: false, isError: false, message: "" }),
}));
