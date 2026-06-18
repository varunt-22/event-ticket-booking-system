import { useEffect, useState } from "react";

export default function ReservationTimer({
  expiresAt,
  onExpire,
}) {
  const [timeLeft, setTimeLeft] =
    useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const difference =
        new Date(expiresAt) -
        new Date();

      if (difference <= 0) {
        clearInterval(timer);

        setTimeLeft("00:00");

        if (onExpire) {
          onExpire();
        }

        return;
      }

      const minutes = Math.floor(
        difference / 1000 / 60
      );

      const seconds = Math.floor(
        (difference / 1000) % 60
      );

      setTimeLeft(
        `${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart(
          2,
          "0"
        )}`
      );
    }, 1000);

    return () =>
      clearInterval(timer);
  }, [expiresAt, onExpire]);

  return (
    <div>
      <h3>
        Reservation expires in
      </h3>

      <h2>{timeLeft}</h2>
    </div>
  );
}