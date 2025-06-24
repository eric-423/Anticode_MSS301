import React, { useState } from 'react'
import IMAGES from '../../../../../utils/images'
import { useNavigate } from "react-router-dom";

const FilmCard = ({ movie = {} }) => {
  const [hover, setHover] = useState(false)
  const navigate = useNavigate();

  return (
    <div className="h-[500px] relative">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="w-[290px] h-[435px] relative flex left-[50%] translate-x-[-50%] rounded-[10px] overflow-hidden"
      >
        <img
          className="object-cover"
          src={movie.imageUrl || IMAGES.thamTuKienPoster}
          alt=""
        />
        <div className="bg-[rgba(0,0,0,0.4)] right-[-5px] absolute w-[100px] h-[24px] skew-x-[25deg] bottom-[40px]">
          <div className="flex justify-end items-center gap-[20px] translate-y-[-2px]">
            <img
              className="skew-x-[-25deg] w-[14px] h-[14px]"
              src={IMAGES.star}
              alt=""
            />
            <p className="skew-x-[-25deg] text-[18px] font-bold text-white mr-[10px]">
              9.5
            </p>
          </div>
        </div>
        <div className="w-[38px] h-[28px] bg-[rgb(245,128,32,1)] absolute flex justify-center items-center rounded-[5px] bottom-[5px] right-[5px]">
          <span className="text-white font-bold font-nunito-sans">T16</span>
        </div>
        {hover && (
          <div className="absolute z-50 flex flex-col justify-center items-center w-full h-full gap-3 hover:bg-[rgba(0,0,0,0.4)] cursor-pointer">
            <div className="text-white bg-[#f26b38] cursor-pointer w-[120px] h-[40px] hover:bg-[#fb9440] rounded text-sm px-5 py-2.5 text-center inline-flex items-center"
              onClick={() => navigate(`/booking/${movie.id}`)}
            >
              <img className="mr-2" src={IMAGES.ticketHover} />
              <span className="font-nunito-sans">Mua Vé</span>
            </div>
            <button
              type="button"
              class="text-white w-[120px] h-[40px] border border-white hover:bg-[#fb9440]/80 hover:border-transparent rounded text-sm px-5 py-2.5 text-center inline-flex items-center cursor-pointer"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="circle-play"
                class="svg-inline--fa fa-circle-play mr-2 w-[14px] h-[14px]"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9V344c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"
                ></path>
              </svg>
              Trailer
            </button>
          </div>
        )}
      </div>
      <div className="mt-2.5">
        <h3 className="line-clamp-2 font-semibold text-[16px] text-[#333333]">
          {movie.title || movie.name || ''}
        </h3>
      </div>
    </div>
  )
}

export default FilmCard
