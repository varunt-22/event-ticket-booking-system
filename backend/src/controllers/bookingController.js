import mongoose from "mongoose";

import Seat from "../models/Seat.js";
import Reservation from "../models/Reservation.js";
import Booking from "../models/Booking.js";

export const confirmBooking = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const { reservationId } = req.body;

    const reservation =
      await Reservation.findById(
        reservationId
      ).session(session);

    if (!reservation) {
      await session.abortTransaction();

      return res.status(404).json({
        success: false,
        message: "Reservation not found",
      });
    }

    if (
      new Date() > reservation.expiresAt
    ) {
      await session.abortTransaction();

      return res.status(400).json({
        success: false,
        message: "Reservation expired",
      });
    }

    await Seat.updateMany(
      {
        eventId: reservation.eventId,
        seatNumber: {
          $in: reservation.seatNumbers,
        },
      },
      {
        $set: {
          status: "booked",
        },
      },
      { session }
    );

    const booking = await Booking.create(
      [
        {
          userId: reservation.userId,
          eventId: reservation.eventId,
          seatNumbers:
            reservation.seatNumbers,
        },
      ],
      { session }
    );

    await Reservation.findByIdAndDelete(
      reservation._id,
      { session }
    );

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message:
        "Booking confirmed successfully",
      booking: booking[0],
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

export const getMyBookings =
  async (req, res) => {
    try {
      console.log(
  "Logged In User:",
  req.user.id
);

const bookings =
  await Booking.find({
    userId: req.user.id,
  })
          .populate(
            "eventId",
            "name venue"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json({
        success: true,
        bookings,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
    
  };
  