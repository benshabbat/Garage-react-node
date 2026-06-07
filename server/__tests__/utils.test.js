import { describe, it, expect } from "vitest";
import { getPaginationParams, pickAllowed } from "../utils/queryHelpers.js";
import { templatePhone, templateCar } from "../utils/templates.js";

// ─── getPaginationParams ─────────────────────────────────────────────────────

describe("getPaginationParams", () => {
  const req = (query = {}) => ({ query });

  it("returns defaults when no query params are provided", () => {
    const { limit, page } = getPaginationParams(req());
    expect(page).toBe(1);
    expect(limit).toBeGreaterThan(0);
  });

  it("parses limit and page from the query string", () => {
    const { limit, page } = getPaginationParams(req({ limit: "10", page: "3" }));
    expect(limit).toBe(10);
    expect(page).toBe(3);
  });

  it("clamps page to a minimum of 1", () => {
    const { page } = getPaginationParams(req({ page: "-5" }));
    expect(page).toBe(1);
  });

  it("clamps limit to the MAX_LIMIT", () => {
    const { limit } = getPaginationParams(req({ limit: "99999" }));
    expect(limit).toBeLessThanOrEqual(5000);
  });
});

// ─── pickAllowed ─────────────────────────────────────────────────────────────

describe("pickAllowed", () => {
  it("returns only the fields in the allowlist", () => {
    const result = pickAllowed({ a: 1, b: 2, c: 3 }, ["a", "c"]);
    expect(result).toEqual({ a: 1, c: 3 });
  });

  it("ignores fields that are not in the allowlist", () => {
    const result = pickAllowed({ secret: "x", safe: "y" }, ["safe"]);
    expect(result).not.toHaveProperty("secret");
    expect(result.safe).toBe("y");
  });

  it("returns an empty object when body is empty", () => {
    expect(pickAllowed({}, ["a", "b"])).toEqual({});
  });

  it("returns an empty object when allowlist is empty", () => {
    expect(pickAllowed({ a: 1, b: 2 }, [])).toEqual({});
  });
});

// ─── templatePhone ───────────────────────────────────────────────────────────

describe("templatePhone", () => {
  it("formats a 10-digit phone number with dashes", () => {
    expect(templatePhone("0501234567")).toBe("050-123-4567");
  });

  it("returns null / undefined as-is", () => {
    expect(templatePhone(null)).toBeNull();
    expect(templatePhone(undefined)).toBeUndefined();
  });

  it("passes through an already-formatted number unchanged", () => {
    const formatted = "050-123-4567";
    expect(templatePhone(formatted)).toBe(formatted);
  });
});

// ─── templateCar ─────────────────────────────────────────────────────────────

describe("templateCar", () => {
  it("formats an 8-digit plate as XXX-XX-XXX", () => {
    expect(templateCar("12345678")).toBe("123-45-678");
  });

  it("formats a 7-digit plate as XX-XXX-XX", () => {
    expect(templateCar("1234567")).toBe("12-345-67");
  });

  it("returns an already-formatted plate unchanged", () => {
    expect(templateCar("12-345-67")).toBe("12-345-67");
  });
});
