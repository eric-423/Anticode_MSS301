import React from "react";

const Rating = () => {
  return (
    <div className="mt-2">
      <a class="text-[20px] hover:text-primary transition duration-500 ease-in-out cursor-pointer flex items-center">
        <svg
          aria-hidden="true"
          className="w-[22.5px] text-primary mr-1 hover:text-primary translate-y-[-2px] transition duration-500 ease-in-out"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
        >
          <path
            fill="rgb(245,128,32)"
            d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
          ></path>
        </svg>
        <div className="flex items-baseline">
          <span class="mr-1 font-nunito-sans text-[20px] text-[#4a4a4a]">9.5</span>
          <span class="inline-block text-sm text-[#777777] hover:text-primary transition duration-500 ease-in-out font-nunito-sans">
            (129 votes)
          </span>
        </div>
      </a>
    </div>
  );
};

export default Rating;
