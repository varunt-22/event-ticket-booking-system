import mongoose from "mongoose";

import Seat from "../models/Seat.js";
import Reservation from "../models/Reservation.js";

export const reserveSeats = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const { eventId, seatNumbers } = req.body;

    if (
      !eventId ||
      !seatNumbers ||
      seatNumbers.length === 0
    ) {
      await session.abortTransaction();

      return res.status(400).json({
        success: false,
        message: "Event and seats required",
      });
    }

    const seats = await Seat.find({
      eventId,
      seatNumber: { $in: seatNumbers },
    }).session(session);

    if (seats.length !== seatNumbers.length) {
      await session.abortTransaction();

      return res.status(400).json({
        success: false,
        message: "Invalid seat selection",
      });
    }

    const unavailableSeat = seats.find(
      (seat) => seat.status !== "available"
    );

    if (unavailableSeat) {
      await session.abortTransaction();

      return res.status(400).json({
        success: false,
        message: `${unavailableSeat.seatNumber} is no longer available`,
      });
    }

    await Seat.updateMany(
      {
        eventId,
        seatNumber: { $in: seatNumbers },
      },
      {
        $set: {
          status: "reserved",
        },
      },
      { session }
    );

    const reservation = await Reservation.create(
      [
        {
          userId: req.user.id,
          eventId,
          seatNumbers,
          expiresAt: new Date(
            Date.now() + 10 * 60 * 1000
          ),
        },
      ],
      { session }
    );

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      reservation: reservation[0],
      expiresAt: reservation[0].expiresAt,
    });
  } catch (error) {
    await session.abortTransaction();

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    session.endSession();
  }
};