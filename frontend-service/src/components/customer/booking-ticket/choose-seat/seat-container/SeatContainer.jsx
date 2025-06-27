import React, { useState } from "react";
import SignSeat from "./sign-seat/SignSeat";
import Screen from "./screen/Screen";
import SeatCounter from "./SeatCounter";
import { useSeatSelection } from "../../../../../utils/useSeatSelection";

const SeatContainer = ({ showtimeDetail }) => {
  const col = showtimeDetail?.cinemaHall?.hallType?.column || 0;
  const row = showtimeDetail?.cinemaHall?.hallType?.roll || 0;

  const [seatBooked] = useState(["A1", "A2", "B1", "B2", "C1"]);

  // Sử dụng custom hook để quản lý chọn chỗ ngồi
  const { selectedSeats, toggleSeat, isLoading } = useSeatSelection(showtimeDetail);

  return (
    <div className="bg-white py-4 px-2 rounded-[.375rem] w-full mb-10">
      <SignSeat />

      {/* Loading indicator */}
      {isLoading && (
        <div className="mt-4 p-2 bg-blue-50 rounded-lg text-center">
          <p className="text-sm text-blue-600">Đang lấy thông tin giá vé...</p>
        </div>
      )}

      {/* Hiển thị số lượng chỗ đã chọn cho showtime hiện tại */}
      <SeatCounter showtimeId={showtimeDetail?.id} />

      <div className="flex mt-4">
        <Screen />
      </div>
      <div className="overflow-x-scroll scroll-bar-show pb-2 w-full">
        {Array.from({ length: row }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex mt-5 items-center w-full">
            <div className="relative w-[50px] h-[25px] flex justify-center">
              <div className="w-[30px] h-[25px] bg-[#727575] flex justify-center items-center rounded-[3px] text-white text-[12px] font-bold">
                {String.fromCharCode(65 + rowIndex)}
              </div>
            </div>
            <div
              className="flex gap-5 ml-[20px] justify-center"
              style={{ minWidth: col < 16 ? "calc(100% - 80px)" : null }}
            >
              {Array.from({ length: col }).map((_, colIndex) => {
                const seatLabel =
                  String.fromCharCode(65 + rowIndex) + (colIndex + 1)
                const isSelected = selectedSeats.includes(seatLabel)
                const isBooked = seatBooked.includes(seatLabel)
                return (
                  <div
                    key={colIndex}
                    className="w-[30px] h-[30px] rounded-[.375rem] flex justify-center items-center"
                    onClick={() => {
                      if (!isBooked && !isLoading) toggleSeat(seatLabel);
                    }}
                    style={{
                      backgroundColor: isBooked
                        ? "#727575"
                        : isSelected
                          ? "#F58020"
                          : "#dfdfdf",
                      color: isBooked || isSelected ? "#ffffff" : "#4A4A4A",
                      cursor: isBooked || isLoading ? "not-allowed" : "pointer",
                      pointerEvents: isBooked || isLoading ? "none" : "auto",
                    }}
                  >
                    <span className="text-[12px] font-bold">{seatLabel}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default SeatContainer;
