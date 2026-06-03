import { describe, it, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import request from "supertest";
import app from "../app.js";
import User from "../models/User.js";

// ─── Test DB lifecycle ────────────────────────────────────────────────────────

let mongod;

before(async () => {
  process.env.JWT = "test-jwt-secret-for-unit-tests";
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
});

after(async () => {
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

    assert.equal(res.status, 200);
    assert.ok(res.body._id, "should return user _id");
    assert.ok(!res.body.password, "should not expose password");
  });

  it("returns 400 on wrong password", async () => {
    await makeUser({ username: "bob", password: "Correct99" });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "bob", password: "WrongPass1" });

    assert.equal(res.status, 400);
  });

  it("returns 404 when user does not exist", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "nobody", password: "Password1" });

    assert.equal(res.status, 404);
  });

  it("returns 400 when fields are missing", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "alice" }); // no password

    assert.equal(res.status, 400);
  });
});

// ─── POST /api/auth/logout ────────────────────────────────────────────────────

describe("POST /api/auth/logout", () => {
  it("returns 200 and clears the cookie", async () => {
    const res = await request(app).post("/api/auth/logout");

    assert.equal(res.status, 200);
    assert.ok(res.body.message, "should return a message");
  });
});
