import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";

export default function Events() {
  const [events, setEvents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response =
        await api.get("/events");

      setEvents(
        response.data.events
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <h2 className="text-center mt-20 text-xl">
        Loading...
      </h2>
    );

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8">
          Upcoming Events
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h2 className="text-2xl font-bold mb-2">
                {event.name}
              </h2>

              <p className="text-gray-500 mb-4">
                {event.venue}
              </p>

              <div className="space-y-2 mb-5">
                <p>
                  🟢 Available:
                  {" "}
                  {event.availableSeats}
                </p>

                <p>
                  🟠 Reserved:
                  {" "}
                  {event.reservedSeats}
                </p>

                <p>
                  🔴 Booked:
                  {" "}
                  {event.bookedSeats}
                </p>
              </div>

              <Link
                to={`/event/${event._id}`}
              >
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  View Seats
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}