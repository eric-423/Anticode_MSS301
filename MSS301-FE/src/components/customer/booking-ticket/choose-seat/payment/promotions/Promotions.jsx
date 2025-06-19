import React, { useState } from "react";

const Promotions = () => {
  const [active, setActive] = useState(true);

  return (
    <div className="bg-white p-4 font-nunito-sans">
      <h3 className="text-[18px] text-[#4A4A4A] font-semibold">Khuyến mãi</h3>
      <div className="mt-4">
        <div className="w-[68%] grid grid-cols-2 items-end">
          <div className="col-span-1">
            <p className="mb-1 text-[14px] text-[#333333] font-bold">
              Mã khuyến mãi
            </p>
            <input
              type="text"
              className="border-[1px] text-[14px] border-[rgba(0,0,0,0.1)] w-full py-2 px-4 focus:border-[1px] focus:border-[rgba(0,0,0,0.1)] outline-0"
            />
          </div>
          <div className="col-span-1 text-[14px]">
            <button class="w-1/2 ml-2 py-2 cursor-pointer h-[full]  bg-[#F58020] text-white border rounded-md">
              <span>Áp dụng</span>
            </button>
          </div>
          <p className="col-span-2 text-[12px] text-[#777777] mt-2">
            Lưu ý: Có thể áp dụng nhiều vouchers vào 1 lần thanh toán
          </p>
        </div>
      </div>
      <div className="my-4">
        <p className="mb-1 text-[14px] text-[#333333] font-bold">
          Khuyến mãi của bạn
        </p>
      </div>
      <div className="mt-8 mb-4">
        <p className="mb-1 text-[14px] text-[#333333] font-bold flex items-center gap-1.5">
          Áp dụng điểm Stars
          <div
            className="cursor-pointer"
            onClick={() => setActive((prev) => !prev)}
          >
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
              ></path>
            </svg>
          </div>
        </p>
        <div
          className="block mt-4 transition-all ease-in-out duration-500 h-0 opacity-0"
          style={{
            height: active && "250px",
            opacity: active && 1,
          }}
        >
          <div className="w-[68%] grid grid-cols-2 items-end">
            <div className="col-span-1">
              <input
                type="text"
                className="border-[1px] text-[14px] border-[rgba(0,0,0,0.1)] w-full py-2 px-4 focus:border-[1px] focus:border-[rgba(0,0,0,0.1)] outline-0"
              />
            </div>
            <div className="col-span-1 text-[14px]">
              <button class="w-1/2 ml-2 py-2 cursor-pointer h-[full]  bg-[#F58020] text-white border rounded-md">
                <span>Áp dụng</span>
              </button>
            </div>
            <p className="col-span-2 text-[12px] text-[#777777] mt-2">
              Bạn đang có 0 điểm Stars
            </p>
          </div>
          <div class="mt-2 text-sm text-[#4A4A4A]">
            <h3>Lưu ý</h3>
            <p>
              Điểm Stars có thể quy đổi thành tiền để mua vé hoặc bắp/nước tại
              các cụm rạp Galaxy Cinema.
            </p>
            <ul className="pl-10">
              <li>1 Stars = 1,000 VNĐ</li>
              <li>
                Stars quy định trên 1 giao dịch: tối thiểu là 20 điểm và tối đa
                là 100 điểm.
              </li>
            </ul>
            <p>
              Stars là điểm tích lũy dựa trên giá trị giao dịch bởi thành viên
              giao dịch tại Galaxy Cinema. Cơ chế tích lũy stars, như sau:
            </p>
            <ul className="pl-10">
              <li>Thành viên Star: 3% trên tổng giá trị/ số tiền giao dịch.</li>
              <li>
                Thành viên G-Star: 5% trên tổng giá trị/ số tiền giao dịch.
              </li>
              <li>
                Thành viên X-Star: 10% trên tổng giá trị/ số tiền giao dịch.
              </li>
            </ul>
            <p>
              Ví dụ: hóa đơn giao dịch của khách hàng là 100,000 VNĐ, hạng thành
              viên Star. Số stars tích được sẽ là 5 stars, tương đương với 5,000
              VNĐ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
