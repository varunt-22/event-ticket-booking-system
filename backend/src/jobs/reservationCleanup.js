import cron from "node-cron";

import Reservation from "../models/Reservation.js";
import Seat from "../models/Seat.js";

const startReservationCleanup = () => {
  cron.schedule("* * * * *", async () => {
    try {
      console.log(
        "Running reservation cleanup..."
      );

      const expiredReservations =
        await Reservation.find({
          expiresAt: {
            $lt: new Date(),
          },
        });

      for (const reservation of expiredReservations) {
        await Seat.updateMany(
          {
            eventId: reservation.eventId,
            seatNumber: {
              $in: reservation.seatNumbers,
            },
          },
          {
            $set: {
              status: "available",
            },
          }
        );

        await Reservation.findByIdAndDelete(
          reservation._id
        );
      }

      if (expiredReservations.length > 0) {
        console.log(
          `${expiredReservations.length} expired reservations cleaned`
        );
      }
    } catch (error) {
      console.error(
        "Cleanup Error:",
        error.message
      );
    }
  });
};

export default startReservationCleanup;