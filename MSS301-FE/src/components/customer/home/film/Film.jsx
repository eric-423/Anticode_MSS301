import React from "react";
import FilmNav from "./film-nav/FilmNav";
import FilmCard from "./film-card/FilmCard";

const Film = () => {
  return (
    <div className="w-[1280px] mx-auto px-[16px] pt-[24px] pb-[48px] ">
      <FilmNav />
      <section className="grid grid-cols-4 gap-6  mb-10">
        <FilmCard />
        <FilmCard />
        <FilmCard />
        <FilmCard />
        <FilmCard />
        <FilmCard />
        <FilmCard />
        <FilmCard />
      </section>
      <div className="h-[51px] flex justify-center">
        <div className="cursor-pointer text-[#f26b38] hover:text-white w-40 border border-[#fb9440] hover:bg-[#fb9440] transition-all duration-300 rounded text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 justify-center">Xem Thêm</div>
      </div>
    </div>
  );
};

export default Film;
