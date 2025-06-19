import React from "react";

const ContentDetail = ({ movie }) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="w-[4px] h-[22px] bg-[rgb(3,78,162)] mr-2"></div>
        <h1 className="font-nunito-sans text-[16px] text-start text-[#4A4A4A] mr-10 font-bold">
          Nội Dung Phim
        </h1>
      </div>

      <div className="font-nunito-sans text-[14px]">
        <p className="text-[#333333] whitespace-pre-line">
          {movie?.synopsis || ''}
        </p>
      </div>
    </div>
  );
};

export default ContentDetail;
