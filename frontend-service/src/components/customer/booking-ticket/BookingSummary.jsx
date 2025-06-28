import React from 'react';
import { getSelectedSeatsDetail, calculateTotalPrice } from '../../utils/seatStorage';

const BookingSummary = () => {
  const selectedSeatsDetail = getSelectedSeatsDetail();
  const totalPrice = calculateTotalPrice();

  if (selectedSeatsDetail.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <h3 className="font-bold text-lg mb-3 text-gray-800">Tóm tắt đặt vé</h3>
      
      <div className="space-y-2 mb-4">
        {selectedSeatsDetail.map((seat, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <div>
              <span className="font-medium">{seat.seatName}</span>
              <span className="text-gray-500 ml-2">- {seat.movieName}</span>
            </div>
            <span className="font-bold text-orange-600">
              {seat.price.toLocaleString('vi-VN')} VNĐ
            </span>
          </div>
        ))}
      </div>

      <div className="border-t pt-3">
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">Tổng cộng:</span>
          <span className="font-bold text-xl text-orange-600">
            {totalPrice.toLocaleString('vi-VN')} VNĐ
          </span>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        <p>Rạp: {selectedSeatsDetail[0]?.cinemaName}</p>
        <p>Phòng: {selectedSeatsDetail[0]?.hallName}</p>
        <p>Suất chiếu: {selectedSeatsDetail[0]?.showtime}</p>
      </div>
    </div>
  );
};

export default BookingSummary; 