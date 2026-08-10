# Garage770 — Garage Management System

A full-stack garage management platform for client management, vehicle tracking, appointments, internal messaging, and admin analytics.

## Live Demo

- **Frontend**: [https://garage-client-one.vercel.app](https://garage-client-one.vercel.app)
- **Backend API**: Deployed on production server

## Tech Stack

### Frontend
- **React 19** (Vite)
- **Zustand 5** — global state management
- **React Router DOM 7**
- **Axios** — HTTP client
- Pure CSS styling

### Backend
- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT** — authentication via HTTP-only cookies
- **bcryptjs** — password hashing
- **express-rate-limit** — API rate limiting
- **@anthropic-ai/sdk** — AI integration

## Key Features

### Landing Page
- About section with service descriptions
- Customer reviews (swiper)
- Contact / appointment booking form (public)

### Management System (authenticated)

**Admin**
- Dashboard with real-time stats: users, cars, services, appointments, messages, reviews
- Monthly trend charts (last 6 months) and top 5 popular services
- Appointment management: view, filter by status / date range, update status, delete
- User management: create, edit, delete
- Vehicle management: create, edit, delete, service history
- Messages inbox and messaging between users
- Contact form submissions (review and delete)

**Authenticated users**
- View and manage own vehicles (`/myCars`)
- Request services on own cars
- Internal messaging
- Leave reviews

**AI Assistant**
- Persistent AI chat agent powered by `@anthropic-ai/sdk` (Claude)
- Available to all authenticated users
- Endpoint: `POST /api/agent/chat` (JWT-protected)

### Security
- JWT authentication with HTTP-only cookies
- Role-based access control (Admin / User)
- bcrypt password hashing
- Rate limiting on API routes
- Ownership verification middleware (users can only access their own resources)
- CORS restricted to production frontend origin

## Project Structure

```
Garage770/
├── client/                     # Frontend (React 19 + Vite)
│   └── src/
│       ├── api/                # Axios config, endpoint constants, CRUD factory, per-domain services
│       ├── components/         # Reusable UI components (form, table, modal, dashboard, landing, agent)
│       ├── hooks/              # Shared custom hooks (useFilteredData, useFormData, useLogout, useRegister)
│       ├── pages/              # Page-level components
│       │   ├── dashboard/      # Admin dashboard
│       │   ├── appointments/   # Appointment management (admin)
│       │   ├── users/          # User management (admin)
│       │   ├── cars/           # Vehicle management (admin)
│       │   ├── messages/       # Messages inbox
│       │   ├── messagesOfContact/  # Messages per contact
│       │   ├── servicesAdmin/  # Service management (admin)
│       │   └── account/        # Own vehicles & service history (/myCars)
│       ├── stores/             # Zustand stores (adminStore, authStore, userStore,
│       │                       #   appointmentsStore, dashboardStore, uiStores)
│       ├── utils/              # Formatters, validators, helpers
│       ├── validation/         # Form validation logic
│       ├── PrivateRoute.jsx    # Auth guard (redirects to / if not logged in)
│       └── App.jsx
└── server/                     # Backend (Node.js + Express)
    ├── __tests__/              # Integration tests (Node.js built-in test runner)
    ├── config/                 # DB connection
    ├── controllers/            # Route handlers
    ├── middleware/             # Auth, error handling, appointment validation
    ├── models/                 # Mongoose schemas
    ├── routes/                 # Express routers
    ├── services/               # Business logic
    ├── utils/                  # Shared utilities (verifyToken, etc.)
    └── index.js
```

## Installation

### Prerequisites
- Node.js 18+
- npm
- MongoDB

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/benshabbat/Garage-react-node

# 2. Install client dependencies
cd client && npm install

# 3. Install server dependencies
cd ../server && npm install

# 4. Configure server environment — create server/.env:
PORT=8800
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

### Run

```bash
# Start backend
cd server && npm run server

# Start frontend (separate terminal)
cd client && npm run dev
```

Or run both together from the server directory:

```bash
cd server && npm run dev
```

### Deploying behind a proxy

Rate limiting identifies callers by IP. Behind a load balancer (Render, Railway,
Fly, nginx…) that IP arrives only in `X-Forwarded-For`, which Express ignores by
default — leave it that way and every user shares a single rate-limit bucket.
Set `TRUST_PROXY` to the number of proxy hops, usually `1`:

```bash
TRUST_PROXY=1
```

Leave it unset when the app is exposed directly: trusting a forwarded header
nobody rewrites lets a client spoof its address and skip the limiter entirely.
See `server/.env.example` for the full list of variables.

## API Endpoints

### Authentication
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/auth/register` | Admin |
| POST | `/api/auth/login` | Public |
| POST | `/api/auth/logout` | Authenticated |

### Users
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/users` | Admin |
| POST | `/api/users/create` | Admin |
| PUT | `/api/users/:id` | Admin |
| DELETE | `/api/users/:id` | Admin |
| GET | `/api/users/:id` | Authenticated |

### Cars
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/cars` | Admin |
| POST | `/api/cars/:userId` | Admin |
| PUT | `/api/cars/:id` | Admin |
| DELETE | `/api/cars/:id/:userId` | Admin |
| GET | `/api/cars/user/:user` | Authenticated (own) |
| GET | `/api/cars/:id` | Authenticated |

### Services
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/services` | Admin |
| POST | `/api/services/:carId` | Admin |
| PUT | `/api/services/:id` | Admin |
| DELETE | `/api/services/:id` | Admin |
| GET | `/api/services/car/:car` | Authenticated |

### Appointments
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/appointments` | Public |
| GET | `/api/appointments` | Admin |
| PUT | `/api/appointments/:id` | Admin |
| PATCH | `/api/appointments/:id/status` | Admin |
| DELETE | `/api/appointments/:id` | Admin |
| GET | `/api/appointments/status?status=pending` | Admin |
| GET | `/api/appointments/date-range?startDate=&endDate=` | Admin |

### Messages
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/messages` | Admin |
| POST | `/api/messages/to/:to` | Public |
| POST | `/api/messages/:from/:to` | Authenticated |
| PUT | `/api/messages/:idMessage` | Authenticated |
| DELETE | `/api/messages/:id` | Authenticated |

### Reviews & Contacts
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/reviews` | Public |
| POST | `/api/reviews` | Public |
| GET | `/api/contacts` | Admin |
| POST | `/api/contacts` | Public |
| DELETE | `/api/contacts/:id` | Admin |

### AI Agent
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/agent/chat` | Authenticated |

## Testing

| Layer | Tool | Location |
|-------|------|----------|
| Client unit tests | Vitest | `client/src/__tests__/` |
| Server integration tests | Node.js built-in test runner | `server/__tests__/` |
| Server test DB | `mongodb-memory-server` | In-memory, no real DB needed |

```bash
# Run client tests
cd client && npm test

# Run server tests
cd server && npm test
```

## CI/CD

GitHub Actions (`.github/workflows/ci.yml`) runs on every push and PR to `main`:

| Job | Steps |
|-----|-------|
| `client-lint-build` | `npm run lint` → `npm run build` |
| `client-test` | `npm test` (Vitest) |
| `server-test` | `npm run lint` → `npm test` |

## Authorization Middleware

- `verifyToken` — validates JWT from HTTP-only cookie
- `verifyUser` — user can only access their own resources
- `verifyAdmin` — admin-only routes

## License

MIT

## Developer

Written by David-Chen Benshabbat