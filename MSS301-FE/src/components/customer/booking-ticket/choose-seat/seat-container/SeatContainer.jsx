import React, { useEffect, useState } from "react";
import SignSeat from "./sign-seat/SignSeat";
import Screen from "./screen/Screen";

const SeatContainer = ({ showtimeDetail }) => {
  const col = showtimeDetail?.cinemaHall?.hallType?.column || 0;
  const row = showtimeDetail?.cinemaHall?.hallType?.roll || 0;

  const [selectedSeats, setSelectedSeats] = useState(() => {
    const saved = localStorage.getItem("selectedSeats")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("selectedSeats", JSON.stringify(selectedSeats))
  }, [selectedSeats])

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    )
  }

  return (
    <div className="bg-white py-4 px-2 rounded-[.375rem] w-full mb-10">
      <SignSeat />
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
                return (
                  <div
                    key={colIndex}
                    className="w-[30px] h-[30px] rounded-[.375rem] cursor-pointer flex justify-center items-center"
                    onClick={() => toggleSeat(seatLabel)}
                    style={{
                      backgroundColor: isSelected ? "#F58020" : "#dfdfdf",
                      color: isSelected ? "#ffffff" : "#4A4A4A",
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
