import React from "react";
import RESERVATION_STEP from "../../../../../utils/reservation-step";

const QuicklyReservation = () => {
  return (
    <div className="w-[1152px] bg-white overflow-hidden h-full mx-auto shadow-2xl rounded-[.375rem] grid grid-cols-11">
      {RESERVATION_STEP.map((item) => (
        <div
          className={`${item.class} flex justify-start items-center pl-[3%]`}
        >
          <span className="bg-[#f58020] text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full">
            {item.id}
          </span>
          <div className="pl-[8px] cursor-pointer w-full">
            <span className="font-nunito-sans text-[14px] text-[#4A4A4A] line-clamp-1 pt-[2px]">
              {item.name}
            </span>
          </div>
        </div>
      ))}

      <div className="relative col-span-2 bg-[#f8ac6e] font-nunito-sans text-[14px] flex justify-center items-center text-white cursor-pointer">
        Mua Vé Nhanh
      </div>
    </div>
  );
};

export default QuicklyReservation;
