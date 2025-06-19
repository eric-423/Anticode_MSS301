import React, { useState } from "react";
import LIST_BOOKING_PROCESS from "../../../../utils/list-booking-process";

const ProgressBar = () => {
  const [stepActive, setStepActive] = useState(2);

  return (
    <ul className=" w-full h-[74px] bg-white flex  justify-center items-center flex-nowrap mb-8">
      {LIST_BOOKING_PROCESS.map((item) => (
        <li className="pt-4 mb-4 pl-0">
          <button
            style={{
              color:
                item.step < stepActive
                  ? "rgba(3,78,162,0.6)"
                  : item.step === stepActive
                  ? "rgba(3,78,162,1)"
                  : null,
            }}
            className="cursor-pointer mx-3 text-[#D0D0D0] text-[16px] font-semibold font-nunito-sans"
          >
            {item.name}
          </button>
          <div
            class="relative mt-4 h-[2px] bg-[#E9ECEF]"
            style={{
              backgroundColor: item.step <= stepActive ? "rgb(3,78,162)" : null,
            }}
          ></div>
        </li>
      ))}
    </ul>
  );
};

export default ProgressBar;
