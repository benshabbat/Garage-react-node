import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";

/**
 * Rate limiting keys on req.ip. Behind a load balancer the real caller only
 * appears in X-Forwarded-For, which Express ignores until it is told how many
 * proxies to trust — so with TRUST_PROXY unset every request looks like it came
 * from the proxy and the entire user base shares one bucket. These tests cover
 * both halves: the buckets must be per caller, and the ceiling must still exist.
 *
 * No database is involved: every request here is rejected by the auth or
 * validation layer, and the limiter has already counted it by then.
 */

let app;
let parseTrustProxy;
const originalNodeEnv = process.env.NODE_ENV;

beforeAll(async () => {
  process.env.JWT = "test-jwt-secret-for-rate-limiting";
  process.env.TRUST_PROXY = "1";

  const appModule = await import("../app.js");
  app = appModule.default;
  parseTrustProxy = appModule.parseTrustProxy;

  // Limiters skip themselves under NODE_ENV=test — which is the behaviour this
  // file needs to exercise, so it opts back in.
  process.env.NODE_ENV = "development";
});

afterAll(() => {
  process.env.NODE_ENV = originalNodeEnv;
});

const read = (clientIp) => request(app).get("/api/users").set("X-Forwarded-For", clientIp);

const attemptLogin = (clientIp) =>
  request(app).post("/api/auth/login").set("X-Forwarded-For", clientIp).send({});

// ─── parseTrustProxy ─────────────────────────────────────────────────────────

describe("parseTrustProxy", () => {
  it("trusts nothing when unset, so a forwarded header cannot be spoofed", () => {
    expect(parseTrustProxy(undefined)).toBe(false);
    expect(parseTrustProxy("")).toBe(false);
    expect(parseTrustProxy("false")).toBe(false);
  });

  it("reads a hop count", () => {
    expect(parseTrustProxy("1")).toBe(1);
    expect(parseTrustProxy("2")).toBe(2);
    expect(parseTrustProxy("0")).toBe(0);
  });

  it("passes an address or subnet through to Express", () => {
    expect(parseTrustProxy("127.0.0.1")).toBe("127.0.0.1");
    expect(parseTrustProxy("10.0.0.0/8")).toBe("10.0.0.0/8");
  });

  it("supports the blanket 'true' for completeness", () => {
    expect(parseTrustProxy("true")).toBe(true);
  });
});

// ─── Per-caller buckets ──────────────────────────────────────────────────────

describe("rate limit buckets", () => {
  it("counts callers behind a shared proxy separately", async () => {
    const statuses = [];
    for (let i = 1; i <= 60; i++) {
      const res = await read(`203.0.113.${i}`);
      statuses.push(res.status);
    }

    // With trust proxy off these all key on the proxy and the tail turns 429.
    expect(statuses.filter((s) => s === 429)).toHaveLength(0);
  });

  it("still caps a single caller", async () => {
    let firstBlocked = null;
    for (let i = 1; i <= 320 && firstBlocked === null; i++) {
      const res = await read("198.51.100.7");
      if (res.status === 429) firstBlocked = i;
    }

    expect(firstBlocked).toBe(301);
  });

  it("advertises the budget in the standard headers", async () => {
    const res = await read("198.51.100.20");

    expect(res.headers["ratelimit-limit"]).toBe("300");
  });
});

// ─── Narrow limiters ─────────────────────────────────────────────────────────

describe("endpoint-specific limits", () => {
  it("throttles password guessing far harder than ordinary reads", async () => {
    let firstBlocked = null;
    for (let i = 1; i <= 15 && firstBlocked === null; i++) {
      const res = await attemptLogin("198.51.100.30");
      if (res.status === 429) firstBlocked = i;
    }

    expect(firstBlocked).toBe(11);
  });
});

// ─── Test-environment behaviour ──────────────────────────────────────────────

describe("under NODE_ENV=test", () => {
  it("does not throttle, so one test cannot spend another test's budget", async () => {
    process.env.NODE_ENV = "test";
    try {
      const statuses = [];
      for (let i = 1; i <= 15; i++) {
        const res = await attemptLogin("198.51.100.40");
        statuses.push(res.status);
      }

      expect(statuses.filter((s) => s === 429)).toHaveLength(0);
    } finally {
      process.env.NODE_ENV = "development";
    }
  });
});
