import React from "react";

const Title = ({ movie }) => {
  return (
    <div className="flex items-center">
      <h1 className="text-[20px] md:text-[24px] lg:text-[28px] font-semibold text-[#333333] mr-4 font-nunito-sans">
        {movie?.title || ''}
      </h1>
      <div className="w-[38px] font-nunito-sans h-7 rounded-[.375rem] flex justify-center items-center bg-[rgba(245,128,32,1)] font-medium text-white">
        {movie?.ageRanging ? `T${movie.ageRanging}` : 'K'}
      </div>
    </div>
  );
};

export default Title;
