import React from "react";
import IMAGES from "../../../../../../utils/images";

const MovieItem = ({ item }) => {
  return (
    <div className="w-max-full">
      <div
        className="relative h-[220px] rounded-[.375rem] overflow-hidden cursor-pointer"
      >
        <img
          className="w-[50%] h-full object-cover items-center mx-auto"
          // src="https://cdn.galaxycine.vn/media/2025/2/17/bi-kip-luyen-rong-750_1739776701532.jpg"
          src={item?.imageUrl || IMAGES.defaultMovieImage}
          alt=""
        />
        <div className="bg-[#00000080] w-full h-full absolute top-0 left-0 flex justify-center items-center transition-all duration-300 ease-in-out opacity-0 hover:opacity-100">
          <div className="text-white bg-[#f26b38] cursor-pointer w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center">
            <img className="mr-2" src={IMAGES.ticketHover} />
            <span className="font-nunito-sans">Mua Vé</span>
          </div>
        </div>
      </div>
      <h4 className="mt-[10px] text-[14px] max-h-full line-clamp-1 font-nunito-sans font-semibold text-[rgba(0,0,0,0.8)]">
        {item?.title || "Tên phim chưa cập nhật"}
      </h4>
    </div>
  );
};

export default MovieItem;
