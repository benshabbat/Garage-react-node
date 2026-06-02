/** Shared Zustand error setter — used by all data stores. */
export const setErr = (set, err) =>
  set({ isLoading: false, isError: true, message: err.response?.data?.message ?? err.message });
