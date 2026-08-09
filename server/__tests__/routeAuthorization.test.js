import { describe, it, expect, beforeAll, vi } from "vitest";
import jwt from "jsonwebtoken";
import request from "supertest";

/**
 * Guard-layer tests: every controller is stubbed, so these exercise routing and
 * the auth middleware only — no database required.
 *
 * The regression they lock in: admin guards used to be attached with
 * `router.use(verifyAdmin)` on a sub-router mounted ahead of the user routes.
 * Because `next(err)` from a router-level guard aborts the whole chain, every
 * non-admin request was answered with 403 before it could reach the route meant
 * for it — customers could not load their own cars, services or messages.
 */

const { stubs } = vi.hoisted(() => ({
  stubs: (names) =>
    Object.fromEntries(
      names.map((name) => [
        name,
        (req, res) => res.status(200).json({ handler: name, params: req.params }),
      ])
    ),
}));

vi.mock("../controllers/car.js", () =>
  stubs([
    "updateCar",
    "deleteCar",
    "getCar",
    "getCars",
    "createCar",
    "getCarsByType",
    "getCarsWithService",
    "getCarsByOwner",
  ])
);
vi.mock("../controllers/user.js", () =>
  stubs(["updateUser", "deleteUser", "getUser", "getUsers", "getUsersByType"])
);
vi.mock("../controllers/service.js", () =>
  stubs([
    "createService",
    "updateService",
    "deleteService",
    "getService",
    "getServices",
    "getServicesByType",
    "getServicesByCar",
    "getServicesByUser",
  ])
);
vi.mock("../controllers/message.js", () =>
  stubs([
    "createMessage",
    "updateMessage",
    "deleteMessage",
    "getMessage",
    "getMessages",
    "createMessageToAdmin",
    "getMessagesByType",
    "getMessageByUser",
  ])
);
vi.mock("../controllers/appointment.js", () =>
  stubs([
    "getAppointments",
    "getAppointment",
    "createAppointment",
    "updateAppointment",
    "updateAppointmentStatus",
    "deleteAppointment",
    "getAppointmentsByStatus",
    "getAppointmentsByDateRange",
  ])
);
vi.mock("../controllers/contact.js", () =>
  stubs(["getContacts", "createContact", "deleteContact"])
);
vi.mock("../controllers/dashboard.js", () => stubs(["getDashboardStats"]));
vi.mock("../controllers/audit.js", () => stubs(["getAuditLogs"]));
vi.mock("../controllers/review.js", () => stubs(["getReviews", "createReview"]));
vi.mock("../controllers/agent.js", () => stubs(["chat"]));
// The audit middleware is the only route-level piece that touches the database.
vi.mock("../middleware/audit.js", () => ({ auditAdmin: () => (req, res, next) => next() }));

let app;

const CUSTOMER_ID = "aaaaaaaaaaaaaaaaaaaaaaaa";
const OTHER_ID = "bbbbbbbbbbbbbbbbbbbbbbbb";
const RESOURCE_ID = "cccccccccccccccccccccccc";

const cookieFor = (payload, options = {}) =>
  `access_token=${jwt.sign(payload, process.env.JWT, options)}`;

let customerCookie;
let adminCookie;

beforeAll(async () => {
  process.env.JWT = "test-jwt-secret-for-route-authorization";
  app = (await import("../app.js")).default;
  customerCookie = cookieFor({ id: CUSTOMER_ID, isAdmin: false });
  adminCookie = cookieFor({ id: OTHER_ID, isAdmin: true });
});

// ─── Customer-reachable routes ────────────────────────────────────────────────

