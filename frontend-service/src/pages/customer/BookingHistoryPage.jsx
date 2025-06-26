import React from "react";
import Header from "../../components/customer/header/Header";
import BookingHistory from "../../components/customer/user-detail/BookingHistory";
import BookingStats from "../../components/customer/user-detail/BookingStats";
import { transactionHistory } from "../../components/customer/user-detail/sampleData";

const BookingHistoryPage = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingStats bookings={transactionHistory} />
          <div className="bg-white rounded-lg shadow-sm p-6">
            <BookingHistory bookings={transactionHistory} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingHistoryPage; 