import { create } from "zustand";
import { getUsers } from "../api/services/userApi.js";
import { getCars, getCarsByType } from "../api/services/carApi.js";
import { getServices, getServicesByType } from "../api/services/serviceApi.js";
import { getMessages, deleteMessage } from "../api/services/messageApi.js";
import { getMessagesContact } from "../api/services/contactApi.js";
import { setErr } from "./storeUtils.js";

export const useAdminStore = create((set) => {
  const load = (apiFn, key) => async (...args) => {
    set({ isLoading: true });
    try {
      const data = await apiFn(...args);
      set({ [key]: data, isLoading: false });
    } catch (err) { setErr(set, err); }
  };

  return {
    users: [],
    cars: [],
    services: [],
    messages: [],
    messagesContact: [],
    isLoading: false,
    isError: false,
    message: "",

    getUsers:           load(getUsers,           "users"),
    getCars:            load(getCars,            "cars"),
    getCarsByType:      load(getCarsByType,      "cars"),
    getServices:        load(getServices,        "services"),
    getServicesByType:  load(getServicesByType,  "services"),
    getMessages:        load(getMessages,        "messages"),
    getMessagesContact: load(getMessagesContact, "messagesContact"),

    deleteMessage: async (id) => {
      try {
        await deleteMessage(id);
        set((s) => ({ messages: s.messages.filter((m) => m._id !== id) }));
      } catch (err) { setErr(set, err); }
    },

    resetAdmin: () =>
      set({ users: [], cars: [], services: [], messages: [], messagesContact: [], isLoading: false, isError: false, message: "" }),
  };
});
