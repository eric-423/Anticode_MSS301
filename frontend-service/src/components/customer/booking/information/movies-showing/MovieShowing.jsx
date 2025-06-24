import React from "react";
import MovieItem from "./movie-item/MovieItem";

const MovieShowing = () => {
  return (
    <div className="col-span-2">
      <div className="flex items-center mb-4">
        <div className="w-[4px] h-[22px] bg-[rgb(3,78,162)] mr-2"></div>
        <h1 className="font-nunito-sans font-medium text-[20px] text-start text-[#4A4A4A] mr-10">
          PHIM ĐANG CHIẾU
        </h1>
      </div>
      <div className="grid gap-7">
        <MovieItem />
        <MovieItem />
        <MovieItem />
        <div className="flex justify-end">
          <div className="cursor-pointer text-[#f26b38] hover:text-white w-40 border border-[#fb9440] hover:bg-[#fb9440] transition-all duration-300 rounded text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 justify-center">
            Xem Thêm
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieShowing;
