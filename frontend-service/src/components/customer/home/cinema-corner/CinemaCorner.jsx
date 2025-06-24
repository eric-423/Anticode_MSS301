import React from "react";
import CinemaCornerNav from "./cinema-corner-nav/CinemaCornerNav";
import CardCinemaCorner from "./card-cinema-corner/CardCinemaCorner";
import CardCinemaCornerSmall from "./card-cinema-corner/CardCinemaCornerSmall";

const CinemaCorner = () => {
  return (
    <div className="py-[48px] px-[16px] w-[1280px] mx-auto">
      <CinemaCornerNav />
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="">
          <CardCinemaCorner />
        </div>
        <div className="flex flex-col gap-y-4">
          <CardCinemaCornerSmall />
          <CardCinemaCornerSmall />
          <CardCinemaCornerSmall />
        </div>
      </div>
      <div className="h-[51px] flex justify-center">
        <div className="cursor-pointer text-[#f26b38] hover:text-white w-40 border border-[#fb9440] hover:bg-[#fb9440] transition-all duration-300 rounded text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 justify-center">
          Xem Thêm
        </div>
      </div>
    </div>
  );
};

export default CinemaCorner;
