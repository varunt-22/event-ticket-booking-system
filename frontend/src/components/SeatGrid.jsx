export default function SeatGrid({
  seats,
  selectedSeats,
  toggleSeat,
}) {
  return (
  <div className="grid grid-cols-5 gap-3">
    {seats.map((seat) => {
      let background =
        "bg-green-500";

      if (
        seat.status === "reserved"
      )
        background =
          "bg-orange-500";

      if (
        seat.status === "booked"
      )
        background =
          "bg-red-500";

      if (
        seat.status ===
          "available" &&
        selectedSeats.includes(
          seat.seatNumber
        )
      ) {
        background =
          "bg-blue-600";
      }

      return (
        <button
          key={seat._id}
          disabled={
            seat.status !==
            "available"
          }
          onClick={() =>
            toggleSeat(
              seat.seatNumber
            )
          }
          className={`
            ${background}
            text-white
            h-14
            rounded-xl
            font-semibold
            shadow
            transition
            hover:scale-105
            disabled:cursor-not-allowed
          `}
        >
          {seat.seatNumber}
        </button>
      );
    })}
  </div>
);
}