describe("routes a signed-in customer must be able to reach", () => {
  const cases = [
    ["get", `/api/users/${CUSTOMER_ID}`, "getUser"],
    ["get", `/api/cars/user/${CUSTOMER_ID}`, "getCarsByOwner"],
    ["get", `/api/cars/${RESOURCE_ID}`, "getCar"],
    ["get", `/api/services/user/${CUSTOMER_ID}`, "getServicesByUser"],
    ["get", `/api/services/car/${RESOURCE_ID}`, "getServicesByCar"],
    ["get", `/api/services/${RESOURCE_ID}`, "getService"],
    ["get", `/api/messages/user/${CUSTOMER_ID}`, "getMessageByUser"],
    ["get", `/api/messages/${RESOURCE_ID}`, "getMessage"],
    ["post", `/api/messages/${OTHER_ID}`, "createMessage"],
    ["get", `/api/appointments/${RESOURCE_ID}`, "getAppointment"],
  ];

  it.each(cases)("%s %s reaches %s", async (method, url, handler) => {
    const res = await request(app)[method](url).set("Cookie", customerCookie);

    expect(res.status).toBe(200);
    expect(res.body.handler).toBe(handler);
  });
});

// ─── Admin-only routes ────────────────────────────────────────────────────────

describe("routes a customer must not reach", () => {
  const cases = [
    ["/api/users", "list every user"],
    ["/api/cars", "list every car"],
    ["/api/cars/populate", "list every car with owners"],
    ["/api/cars/service", "list every car with services"],
    ["/api/services", "list every service"],
    ["/api/messages", "list every message"],
    ["/api/contacts", "list contact submissions"],
    ["/api/appointments", "list every appointment"],
    ["/api/appointments/status", "filter appointments by status"],
    ["/api/dashboard/stats", "read dashboard stats"],
  ];

  it.each(cases)("GET %s is 403 (%s)", async (url) => {
    const res = await request(app).get(url).set("Cookie", customerCookie);

    expect(res.status).toBe(403);
  });

  it("an admin reaches the same admin routes", async () => {
    const res = await request(app).get("/api/users").set("Cookie", adminCookie);

    expect(res.status).toBe(200);
    expect(res.body.handler).toBe("getUsers");
  });

  it("a customer cannot read another user's account", async () => {
    const res = await request(app).get(`/api/users/${OTHER_ID}`).set("Cookie", customerCookie);

    expect(res.status).toBe(403);
  });
});

// ─── Token handling ───────────────────────────────────────────────────────────

describe("access token handling", () => {
  it("answers 401 when no token is present", async () => {
    const res = await request(app).get(`/api/users/${CUSTOMER_ID}`);

    expect(res.status).toBe(401);
  });

  it("answers 401 — not 403 — for an expired token so the client can refresh", async () => {
    const expired = cookieFor({ id: CUSTOMER_ID, isAdmin: false }, { expiresIn: "-1s" });

    const res = await request(app).get(`/api/users/${CUSTOMER_ID}`).set("Cookie", expired);

    expect(res.status).toBe(401);
  });

  it("answers 401 for a malformed token", async () => {
    const res = await request(app)
      .get(`/api/users/${CUSTOMER_ID}`)
      .set("Cookie", "access_token=not-a-jwt");

    expect(res.status).toBe(401);
  });

  it("answers 401 for an expired token on an admin route too", async () => {
    const expired = cookieFor({ id: OTHER_ID, isAdmin: true }, { expiresIn: "-1s" });

    const res = await request(app).get("/api/users").set("Cookie", expired);

    expect(res.status).toBe(401);
  });
});

// ─── Public routes stay public ────────────────────────────────────────────────

describe("public routes", () => {
  it("anyone can submit an appointment request", async () => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    const res = await request(app)
      .post("/api/appointments")
      .send({
        clientName: "Anonymous Caller",
        email: "caller@test.com",
        phone: "050-123-4567",
        date: nextWeek.toISOString().split("T")[0],
        time: "10:00",
      });

    expect(res.status).toBe(200);
    expect(res.body.handler).toBe("createAppointment");
  });

  it("anyone can submit a contact request", async () => {
    const res = await request(app).post("/api/contacts").send({});

    expect(res.status).toBe(200);
    expect(res.body.handler).toBe("createContact");
  });

  it("anyone can read reviews", async () => {
    const res = await request(app).get("/api/reviews");

    expect(res.status).toBe(200);
    expect(res.body.handler).toBe("getReviews");
  });
});
