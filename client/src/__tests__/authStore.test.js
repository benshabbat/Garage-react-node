import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock axiosConfig before importing the store so the store picks up the mock
vi.mock("../axiosConfig.js", () => ({
  default: {
    post: vi.fn(),
  },
}));

import axios from "../axiosConfig.js";
import { useAuthStore } from "../stores/authStore.js";

// Reset store state between tests
beforeEach(() => {
  useAuthStore.getState().clearAuth();
  vi.clearAllMocks();
});

// ─── login ────────────────────────────────────────────────────────────────────

describe("authStore.login", () => {
  it("sets user and isSuccess on successful API response", async () => {
    const fakeUser = { _id: "abc123", isAdmin: false };
    axios.post.mockResolvedValueOnce({ data: fakeUser });

    await useAuthStore.getState().login({ username: "alice", password: "secret" });

    const { user, isSuccess, isError, isLoading } = useAuthStore.getState();
    expect(user).toEqual(fakeUser);
    expect(isSuccess).toBe(true);
    expect(isError).toBe(false);
    expect(isLoading).toBe(false);
  });

  it("sets isError and clears user on API failure", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: "Wrong password" } },
    });

    await useAuthStore.getState().login({ username: "alice", password: "wrong" });

    const { user, isError, message, isLoading } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(isError).toBe(true);
    expect(message).toBe("Wrong password");
    expect(isLoading).toBe(false);
  });
});

// ─── logout ───────────────────────────────────────────────────────────────────

describe("authStore.logout", () => {
  it("clears user state regardless of API response", async () => {
    // Seed a logged-in user
    useAuthStore.setState({ user: { _id: "abc123" }, isSuccess: true });

    axios.post.mockResolvedValueOnce({});
    await useAuthStore.getState().logout();

    const { user, isError, isSuccess } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(isError).toBe(false);
    expect(isSuccess).toBe(false);
  });

  it("still clears state when API call fails", async () => {
    useAuthStore.setState({ user: { _id: "abc123" } });

    axios.post.mockRejectedValueOnce(new Error("network error"));
    await useAuthStore.getState().logout();

    expect(useAuthStore.getState().user).toBeNull();
  });
});

// ─── clearAuth ────────────────────────────────────────────────────────────────

describe("authStore.clearAuth", () => {
  it("resets all fields without an API call", () => {
    useAuthStore.setState({ user: { _id: "x" }, isError: true, isSuccess: true, message: "err" });

    useAuthStore.getState().clearAuth();

    const { user, isError, isSuccess, isLoading, message } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(isError).toBe(false);
    expect(isSuccess).toBe(false);
    expect(isLoading).toBe(false);
    expect(message).toBe("");
    expect(axios.post).not.toHaveBeenCalled();
  });
});
