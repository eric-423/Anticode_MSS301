import React, { useState } from "react";
import SignSeat from "./sign-seat/SignSeat";
import Screen from "./screen/Screen";

const SeatContainer = () => {
  const [col, setCol] = useState(10);
  const [row, setRow] = useState(10);

  const [seatHover, setSeatHover] = useState();

  const handleHoverSeat = (row, col) => {
    setSeatHover({
      row: row,
      col: col,
      seat: String.fromCharCode(65 + row) + (col + 1) ,
    });

    console.log(row + col);
  };

  return (
    <div className="bg-white py-4 px-2 rounded-[.375rem] w-full mb-10">
      <SignSeat />
      <div className="flex mt-4">
        <Screen />
      </div>
      <div className="overflow-x-scroll scroll-bar-show pb-2 w-full">
        {Array.from({ length: row }).map((item, _indexRow) => (
          <div className="flex mt-5 items-center w-full">
            <div className="relative w-[50px] h-[25px] flex justify-center">
              <div className="w-[30px] h-[25px] bg-[#727575] flex justify-center items-center rounded-[3px] text-white text-[12px] font-bold">
                {String.fromCharCode(65 + _indexRow)}
              </div>
            </div>
            <div
              className="flex gap-5 ml-[20px] justify-center"
              style={{
                minWidth: col < 16 ? "calc(100% - 80px)" : null,
              }}
            >
              {Array.from({ length: col }).map((item, _indexCol) => (
                <div
                  className="w-[30px] h-[30px] bg-[#dfdfdf] rounded-[.375rem] cursor-pointer flex justify-center items-center"
                  onMouseEnter={() => handleHoverSeat(_indexRow, _indexCol)}
                  onMouseLeave={() => setSeatHover()}
                >
                  <span className="text-[12px] font-bold text-[#4A4A4A]">
                    {seatHover?.col === _indexCol &&
                      seatHover?.row === _indexRow &&
                      seatHover?.seat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatContainer;
