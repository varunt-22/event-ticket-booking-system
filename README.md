# 🎟️ Event Ticket Booking System

> A full-stack MERN application that allows users to browse events, reserve seats, and confirm bookings with reservation expiry and double-booking protection.

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/API-Express-black)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)

---

## 🚀 Live Demo

🌐 Frontend: https://event-ticket-booking-system-chi.vercel.app/login

⚙️ Backend: https://event-ticket-booking-system-8h0w.onrender.com


---

# 📌 Overview

This project was built as part of a Full Stack Developer (MERN) hiring assignment.

The application simulates a real-world event ticket booking system where users can:

✅ Register & Login

✅ Browse events

✅ Select seats

✅ Reserve seats for 10 minutes

✅ Confirm bookings

✅ View booking history

✅ Prevent double booking

✅ Handle expired reservations automatically

---

# ✨ Features

## 🔐 Authentication

- User Registration
- User Login
- JWT-based Authentication
- Protected Routes

---

## 🎫 Event Management

- View all available events
- View individual event details
- Event venue information
- Real-time seat status display

---

## 🪑 Smart Seat Reservation

Interactive seat grid with color coding:

| Color | Status |
|---------|---------|
| 🟢 Green | Available |
| 🟠 Orange | Reserved |
| 🔴 Red | Booked |
| 🔵 Blue | Selected |

### Reservation Flow

1️⃣ Select Seats

2️⃣ Click Reserve

3️⃣ Reservation timer starts (10 mins)

4️⃣ Confirm Booking

5️⃣ Seats become permanently booked

---

## ⏳ Reservation Expiry

Reservations automatically expire after 10 minutes.

Expired seats are automatically released and become available for booking again.

This prevents users from blocking seats indefinitely.

---

## 🛡️ Double Booking Prevention

The application ensures:

✅ Reserved seats cannot be reserved again

✅ Booked seats cannot be selected

✅ Expired reservations cannot be booked

✅ Seat status is validated before booking

---

## 📖 My Bookings

Users can view:

- Event Name
- Venue
- Booked Seats
- Booking Timestamp

---

# 🏗️ System Architecture

```text
Frontend (React + Tailwind)
          │
          ▼
Backend API (Node + Express)
          │
          ▼
MongoDB Database
```

---

# 🗄️ Database Models

## Event

```js
{
  name,
  venue,
  dateTime,
  totalSeats
}
```

## Seat

```js
{
  eventId,
  seatNumber,
  status
}
```

## Reservation

```js
{
  userId,
  eventId,
  seatNumbers,
  expiresAt
}
```

## Booking

```js
{
  userId,
  eventId,
  seatNumbers,
  bookedAt
}
```

---

# 🛠️ Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

# 📂 Folder Structure

```text
event-booking-app
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── server.js
│
├── frontend
│   ├── components
│   ├── context
│   ├── pages
│   ├── services
│   └── App.jsx
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 📡 API Endpoints

## Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

---

## Events

```http
GET /api/events
GET /api/events/:id
```

---

## Reservations

```http
POST /api/reserve
```

---

## Bookings

```http
POST /api/bookings
GET /api/bookings/my
```

---

# 🎯 Design Decisions

## Why JWT?

JWT provides a simple and scalable authentication mechanism suitable for modern web applications.

---

## Why Reservation Expiry?

Without expiration, users could reserve seats indefinitely, preventing other users from booking them.

The timer ensures fair seat allocation.

---

## How Double Booking Is Prevented

Before reserving or booking:

- Seat availability is validated
- Reserved seats are blocked
- Booked seats are blocked
- Expired reservations are rejected

---

# 🚀 Future Improvements

- Socket.io for real-time seat updates
- Payment Gateway Integration
- Email Confirmation System
- Event Search & Filters
- Admin Dashboard
- Seat Categories & Pricing

---

# 👨‍💻 Author

**Varun Tiwari**

MCA Graduate | Full Stack Developer

GitHub: https://github.com/varunt-22

---

⭐ If you found this project interesting, feel free to star the repository.