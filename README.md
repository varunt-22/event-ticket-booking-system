# Event Ticket Booking System

## Overview

A MERN Stack Event Ticket Booking Application that allows users to browse events, reserve seats, and confirm bookings.

The application prevents double booking, supports reservation expiration, and provides booking history for users.

---

## Features

### Authentication

- User Registration
- User Login
- JWT Authentication

### Event Management

- View All Events
- View Event Details

### Seat Reservation

- Interactive Seat Grid
- Multiple Seat Selection
- Seat Status Indicators
  - Available (Green)
  - Reserved (Orange)
  - Booked (Red)
  - Selected (Blue)

### Reservation System

- Reserve seats for 10 minutes
- Reservation countdown timer
- Automatic reservation expiry

### Booking System

- Confirm reservations
- Prevent booking expired reservations
- View booking history

### Additional Features

- Responsive UI
- Protected Routes
- My Bookings Page

---

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Axios
- Tailwind CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## Project Structure

backend/
frontend/

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Backend Setup

```bash
cd backend

npm install

npm run dev
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## Environment Variables

Create a .env file inside backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## API Endpoints

### Authentication

POST /api/auth/register

POST /api/auth/login

### Events

GET /api/events

GET /api/events/:id

### Reservations

POST /api/reserve

### Bookings

POST /api/bookings

GET /api/bookings/my

---

## Design Decisions

### Preventing Double Booking

Seats can only be reserved when their status is "available".

The reservation and booking flow updates seat status in the database to ensure that the same seat cannot be booked by multiple users.

### Reservation Expiry

Reservations expire automatically after 10 minutes.

A background cleanup job periodically removes expired reservations and makes the seats available again.

---

## Future Improvements

- Real-time seat updates using Socket.io
- Payment Gateway Integration
- Email Confirmation
- Event Search and Filtering

---

## Author

Varun Tiwari