import { create } from "zustand";
import axios from "../axiosConfig.js";
import { getUserId } from "../api/services/userApi.js";
import { messageApi } from "../api/services/messageApi.js";
import { setErr } from "./storeUtils.js";

const API = {
  services: "/services",
  messages: "/messages",
  cars: "/cars",
};

export const useUserStore = create((set) => {
  // Factory for named-API calls that return data directly
  const load = (apiFn, key) => async (...args) => {
    set({ isLoading: true });
    try {
      const data = await apiFn(...args);
      set({ [key]: data, isLoading: false });
    } catch (err) { setErr(set, err); }
  };

  // Factory for axios GET calls where response has { data } shape
  const loadAxios = (getUrl, key) => async (id) => {
    set({ isLoading: true });
    try {
      const { data } = await axios.get(getUrl(id));
      set({ [key]: data, isLoading: false });
    } catch (err) { setErr(set, err); }
  };

  return {
    user: undefined,
    services: [],
    messages: [],
    isLoading: false,
    isError: false,
    message: "",

    getUser:             load(getUserId, "user"),
    getServicesByIdCar:  loadAxios((id) => `${API.services}/car/${id}`,  "services"),
    getServicesByIdUser: loadAxios((id) => `${API.services}/user/${id}`, "services"),
    getMessagesByIdUser: loadAxios((id) => `${API.messages}/user/${id}`, "messages"),

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
        const data = await messageApi.createToAdmin(dataMessage);
        set({ isLoading: false });
        return data;
      } catch (err) { setErr(set, err); }
    },

    resetUser: () =>
      set({ user: undefined, services: [], messages: [], isLoading: false, isError: false, message: "" }),
  };
});
