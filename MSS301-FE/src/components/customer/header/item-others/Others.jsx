import React, { useState } from "react";

const Others = ({ item }) => {
  const [itemHover, setItemHover] = useState();

  return (
    <div
      className="px-[5px] py-2 absolute bg-white top-[100%] left-[-45px] translate-y-[20px] rounded-[.375rem] flex flex-col gap-5 z-50"
      style={{
        boxShadow:
          "0 6px 16px 0 rgba(0,0,0,.08), 0 3px 6px -4px rgba(0,0,0,.12), 0 9px 28px 8px rgba(0,0,0,.05)",
      }}
    >
      <ul className="min-w-[190px] w-max">
        {item?.sub_items.map((item) => (
          <li
            className="text-[14px] text-[#000000] py-[8px] flex relative "
            onMouseEnter={() => setItemHover(item)}
            onMouseLeave={() => setItemHover()}
             style={{
                backgroundColor:
                  item === itemHover ? "#fb770b1a" : null,
              }}
          >
            <div
              className="flex gap-[10px] w-full "
             
            >
              {item === itemHover ? (
                <div className="w-[2px] h-[100%] bg-(--color-elevated-button)"></div>
              ) : null}
              <p
                className="text-center w-[100%]"
                style={{
                  color:
                    item === itemHover ? "var(--color-elevated-button)" : null,
                }}
              >
                {item.name}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Others;
