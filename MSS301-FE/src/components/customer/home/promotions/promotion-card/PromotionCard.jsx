import React from "react";

const PromotionCard = ({ image, name }) => {
  return (
    <div className="flex-shrink-0 w-[312px] cursor-pointer">
      <div className="px-[20px]">
        <img src={image} />
      </div>
      <h4 className="text-[#4a4a4a] mt-4 px-[10px] text-center font-semibold text-[16px]">
        {name}
      </h4>
    </div>
  );
};

export default PromotionCard;
