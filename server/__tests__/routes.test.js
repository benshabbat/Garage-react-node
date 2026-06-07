import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import request from "supertest";
import app from "../app.js";
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";
import Review from "../models/Review.js";

// ─── Test DB lifecycle ────────────────────────────────────────────────────────

let mongod;

beforeAll(async () => {
  process.env.JWT = "test-jwt-secret-for-routes";
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Appointment.deleteMany({});
  await Review.deleteMany({});
});

// ─── Helpers ─────────────────────────────────────────────────────────────────

const makeUser = async ({ username = "tester", isAdmin = false } = {}) => {
  const hashed = await bcrypt.hash("Password1", 10);
  return User.create({
    username,
    email: `${username}@test.com`,
    phone: `050-${Math.floor(100000 + Math.random() * 900000)}`,
    password: hashed,
    isAdmin,
  });
};

const authCookie = (user) => {
  const token = jwt.sign({ id: user._id.toString(), isAdmin: user.isAdmin }, process.env.JWT);
  return `access_token=${token}`;
};

const futureDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().split("T")[0];
};

// ─── POST /api/appointments ───────────────────────────────────────────────────

describe("POST /api/appointments", () => {
  const validBody = () => ({
    clientName: "Test Client",
    email: "client@test.com",
    phone: "050-123-4567",
    date: futureDate(),
    time: "10:00",
  });

  it("returns 201 and creates appointment with valid data", async () => {
    const res = await request(app).post("/api/appointments").send(validBody());

    expect(res.status).toBe(201);
    expect(res.body.clientName).toBe("Test Client");
    expect(res.body.status).toBe("pending");
  });

  it("returns 400 when required fields are missing", async () => {
    const res = await request(app).post("/api/appointments").send({ clientName: "Test Client" });

    expect(res.status).toBe(400);
  });

  it("returns 400 when date is in the past", async () => {
    const res = await request(app)
      .post("/api/appointments")
      .send({ ...validBody(), date: "2020-01-01" });

    expect(res.status).toBe(400);
  });

  it("returns 400 when phone format is invalid", async () => {
    const res = await request(app)
      .post("/api/appointments")
      .send({ ...validBody(), phone: "not-a-phone" });

    expect(res.status).toBe(400);
  });

  it("returns 400 when time format is invalid", async () => {
    const res = await request(app)
      .post("/api/appointments")
      .send({ ...validBody(), time: "25:99" });

    expect(res.status).toBe(400);
  });
});

// ─── DELETE /api/users/:id ────────────────────────────────────────────────────

describe("DELETE /api/users/:id", () => {
  it("admin can delete a user and returns 200", async () => {
    const admin = await makeUser({ username: "admin1", isAdmin: true });
    const target = await makeUser({ username: "victim1" });

    const res = await request(app)
      .delete(`/api/users/${target._id}`)
      .set("Cookie", authCookie(admin));

    expect(res.status).toBe(200);
  });

  it("returns 403 when a regular user tries to delete another user", async () => {
    const attacker = await makeUser({ username: "attacker1" });
    const target = await makeUser({ username: "victim2" });

    const res = await request(app)
      .delete(`/api/users/${target._id}`)
      .set("Cookie", authCookie(attacker));

    expect(res.status).toBe(403);
  });

  it("returns 401 when unauthenticated", async () => {
    const target = await makeUser({ username: "victim3" });

    const res = await request(app).delete(`/api/users/${target._id}`);

    expect(res.status).toBe(401);
  });
});

// ─── POST /api/reviews ────────────────────────────────────────────────────────

describe("POST /api/reviews", () => {
  it("authenticated user can create a review and returns 201", async () => {
    const user = await makeUser({ username: "reviewer1" });

    const res = await request(app)
      .post("/api/reviews")
      .set("Cookie", authCookie(user))
      .send({ description: "Great service!", stars: 5 });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe("reviewer1");
    expect(res.body.stars).toBe(5);
  });

  it("returns 401 when unauthenticated", async () => {
    const res = await request(app).post("/api/reviews").send({ description: "Great!", stars: 5 });

    expect(res.status).toBe(401);
  });

  it("returns 400 when stars are out of range", async () => {
    const user = await makeUser({ username: "reviewer2" });

    const res = await request(app)
      .post("/api/reviews")
      .set("Cookie", authCookie(user))
      .send({ description: "Bad stars", stars: 6 });

    expect(res.status).toBe(400);
  });
});

// ─── GET /api/dashboard/stats ─────────────────────────────────────────────────

describe("GET /api/dashboard/stats", () => {
  it("admin receives 200 with stats payload", async () => {
    const admin = await makeUser({ username: "dashAdmin", isAdmin: true });

    const res = await request(app).get("/api/dashboard/stats").set("Cookie", authCookie(admin));

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("overview");
  });

  it("returns 403 for a non-admin user", async () => {
    const user = await makeUser({ username: "dashUser" });

    const res = await request(app).get("/api/dashboard/stats").set("Cookie", authCookie(user));

    expect(res.status).toBe(403);
  });

  it("returns 401 when unauthenticated", async () => {
    const res = await request(app).get("/api/dashboard/stats");

    expect(res.status).toBe(401);
  });
});
