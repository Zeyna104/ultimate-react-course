"use client";

import { deleteBooking } from "../_lib/actions";
import ReservationCard from "./ReservationCard";
import { useOptimistic } from "react";

const ReservationList = ({ bookings }) => {
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (currentState, bookingId) =>
      currentState.filter((booking) => booking?.id !== bookingId),
  );

  // * [...currentState, newBooking] for adding

  const handleDelete = async (bookingId) => {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);
  };

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ReservationList;
