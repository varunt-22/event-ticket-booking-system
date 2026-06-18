import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

export default function MyBookings() {
  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response =
        await api.get(
          "/bookings/my"
        );

      setBookings(
        response.data.bookings
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <h2 className="text-center mt-20">
        Loading...
      </h2>
    );

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold mb-8">
          My Bookings
        </h1>

       {bookings.length === 0 ? (
  <div className="bg-white rounded-xl shadow p-8 text-center">
    <h2 className="text-xl font-semibold">
      No Bookings Yet
    </h2>

    <p className="text-gray-500 mt-2">
      Reserve and book seats to see them here.
    </p>
  </div>
) : (
          <div className="space-y-6">
            {bookings.map(
              (booking) => (
                <div
                  key={
                    booking._id
                  }
                  className="bg-white rounded-xl shadow p-6"
                >
                  <h2 className="text-2xl font-bold">
                    {
                      booking
                        .eventId
                        ?.name
                    }
                  </h2>

                  <p className="text-gray-500 mb-3">
                    {
                      booking
                        .eventId
                        ?.venue
                    }
                  </p>

                  <p>
                    <strong>
                      Seats:
                    </strong>{" "}
                    {booking.seatNumbers.join(
                      ", "
                    )}
                  </p>

                  <p className="mt-2">
                    <strong>
                      Booked:
                    </strong>{" "}
                    {new Date(
                      booking.bookedAt
                    ).toLocaleString()}
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </>
  );
}