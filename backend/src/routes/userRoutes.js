import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getMyBookings,
} from "../controllers/userController.js";

const router = express.Router();

router.get(
  "/my-bookings",
  protect,
  getMyBookings
);

export default router;