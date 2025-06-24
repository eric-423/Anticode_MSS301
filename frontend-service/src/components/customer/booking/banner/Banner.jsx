import React from "react";
import IMAGES from "../../../../utils/images";

const Banner = ({ movie }) => {
  return (
    <div className="h-[500px] bg-black w-full relative flex justify-center">
      <div className="w-[860px] bg-gray-300 h-full relative">
        <div className="absolute top-0 -left-[0%] z-100 h-full">
          <img src={IMAGES.blurLeft} className="h-full" />
        </div>
        <div className="absolute top-0 -right-[0%] z-100 h-full">
          <img src={IMAGES.blurRight} className="h-full" />
        </div>
        <div className="relative overflow-hidden h-full">
          <img
            alt="Img Movie"
            width="1440"
            height="440"
            className='w-[860px] h-full duration-500 ease-in-out'
            src={movie?.imageUrl || "https://cdn.galaxycine.vn/media/2025/2/17/bi-kip-luyen-rong-750_1739776701532.jpg"}
          />
          <div className="absolute w-full h-full bg-[rgba(0,0,0,0.15)] left-0 top-0 flex justify-center items-center">
                <div className="w-[64px] h-[64px]">
                    <img src={IMAGES.buttonPlay} className="w-full h-full cursor-pointer" />
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
