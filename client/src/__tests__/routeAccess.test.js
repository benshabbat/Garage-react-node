import { describe, it, expect } from "vitest";
import { ACCESS, resolveRouteAccess } from "../utils/routeAccess.js";

const admin = { _id: "1", isAdmin: true };
const customer = { _id: "2", isAdmin: false };

describe("resolveRouteAccess", () => {
  it("waits while auth state is still loading", () => {
    expect(resolveRouteAccess({ user: null, isLoading: true })).toBe(ACCESS.LOADING);
    expect(resolveRouteAccess({ user: admin, isLoading: true, adminOnly: true })).toBe(
      ACCESS.LOADING
    );
  });

  it("requires login when there is no user", () => {
    expect(resolveRouteAccess({ user: null })).toBe(ACCESS.REQUIRE_LOGIN);
    expect(resolveRouteAccess({ user: null, adminOnly: true })).toBe(ACCESS.REQUIRE_LOGIN);
  });

  it("allows any signed-in user on a shared route", () => {
    expect(resolveRouteAccess({ user: customer })).toBe(ACCESS.ALLOW);
    expect(resolveRouteAccess({ user: admin })).toBe(ACCESS.ALLOW);
  });

  it("blocks a signed-in non-admin on an admin-only route", () => {
    expect(resolveRouteAccess({ user: customer, adminOnly: true })).toBe(ACCESS.REQUIRE_ADMIN);
  });

  it("allows an admin on an admin-only route", () => {
    expect(resolveRouteAccess({ user: admin, adminOnly: true })).toBe(ACCESS.ALLOW);
  });

  it("treats a user without an isAdmin flag as a non-admin", () => {
    expect(resolveRouteAccess({ user: { _id: "3" }, adminOnly: true })).toBe(ACCESS.REQUIRE_ADMIN);
  });
});
