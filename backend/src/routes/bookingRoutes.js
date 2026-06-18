import express from "express";
import Booking from "../models/Booking.js";

import protect from "../middleware/authMiddleware.js";

import {
  confirmBooking,
  getMyBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  confirmBooking
);
router.get(
  "/my",
  protect,
  getMyBookings
);

export default router;