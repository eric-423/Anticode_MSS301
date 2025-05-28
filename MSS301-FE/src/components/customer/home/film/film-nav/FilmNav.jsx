import React, { useState } from "react";
import LIST_TYPE_FILM from "../../../../../utils/list-type-film";

const FilmNav = () => {
  const [itemActive, setItemActive] = useState(LIST_TYPE_FILM.LIST_TYPE_FILM_MAIN[0]);
  return (
    <div className="flex items-center h-[30px] mb-10">
      <div className="flex items-center">
        <div className="w-[4px] h-[22px] bg-[rgb(3,78,162)] mr-2"></div>
        <h1 className="font-nunito-sans font-bold text-xl text-start text-[#4A4A4A] mr-10">
          PHIM
        </h1>
      </div>
      <div>
        <ul className="flex mb-0 list-none flex-wrap flex-row">
          {LIST_TYPE_FILM.LIST_TYPE_FILM_MAIN.map((item) => (
            <li
              className="mr-8 cursor-pointer relative"
              onClick={() => setItemActive(item)}
            >
              <span
                className="text-[#333333] opacity-50 text-[16px] font-semibold hover:text-[#034EA2]"
                style={{
                  opacity: itemActive === item ? 1 : 0.5,
                  color: itemActive === item ? "#034EA2" : null,
                }}
              >
                {item.name}
              </span>
              {itemActive === item && (
                <div className="absolute top-[115%] w-[30%] h-[2px] bg-[#034EA2] left-[50%] translate-x-[-50%]"></div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilmNav;
