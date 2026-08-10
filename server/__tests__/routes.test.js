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
import Car from "../models/Car.js";

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
  await Car.deleteMany({});
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

// ─── GET /api/cars/:id — ownership ───────────────────────────────────────────

describe("GET /api/cars/:id", () => {
  const makeCar = (owner, numberPlate) =>
    Car.create({ owner: owner._id, numberPlate, km: 1000, brand: "Mazda" });

  it("the owner can read their own car", async () => {
    const owner = await makeUser({ username: "carOwner" });
    const car = await makeCar(owner, "11-111-11");

    const res = await request(app).get(`/api/cars/${car._id}`).set("Cookie", authCookie(owner));

    expect(res.status).toBe(200);
    expect(res.body._id).toBe(car._id.toString());
  });

  it("returns 403 when a different customer asks for it", async () => {
    const owner = await makeUser({ username: "carOwner2" });
    const stranger = await makeUser({ username: "carStranger" });
    const car = await makeCar(owner, "22-222-22");

    const res = await request(app).get(`/api/cars/${car._id}`).set("Cookie", authCookie(stranger));

    expect(res.status).toBe(403);
  });

  it("an admin can read any car", async () => {
    const owner = await makeUser({ username: "carOwner3" });
    const admin = await makeUser({ username: "carAdmin", isAdmin: true });
    const car = await makeCar(owner, "33-333-33");

    const res = await request(app).get(`/api/cars/${car._id}`).set("Cookie", authCookie(admin));

    expect(res.status).toBe(200);
  });
});

// ─── Appointment ownership ───────────────────────────────────────────────────

describe("appointment ownership", () => {
  const bookingBody = () => ({
    clientName: "Owner Test",
    email: "owner@test.com",
    phone: "050-123-4567",
    date: futureDate(),
    time: "11:00",
  });

  it("ignores a user id supplied by an anonymous booking", async () => {
    const victim = await makeUser({ username: "victimAccount" });

    const res = await request(app)
      .post("/api/appointments")
      .send({ ...bookingBody(), user: victim._id.toString() });

    expect(res.status).toBe(201);
    const saved = await Appointment.findById(res.body._id);
    expect(saved.user).toBeUndefined();
  });

  it("links a booking made by a signed-in customer to their own account", async () => {
    const customer = await makeUser({ username: "bookingCustomer" });

    const res = await request(app)
      .post("/api/appointments")
      .set("Cookie", authCookie(customer))
      .send(bookingBody());

    expect(res.status).toBe(201);
    const saved = await Appointment.findById(res.body._id);
    expect(saved.user.toString()).toBe(customer._id.toString());
  });

  it("lets the linked customer read their own appointment", async () => {
    const customer = await makeUser({ username: "apptOwner" });
    const appointment = await Appointment.create({
      ...bookingBody(),
      user: customer._id,
    });

    const res = await request(app)
      .get(`/api/appointments/${appointment._id}`)
      .set("Cookie", authCookie(customer));

    expect(res.status).toBe(200);
  });

  it("returns 403 when a different customer asks for it", async () => {
    const customer = await makeUser({ username: "apptOwner2" });
    const stranger = await makeUser({ username: "apptStranger" });
    const appointment = await Appointment.create({
      ...bookingBody(),
      user: customer._id,
    });

    const res = await request(app)
      .get(`/api/appointments/${appointment._id}`)
      .set("Cookie", authCookie(stranger));

    expect(res.status).toBe(403);
  });

  it("keeps an unlinked appointment admin-only", async () => {
    const customer = await makeUser({ username: "apptNosy" });
    const admin = await makeUser({ username: "apptAdmin", isAdmin: true });
    const appointment = await Appointment.create(bookingBody());

    const asCustomer = await request(app)
      .get(`/api/appointments/${appointment._id}`)
      .set("Cookie", authCookie(customer));
    const asAdmin = await request(app)
      .get(`/api/appointments/${appointment._id}`)
      .set("Cookie", authCookie(admin));

    expect(asCustomer.status).toBe(403);
    expect(asAdmin.status).toBe(200);
  });
});
