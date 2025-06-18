import React, { useState } from "react";

const NavTime = () => {
  const [showTimes, setShowTimes] = useState([
    {
      day: "Hôm Nay",
      date: "18/06",
    },
    {
      day: "Thứ Năm",
      date: "19/06",
    },
    {
      day: "Thứ Sáu",
      date: "20/06",
    },
    {
      day: "Thứ Bảy",
      date: "21/06",
    },
    {
      day: "Chủ Nhật",
      date: "22/06",
    },
    {
      day: "Thứ Hai",
      date: "23/06",
    },
    {
      day: "Thứ Ba",
      date: "24/06",
    },
  ]);

  const [activeDay, setActiveDay] = useState(showTimes[0]);

  return (
    <div className=" w-full">
      <div className="flex gap-5">
        {showTimes.map((item) => (
          <div
            className={`w-[80px] cursor-pointer h-[65px] text-[#4a4a4a] bg-[rgba(0,0,0,0.05)] font-medium rounded-[5px] font-nunito-sans flex flex-col gap-[4px] justify-center items-center`}
            style={{
              backgroundColor: activeDay === item ? "#034ea2" : null,
              color:   activeDay === item ? "#FFFFFF" : null,
            }}
            onClick={() => setActiveDay(item)}
          >
            <span className="text-[14px]">{item.day}</span>
            <span className="text-[14px]">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavTime;
