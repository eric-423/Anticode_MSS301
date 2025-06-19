import React from "react";
import ConcessionCard from "./concession-card/ConcessionCard";

const Concessions = () => {
  return (
    <div className="col-span-2 bg-white rounded-[.375rem] font-nunito-sans mb-10 border-[1px] border-[rgb(237,242,249)] overflow-hidden">
      <div className="grid grid-cols-9 font-semibold text-[16px] text-[#777777] px-[25px] py-[15px] bg-[#F9F9F9] items-center">
        <div className="col-span-5">SẢN PHẨM</div>
        <div className="col-span-2 flex justify-center items-center">GIÁ TIỀN</div>
        <div className="col-span-2 flex justify-center items-center">SỐ LƯỢNG</div>
      </div>
      <div className="grid">
        <ConcessionCard />
        <ConcessionCard />
      
      </div>
    </div>
  );
};

export default Concessions;
