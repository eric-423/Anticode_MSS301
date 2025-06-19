import React from "react";

const ConcessionCard = () => {
  return (
    <div className="grid grid-cols-9 text-[16px] px-[25px] py-[20px] border-b-[1px] border-[rgb(237,242,249)]">
      <div className="col-span-5">
        <h6 className="text-[#4A4A4A] font-semibold text-[16px]">
          Beta Combo 69oz
        </h6>
        <p className="text-[14px] text-[#777777]">
          TIẾT KIỆM 28K!!! Gồm: 1 Bắp (69oz) + 1 Nước có gaz (22oz)
        </p>
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <span className="text-[14px] text-[#4A4A4A] font-medium">68.000 ₫</span>
      </div>
      <div className="col-span-2 flex justify-center gap-[15px] items-center text-[14px] text-[#4A4A4A] font-medium">
        <div className="w-[25px] cursor-pointer h-[25px] flex justify-center items-center rounded-full border-[1px] border-[rgba(0,0,0,0.1)]">
          <svg
            className="w-[8px] h-[8px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
            ></path>
          </svg>
        </div>
        <span>0</span>
        <div className="w-[25px] cursor-pointer h-[25px] flex justify-center items-center rounded-full border-[1px] border-[rgba(0,0,0,0.1)]">
          <svg
            className="w-[8px] h-[8px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ConcessionCard;
