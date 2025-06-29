import React from 'react';
import { getSeatNamesByShowtime, getSelectedSeatsDetail } from '../../../../../utils/seatStorage';
import { useStudentContext } from './booking-detail/useStudentContext';

const SeatCounter = ({ showtimeId, showtimeDetail }) => {
  const currentShowtimeSeats = getSeatNamesByShowtime(showtimeId);
  const { isStudent } = useStudentContext();

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

  // Kiểm tra xem có ghế nào đã áp dụng ưu đãi học sinh không
  const allSeatsDetail = getSelectedSeatsDetail();
  const studentSeats = allSeatsDetail.filter(seat => 
    seat.showtime === parseInt(showtimeId) && seat.ticketType === 3
  );

  return (
    <div className="mt-4 p-2 bg-orange-50 rounded-lg text-center">
      <p className="text-sm text-orange-700">
        Đã chọn {currentShowtimeSeats.length} chỗ: {currentShowtimeSeats.join(", ")}
        {isLastRowSelected && (
          <span className="block text-xs text-orange-600 mt-1">
            ⭐ Hàng cuối: Ghế đôi liền kề (tự động chọn 2 ghế liền nhau)
          </span>
        )}
        {isStudent && studentSeats.length === 0 && (
          <span className="block text-xs text-green-600 mt-1">
            🎓 Ưu đãi học sinh: Upload thẻ để áp dụng ưu đãi cho 1 ghế
          </span>
        )}
        {studentSeats.length > 0 && (
          <span className="block text-xs text-green-600 mt-1">
            🎓 Đã áp dụng ưu đãi học sinh cho ghế: {studentSeats.map(seat => seat.seatName).join(", ")}
          </span>
        )}
      </p>
    </div>
  );
};

export default SeatCounter; 