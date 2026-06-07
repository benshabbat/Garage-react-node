import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "../axiosConfig.js";

const API = {
  register: "/auth/register",
  login: "/auth/login",
  logout: "/auth/logout",
};

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      isError: false,
      isSuccess: false,
      message: "",

      register: async (userData) => {
        set({ isLoading: true, isError: false, message: "" });
        try {
          await axios.post(API.register, userData);
          set({ isLoading: false, isSuccess: true });
        } catch (err) {
          set({
            isLoading: false,
            isError: true,
            message: err.response?.data?.message ?? err.message,
            user: null,
          });
        }
      },

      login: async (userData) => {
        set({ isLoading: true, isError: false, message: "" });
        try {
          const { data } = await axios.post(API.login, userData);
          set({ isLoading: false, isSuccess: true, user: data });
        } catch (err) {
          set({
            isLoading: false,
            isError: true,
            message: err.response?.data?.message ?? err.message,
            user: null,
          });
        }
      },

      logout: async () => {
        try {
          await axios.post(API.logout);
        } catch {
          // Ignore API errors — still clear local state
        }
        set({ user: null, isError: false, isSuccess: false, message: "" });
      },

      // clearAuth: clears user + flags without an API call (safe to use in interceptors)
      clearAuth: () =>
        set({ user: null, isError: false, isSuccess: false, isLoading: false, message: "" }),

      reset: () => set({ isError: false, isSuccess: false, isLoading: false, message: "" }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }),
    }
  )
);
