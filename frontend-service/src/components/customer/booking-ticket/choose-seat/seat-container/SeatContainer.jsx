import React, { useState } from "react";
import SignSeat from "./sign-seat/SignSeat";
import Screen from "./screen/Screen";
import SeatCounter from "./SeatCounter";
import { useSeatSelection } from "../../../../../utils/useSeatSelection";

const SeatContainer = ({ showtimeDetail }) => {
  const col = showtimeDetail?.cinemaHall?.hallType?.column || 0;
  const row = showtimeDetail?.cinemaHall?.hallType?.roll || 0;

  const [seatBooked] = useState(["A1", "A2", "B1", "B2", "C1"]);

  const { selectedSeats, toggleSeat, isLoading } = useSeatSelection(showtimeDetail);

  return (
    <div className="bg-white py-4 px-2 rounded-[.375rem] w-full mb-10">
      <SignSeat />

      {/* {isLoading && (
        <div className="mt-4 p-2 bg-blue-50 rounded-lg text-center">
          <p className="text-sm text-blue-600">Đang lấy thông tin giá vé...</p>
        </div>
      )} */}

      {/* <SeatCounter showtimeId={showtimeDetail?.id} showtimeDetail={showtimeDetail} /> */}

      <div className="flex mt-4">
        <Screen />
      </div>

      <div className="overflow-x-scroll scroll-bar-show pb-2 w-full">

        {Array.from({ length: row }).map((_, rowIndex) => {
          const isLastRowIndex = rowIndex === row - 1;
          const rowLabel = String.fromCharCode(65 + rowIndex);

          return (
            <div key={rowIndex} className="flex mt-5 items-center w-full">
              <div className="relative w-[50px] h-[25px] flex justify-center">
                <div className={`w-[30px] h-[30px] flex justify-center items-center rounded-[3px] text-white text-[12px] font-bold ${isLastRowIndex ? 'bg-[#F58020]' : 'bg-[#4E8752]'
                  }`}>
                  {rowLabel}
                </div>
              </div>

              <div
                className={isLastRowIndex ? "flex justify-center ml-[20px] " : "flex gap-5 ml-[20px] justify-center"}
                style={{ minWidth: col < 16 ? "calc(100% - 80px)" : null }}
              >
                {Array.from({ length: col }).map((_, colIndex) => {
                  const seatName = rowLabel + (colIndex + 1);
                  const isSelected = selectedSeats.includes(seatName);
                  const isBooked = seatBooked.includes(seatName);
                  const isLastRowSeat = isLastRowIndex;
                  const isEvenColumn = (colIndex + 1) % 2 === 0;

                  let seatClasses = "";

                  if (isLastRowSeat) {
                    seatClasses = "w-[40px] h-[30px] flex justify-center items-center";
                    if (isEvenColumn) {
                      seatClasses += "flex justify-center items-center mr-5 ";
                    }
                  } else {
                    seatClasses += "w-[30px] h-[30px] flex justify-center items-center";
                  }

                  return (
                    <div
                      key={colIndex}
                      className={seatClasses}
                      onClick={() => {
                        if (!isBooked && !isLoading) toggleSeat(seatName);
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
                      <span className="text-[10px] font-bold">{seatName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div >
  );
};

export default SeatContainer;
