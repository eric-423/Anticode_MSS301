import React, { useState } from 'react'
import IMAGES from '../../../../../utils/images'

const FilmCard = ({ movie }) => {
  const [activeHover, setActiveHover] = useState(false)

  return (
    <div className="py-2 relative">
      <div
        className="w-[140px] h-[200px] rounded-[.375rem] relative overflow-hidden"
        onMouseEnter={() => setActiveHover(true)}
        onMouseLeave={() => setActiveHover(false)}
      >
        <img src={movie.imageUrl || IMAGES.muaLua} />
        <div className="absolute py-[.75rem] px-[2.8rem] bg-[rgba(0,0,0,0.4)] skew-x-[25deg] bottom-[40px] right-[-10px]">
          <span className="absolute skew-x-[-25deg] top-[50%] translate-y-[-50%] right-[20px] text-white font-nunito-sans">
            9.5
          </span>
        </div>
        {activeHover && (
          <div className="absolute top-0 left-0 flex justify-center items-center w-[100%] h-[100%] bg-[rgba(0,0,0,0.4)] "
            onClick={() => {
              console.log('clicked movie', movie.id);
              window.location.href = `/booking/${movie.id}`;
            }}
          >
            <div className="bg-(--color-elevated-button) py-2.5 px-5 flex gap-2 rounded-[.375rem]  w-max">
              <img className="relative" src={IMAGES.ticketHover} />
              <span className="text-white relative">Mua vé</span>
            </div>
          </div>
        )}
      </div>
      <p className="w-[140px] line-clamp-2 text-[14px] text-[#333333] font-nunito-sans mt-2 font-[600]">
        {movie.title || movie.name || ''}
      </p>
    </div>
  );
};

export default FilmCard;
