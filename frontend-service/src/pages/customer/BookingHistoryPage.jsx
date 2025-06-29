import React, { useEffect, useState } from "react";
import Header from "../../components/customer/header/Header";
import BookingHistory from "../../components/customer/user-detail/BookingHistory";
import BookingStats from "../../components/customer/user-detail/BookingStats";
import { transactionHistory } from "../../components/customer/user-detail/sampleData";
import { getHistoryBooking } from "../../utils/api";
import jwtDecode from "jwt-decode";

const BookingHistoryPage = () => {

  const [historyBooking, setHistoryBooking] = useState([]);

  // useEffect(() => {
  //   const fetchHistoryBooking = async () => {
  //     const response = await getHistoryBooking(jwtDecode(localStorage.getItem("token")).id);
  //     setHistoryBooking(response.data);
  //     console.log(response.data);
  //   };
  //   fetchHistoryBooking();
  // }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingStats bookings={transactionHistory} />
          <div className="bg-white rounded-lg shadow-sm p-6">
            <BookingHistory bookings={historyBooking} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingHistoryPage; 