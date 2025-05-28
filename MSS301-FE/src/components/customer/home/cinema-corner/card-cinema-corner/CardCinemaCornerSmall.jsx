import React from "react";
import IMAGES from "../../../../../utils/images";

const CardCinemaCornerSmall = () => {
  return (
    <div className="relative flex gap-x-2">
      <div className="overflow-hidden w-[35%]">
        <img
          className="w-[195px] rounded-[.375rem] h-[130px] "
          src={IMAGES.muaLuaBlogSmall}
        />
      </div>
      <div className="w-[65%]">
        <h3 className=" line-clamp-2 text-[20px] cursor-pointer font-nunito-sans text-[#4a4a4a] hover:text-[#034EA2] font-bold transition-all duration-300 overflow-hidden">
          [Review] Lilo & Stitch: Bản Live-action Thành Công Nhất Của Disney?
        </h3>
        <div className="mt-2 h-[20px] flex gap-[8px]">
          <div className="bg-[#4080FF] px-3 flex justify-center items-center rounded-[.375rem]">
            <span className="text-[10px] text-white">Thích</span>
          </div>
          <div className="bg-[rgba(233,236,239,1)] px-3 flex justify-center items-center rounded-[.375rem]">
            <span className="text-[10px] text-[#333333]">468</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCinemaCornerSmall;
