import React from 'react';
import { getSeatNamesByShowtime } from '../../../../../utils/seatStorage';

const SeatCounter = ({ showtimeId, showtimeDetail }) => {
  const currentShowtimeSeats = getSeatNamesByShowtime(showtimeId);

  if (currentShowtimeSeats.length === 0) {
    return null;
  }

  // Kiểm tra xem có ghế nào ở hàng cuối không
  const totalRows = showtimeDetail?.cinemaHall?.hallType?.roll || 0;
  const lastRowSeats = currentShowtimeSeats.filter(seat => {
    const row = seat.charCodeAt(0) - 65; // A=0, B=1, C=2, ...
    return row === totalRows - 1; // Hàng cuối
  });

  const isLastRowSelected = lastRowSeats.length > 0;

  return (
    <div className="mt-4 p-2 bg-orange-50 rounded-lg text-center">
      <p className="text-sm text-orange-700">
        Đã chọn {currentShowtimeSeats.length} chỗ: {currentShowtimeSeats.join(", ")}
        {isLastRowSelected && (
          <span className="block text-xs text-orange-600 mt-1">
            ⭐ Hàng cuối: Ghế đôi liền kề (tự động chọn 2 ghế liền nhau)
          </span>
        )}
      </p>
    </div>
  );
};

export default SeatCounter; 