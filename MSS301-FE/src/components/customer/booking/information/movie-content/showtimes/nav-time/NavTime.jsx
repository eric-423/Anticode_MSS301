import React, { useEffect, useState } from "react";

const NavTime = ({ onSelectDate }) => {
  const generateDays = () => {
    const days = [];
    const weekdays = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    for (let i = 0; i < 7; i += 1) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      const dayLabel = i === 0 ? "Hôm Nay" : weekdays[date.getDay()];
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      days.push({
        day: dayLabel,
        date: `${dd}/${mm}`,
        fullDate: `${dd}/${mm}/${yyyy}`,
      });
    }
    return days;
  };

  const [showTimes] = useState(generateDays());

  const [activeDay, setActiveDay] = useState(showTimes[0]);

  useEffect(() => {
    if (onSelectDate) {
      onSelectDate(activeDay.fullDate);
    }
  }, [activeDay, onSelectDate]);

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
