import React from "react";
import FilmCard from "./film-card/FilmCard";
import LIST_TYPE_FILM from "../../../../utils/list-type-film";

const Film = () => {
  return (
    <div
      className="px-6 py-4 absolute bg-white top-[100%] left-[-45px] translate-y-[20px] z-50 rounded-[.375rem] flex flex-col gap-5"
      style={{
        boxShadow:
          "0 6px 16px 0 rgba(0,0,0,.08), 0 3px 6px -4px rgba(0,0,0,.12), 0 9px 28px 8px rgba(0,0,0,.05)",
      }}
    >
      {LIST_TYPE_FILM.LIST_TYPE_FILM_HOVER.map((item) => (
        <div className="relative">
          <div className="flex gap-[8px]">
            <div className="w-[4px] h-[22px] bg-[#034ea2]"></div>
            <h4 className="text-[15px] font-nunito-sans text-[#333333] ">
              {item.name}
            </h4>
          </div>
          <div className="relative flex gap-5">
            <FilmCard />
            <FilmCard />
            <FilmCard />
            <FilmCard />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Film;
