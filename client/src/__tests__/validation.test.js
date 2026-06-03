import { describe, it, expect } from "vitest";
import validPhone from "../validation/validPhone.js";
import validEmail from "../validation/validEmail.js";
import validPass from "../validation/validPass.js";
import validCar from "../validation/validCar.js";

// ─── Phone ──────────────────────────────────────────────────────────────────

describe("validPhone", () => {
  it("accepts XXX-XXX-XXXX format", () => {
    expect(validPhone("050-123-4567")).toBe(true);
  });

  it("accepts XXX-XXXXXXX format", () => {
    expect(validPhone("050-1234567")).toBe(true);
  });

  it("accepts 10 raw digits", () => {
    expect(validPhone("0501234567")).toBe(true);
  });

  it("rejects 9-digit number", () => {
    expect(validPhone("050123456")).toBe(false);
  });

  it("rejects letters", () => {
    expect(validPhone("050-abc-1234")).toBe(false);
  });

  it("rejects null / undefined", () => {
    expect(validPhone(null)).toBe(false);
    expect(validPhone(undefined)).toBe(false);
  });
});

// ─── Email ──────────────────────────────────────────────────────────────────

describe("validEmail", () => {
  it("accepts standard email", () => {
    expect(validEmail("user@example.com")).toBe(true);
  });

  it("accepts email with subdomain", () => {
    expect(validEmail("user@mail.example.co.il")).toBe(true);
  });

  it("rejects missing @", () => {
    expect(validEmail("userexample.com")).toBe(false);
  });

  it("rejects missing domain", () => {
    expect(validEmail("user@")).toBe(false);
  });

  it("rejects non-string", () => {
    expect(validEmail(42)).toBe(false);
  });
});

// ─── Password ───────────────────────────────────────────────────────────────

describe("validPass", () => {
  it("accepts password with upper, lower, digit, 8+ chars", () => {
    expect(validPass("Abcdef1!")).toBe(true);
    expect(validPass("Password1")).toBe(true);
  });

  it("rejects all-lowercase (no uppercase)", () => {
    expect(validPass("abcdefg1")).toBe(false);
  });

  it("rejects all-uppercase (no lowercase)", () => {
    expect(validPass("ABCDEFG1")).toBe(false);
  });

  it("rejects no digits", () => {
    expect(validPass("Abcdefgh")).toBe(false);
  });

  it("rejects fewer than 8 characters", () => {
    expect(validPass("Ab1!")).toBe(false);
  });
});

// ─── Car plate ──────────────────────────────────────────────────────────────

describe("validCar", () => {
  it("accepts XXX-XX-XXX format", () => {
    expect(validCar("123-45-678")).toBe(true);
  });

  it("accepts XX-XXX-XX format", () => {
    expect(validCar("12-345-67")).toBe(true);
  });

  it("accepts 7 raw digits", () => {
    expect(validCar("1234567")).toBe(true);
  });

  it("accepts 8 raw digits", () => {
    expect(validCar("12345678")).toBe(true);
  });

  it("rejects invalid format", () => {
    expect(validCar("12-34-567")).toBe(false);
  });

  it("rejects empty / null", () => {
    expect(validCar("")).toBe(false);
    expect(validCar(null)).toBe(false);
  });
});
