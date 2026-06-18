import Navbar from "../components/Navbar";
import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import api from "../services/api";

import SeatGrid from "../components/SeatGrid";
import ReservationTimer from "../components/ReservationTimer";

export default function EventDetails() {
  const { id } =
    useParams();

  const [event, setEvent] =
    useState(null);

  const [seats, setSeats] =
    useState([]);

  const [
    selectedSeats,
    setSelectedSeats,
  ] = useState([]);
  const [reservation, setReservation] =
  useState(null);
  const [booking, setBooking] =
  useState(null);
const [expiresAt, setExpiresAt] =
  useState(null);
const [loading, setLoading] =
  useState(false);

const [error, setError] =
  useState("");
  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent =
    async () => {
      try {
        const response =
          await api.get(
            `/events/${id}`
          );

        setEvent(
          response.data.event
        );

        setSeats(
          response.data.seats
        );
      } catch (error) {
        console.log(error);
      }
    };

  const toggleSeat = (
    seatNumber
  ) => {
    if (
      selectedSeats.includes(
        seatNumber
      )
    ) {
      setSelectedSeats(
        selectedSeats.filter(
          (seat) =>
            seat !==
            seatNumber
        )
      );
    } else {
      setSelectedSeats([
        ...selectedSeats,
        seatNumber,
      ]);
    }
  };
  const reserveSeats = async () => {
  try {
    setLoading(true);

    setError("");

    const response =
      await api.post("/reserve", {
        eventId: id,
        seatNumbers: selectedSeats,
      });

    setReservation(
      response.data.reservation
    );
    setExpiresAt(
  response.data.expiresAt
);

    alert(
      "Seats Reserved Successfully"
    );

    fetchEvent();
  } catch (err) {
    setError(
      err.response?.data?.message ||
        "Reservation Failed"
    );
  } finally {
    setLoading(false);
  }
};
const confirmBooking = async () => {
  try {
    setLoading(true);

    const response =
      await api.post(
        "/bookings",
        {
          reservationId:
            reservation._id,
        }
      );

    setBooking(response.data.booking);

setReservation(null);

setSelectedSeats([]);

await fetchEvent();
    alert(
      "Booking Confirmed!"
    );
  } catch (err) {
    setError(
      err.response?.data
        ?.message ||
        "Booking Failed"
    );
  } finally {
    setLoading(false);
  }
};

  if (!event)
    return <h2>Loading...</h2>;

  return (
    <>
    <Navbar />
  <div className="min-h-screen bg-slate-100">
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-4xl font-bold mb-2">
          {event.name}
        </h1>

        <p className="text-gray-500 mb-8">
          {event.venue}
        </p>

        <div className="flex flex-wrap gap-4 mb-8">
          <span>
            🟢 Available
          </span>

          <span>
            🟠 Reserved
          </span>

          <span>
            🔴 Booked
          </span>

          <span>
            🔵 Selected
          </span>
        </div>

        <SeatGrid
          seats={seats}
          selectedSeats={
            selectedSeats
          }
          toggleSeat={
            toggleSeat
          }
        />

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">
            Selected Seats
          </h3>

          <p className="text-gray-700">
            {selectedSeats.length
              ? selectedSeats.join(
                  ", "
                )
              : "No seats selected"}
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={reserveSeats}
            disabled={
              selectedSeats.length ===
                0 || loading
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Reserving..."
              : "Reserve Seats"}
          </button>
        </div>

        {error && (
          <p className="text-red-500 mt-4">
            {error}
          </p>
        )}

        {reservation && (
          <div className="mt-8 p-6 border rounded-xl bg-slate-50">
            <h3 className="text-xl font-bold mb-3">
              Reservation Created
            </h3>

            <p className="mb-3">
              Reservation ID:
              {" "}
              {reservation._id}
            </p>

            <ReservationTimer
              expiresAt={expiresAt}
              onExpire={() => {
                alert(
                  "Reservation Expired"
                );

                setReservation(
                  null
                );

                setSelectedSeats(
                  []
                );

                fetchEvent();
              }}
            />

            <button
              onClick={
                confirmBooking
              }
              className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Confirm Booking
            </button>
          </div>
        )}

        {booking && (
          <div className="mt-8 p-6 bg-green-100 border border-green-300 rounded-xl">
            <h2 className="text-2xl font-bold text-green-700">
              Booking Successful
            </h2>

            <p className="mt-2">
              Booking ID:
              {" "}
              {booking._id}
            </p>
          </div>
        )}

      </div>
    </div>
  </div>
  </>
);
   
}