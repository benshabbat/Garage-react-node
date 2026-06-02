import { create } from "zustand";
import { getUsers } from "../api/services/userApi.js";
import { getCars, getCarsByType } from "../api/services/carApi.js";
import { getServices, getServicesByType } from "../api/services/serviceApi.js";
import { getMessages, deleteMessage } from "../api/services/messageApi.js";
import { getMessagesContact } from "../api/services/contactApi.js";

const setErr = (set, err) =>
  set({ isLoading: false, isError: true, message: err.response?.data?.message ?? err.message });

export const useAdminStore = create((set) => ({
  users: [],
  cars: [],
  services: [],
  messages: [],
  messagesContact: [],
  isLoading: false,
  isError: false,
  message: "",

  getUsers: async () => {
    set({ isLoading: true });
    try {
      const data = await getUsers();
      set({ users: data, isLoading: false });
    } catch (err) { setErr(set, err); }
  },

  getCars: async () => {
    set({ isLoading: true });
    try {
      const data = await getCars();
      set({ cars: data, isLoading: false });
    } catch (err) { setErr(set, err); }
  },

  getCarsByType: async (userId) => {
    set({ isLoading: true });
    try {
      const data = await getCarsByType(userId);
      set({ cars: data, isLoading: false });
    } catch (err) { setErr(set, err); }
  },

  getServices: async () => {
    set({ isLoading: true });
    try {
      const data = await getServices();
      set({ services: data, isLoading: false });
    } catch (err) { setErr(set, err); }
  },

  getServicesByType: async () => {
    set({ isLoading: true });
    try {
      const data = await getServicesByType();
      set({ services: data, isLoading: false });
    } catch (err) { setErr(set, err); }
  },

  getMessages: async () => {
    set({ isLoading: true });
    try {
      const data = await getMessages();
      set({ messages: data, isLoading: false });
    } catch (err) { setErr(set, err); }
  },

  getMessagesContact: async () => {
    set({ isLoading: true });
    try {
      const data = await getMessagesContact();
      set({ messagesContact: data, isLoading: false });
    } catch (err) { setErr(set, err); }
  },

  deleteMessage: async (id) => {
    try {
      await deleteMessage(id);
      set((s) => ({ messages: s.messages.filter((m) => m._id !== id) }));
    } catch (err) { setErr(set, err); }
  },

  resetAdmin: () =>
    set({ users: [], cars: [], services: [], messages: [], messagesContact: [], isLoading: false, isError: false, message: "" }),
}));
