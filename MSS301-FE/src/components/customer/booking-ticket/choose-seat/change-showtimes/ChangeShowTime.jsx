import React from "react";

const ChangeShowTime = ({ showtimes = [], currentId, onSelect }) => {
  return (
    <div className="bg-white px-6 py-4 rounded mb-8 w-[100%] font-nunito-sans">
      <div className="grid grid-cols-10 items-center">
        <div className="col-span-2">
          <span className="font-semibold mt-2 text-[16px] text-[#4A4A4A]">
            Đổi suất chiếu
          </span>
        </div>
        <div className="col-span-8 flex flex-wrap gap-4">
          {showtimes.map((st) => (
            <div
              key={st.id}
              className="cursor-pointer py-2 px-4 border-[rgba(0,0,0,0.1)] transition-all duration-500 ease-in-out border-[1px] rounded text-[14px] text-[#333333] hover:bg-[rgb(3,78,162)] hover:text-[#FFFFFF]"
              style={{
                backgroundColor: currentId === st.id ? "rgb(3, 78, 162)" : null,
                color: currentId === st.id ? "#FFFFFF" : null,
              }}
              onClick={() => onSelect && onSelect(st.id)}
            >
              {st.startTime?.slice(11, 16)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChangeShowTime;
