# 🧠 NeighbourFit Backend — API Engine for Smart Neighborhood Matching

This is the backend server for **NeighbourFit**, a full-stack project that helps users discover neighborhoods based on their lifestyle preferences like rent, safety, greenery, and more.

It handles authentication, data processing, neighborhood matching, and admin-level content management.

---

## 🔧 Tech Stack

| Tech         | Role                            |
|--------------|---------------------------------|
| Node.js      | Server runtime                  |
| Express.js   | API framework                   |
| MongoDB      | NoSQL database                  |
| Mongoose     | Schema modeling & validation    |
| JWT          | Authentication                  |
| Cookies      | Session persistence             |
| dotenv       | Environment configuration       |

---

## 🔐 Authentication & Security

NeighbourFit Backend includes:

- 🔒 JWT-based secure login system  
- 🔁 Refresh tokens with cookie-based storage  
- 📲 OTP-based user signup and password reset  
- 👤 Auth check for protected routes  
- 🧹 Logout via token invalidation

---

## 📡 API Routes (Modular Overview)

### 📍 **User APIs** (`/api/user`)
- `POST /signup` — Register a new user with OTP verification
- `POST /verify-otp` — Verifies OTP for signup
- `POST /login` — Login and receive access/refresh tokens
- `POST /reset-password` — Initiate password reset with OTP
- `POST /reset-password-verify` — Verify OTP & reset password
- `POST /auth/user` — Auth check using JWT & cookies
- `POST /auth/logout` — Clear tokens & logout user
- `POST /refresh-tokens` — Refresh expired tokens securely

> All tokens are securely managed using HTTP-only cookies.

---

### 🛠️ **Admin APIs** (`/api/admin`)
- `POST /` — Create a new neighborhood entry
- `GET /` — Retrieve all neighborhoods
- `GET /search/:uniqueID` — Get a neighborhood by uniqueID
- `PATCH /neighbourhood-update/:uniqueID` — Edit neighborhood info
- `DELETE /delete-neighbourhood/:uniqueID` — Remove a neighborhood

> Admin routes support full CRUD for managing backend data.

---

### 📊 **Dashboard APIs** (`/api/dashboard`)
- `GET /` — General dashboard data
- `GET /neighbourhoods` — Neighborhoods by city
- `POST /topThreeWebsites` — Suggest top 3 areas based on lifestyle

> Routes are optimized for dynamic dashboard views on the frontend.

---

## 🧠 Matching Engine (Abstract)

User preferences are processed by a custom algorithm that scores and ranks neighborhoods based on weighted parameters.

*Details of the algorithm are intentionally abstracted for privacy.*

---


