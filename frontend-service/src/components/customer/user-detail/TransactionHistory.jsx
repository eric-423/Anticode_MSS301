import React from "react";
import BookingHistory from "./BookingHistory";

const TransactionHistory = ({ transactions }) => {
  return (
    <div>
      <BookingHistory bookings={transactions} />
    </div>
  );
};

export default TransactionHistory; 