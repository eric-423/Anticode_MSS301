import React from 'react';
import { getSelectedSeatsDetail } from '../../../../../utils/seatStorage';

const SeatCounter = ({ showtimeId }) => {
  const allSeatsDetail = getSelectedSeatsDetail();
  const currentShowtimeSeats = allSeatsDetail
    .filter(seat => seat.showtimeId === showtimeId)
    .map(seat => seat.seatLabel);
  
  if (currentShowtimeSeats.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 p-2 bg-orange-50 rounded-lg text-center">
      <p className="text-sm text-orange-700">
        Đã chọn {currentShowtimeSeats.length} chỗ: {currentShowtimeSeats.join(", ")}
      </p>
    </div>
  );
};

export default SeatCounter; 