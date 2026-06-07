import { create } from "zustand";

let _timerId = null;

export const useToastStore = create((set) => ({
  message: "",
  type: "success",
  visible: false,

  show: (message, type = "success", durationMs = 3000) => {
    if (_timerId) clearTimeout(_timerId);
    set({ message, type, visible: true });
    _timerId = setTimeout(() => {
      set({ visible: false });
      _timerId = null;
    }, durationMs);
  },

  hide: () => {
    if (_timerId) { clearTimeout(_timerId); _timerId = null; }
    set({ visible: false });
  },
}));
