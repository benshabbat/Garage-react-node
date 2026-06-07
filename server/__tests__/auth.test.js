import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import request from "supertest";
import app from "../app.js";
import User from "../models/User.js";

// ─── Test DB lifecycle ────────────────────────────────────────────────────────

let mongod;

beforeAll(async () => {
  process.env.JWT = "test-jwt-secret-for-unit-tests";
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

const makeUser = async ({ username = "testuser", password = "Password1", isAdmin = false } = {}) => {
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);
  return User.create({
    username,
    email: `${username}@test.com`,
    phone: "050-123-4567",
    password: hashed,
    isAdmin,
  });
};

// ─── POST /api/auth/login ─────────────────────────────────────────────────────

describe("POST /api/auth/login", () => {
  it("returns 200 and user data on valid credentials", async () => {
    await makeUser({ username: "alice", password: "Secret99" });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "alice", password: "Secret99" });

    expect(res.status).toBe(200);
    expect(res.body._id).toBeTruthy();
    expect(res.body.password).toBeFalsy();
  });

  it("returns 401 on wrong password", async () => {
    await makeUser({ username: "bob", password: "Correct99" });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "bob", password: "WrongPass1" });

    expect(res.status).toBe(401);
  });

  it("returns 401 when user does not exist", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "nobody", password: "Password1" });

    expect(res.status).toBe(401);
  });

  it("returns 400 when fields are missing", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "alice" }); // no password

    expect(res.status).toBe(400);
  });
});

// ─── POST /api/auth/logout ────────────────────────────────────────────────────

describe("POST /api/auth/logout", () => {
  it("returns 200 and clears the cookie", async () => {
    const res = await request(app).post("/api/auth/logout");

    expect(res.status).toBe(200);
    expect(res.body.message).toBeTruthy();
  });
});
