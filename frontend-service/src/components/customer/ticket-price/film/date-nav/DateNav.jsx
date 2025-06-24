import React, { useState } from "react";
import { format, addDays } from "date-fns";
import vi from "date-fns/locale/vi"; // dùng cho tiếng Việt

// Hàm chuyển ngày thành thứ (Thứ Hai, Thứ Ba, ...)
const getLabel = (date, index) => {
  const today = new Date();
  if (index === 0) return "Hôm Nay";

  const weekday = format(date, "EEEE", { locale: vi }); // dạng: "Thứ năm"
  return weekday.charAt(0).toUpperCase() + weekday.slice(1); // viết hoa chữ đầu
};

const DateNav = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const today = new Date();

  // Tạo danh sách 8 ngày từ hôm nay
  const dates = Array.from({ length: 8 }, (_, i) => {
    const date = addDays(today, i);
    return {
      label: getLabel(date, i),
      date: format(date, "dd/MM"),
    };
  });

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <span className="w-1 h-5 bg-blue-700 mr-2"></span>
        PHIM
      </h3>

      <div className="flex justify-center">
        <div className="flex gap-4 overflow-x-auto">
          {dates.map((item, index) => (
            <div
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`cursor-pointer text-center px-4 py-2 rounded 
          ${selectedIndex === index ? "bg-blue-700 text-white" : "text-gray-700"}
          transition duration-200 min-w-[80px]`}
            >
              <div>{item.label}</div>
              <div className="text-sm">{item.date}</div>
            </div>
          ))}
        </div>
      </div>


      <div className="h-1 bg-blue-700 mt-4" />
    </div>
  );
};

export default DateNav;
