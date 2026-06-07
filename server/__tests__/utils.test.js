import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getPaginationParams, pickAllowed } from "../utils/queryHelpers.js";
import { templatePhone, templateCar } from "../utils/templates.js";

// ─── getPaginationParams ─────────────────────────────────────────────────────

describe("getPaginationParams", () => {
  const req = (query = {}) => ({ query });

  it("returns defaults when no query params are provided", () => {
    const { limit, page } = getPaginationParams(req());
    assert.equal(page, 1);
    assert.ok(limit > 0, "limit should be positive");
  });

  it("parses limit and page from the query string", () => {
    const { limit, page } = getPaginationParams(req({ limit: "10", page: "3" }));
    assert.equal(limit, 10);
    assert.equal(page, 3);
  });

  it("clamps page to a minimum of 1", () => {
    const { page } = getPaginationParams(req({ page: "-5" }));
    assert.equal(page, 1);
  });

  it("clamps limit to the MAX_LIMIT", () => {
    const { limit } = getPaginationParams(req({ limit: "99999" }));
    assert.ok(limit <= 5000, `limit ${limit} exceeds MAX_LIMIT of 5000`);
  });
});

// ─── pickAllowed ─────────────────────────────────────────────────────────────

describe("pickAllowed", () => {
  it("returns only the fields in the allowlist", () => {
    const result = pickAllowed({ a: 1, b: 2, c: 3 }, ["a", "c"]);
    assert.deepEqual(result, { a: 1, c: 3 });
  });

  it("ignores fields that are not in the allowlist", () => {
    const result = pickAllowed({ secret: "x", safe: "y" }, ["safe"]);
    assert.ok(!("secret" in result), "secret should be filtered out");
    assert.equal(result.safe, "y");
  });

  it("returns an empty object when body is empty", () => {
    const result = pickAllowed({}, ["a", "b"]);
    assert.deepEqual(result, {});
  });

  it("returns an empty object when allowlist is empty", () => {
    const result = pickAllowed({ a: 1, b: 2 }, []);
    assert.deepEqual(result, {});
  });
});

// ─── templatePhone ───────────────────────────────────────────────────────────

describe("templatePhone", () => {
  it("formats a 10-digit phone number with dashes", () => {
    assert.equal(templatePhone("0501234567"), "050-123-4567");
  });

  it("returns null / undefined as-is", () => {
    assert.equal(templatePhone(null), null);
    assert.equal(templatePhone(undefined), undefined);
  });

  it("passes through an already-formatted number unchanged", () => {
    const formatted = "050-123-4567";
    assert.equal(templatePhone(formatted), formatted);
  });
});

// ─── templateCar ─────────────────────────────────────────────────────────────

describe("templateCar", () => {
  it("formats an 8-digit plate as XXX-XX-XXX", () => {
    assert.equal(templateCar("12345678"), "123-45-678");
  });

  it("formats a 7-digit plate as XX-XXX-XX", () => {
    assert.equal(templateCar("1234567"), "12-345-67");
  });

  it("returns an already-formatted plate unchanged", () => {
    assert.equal(templateCar("12-345-67"), "12-345-67");
  });
});
