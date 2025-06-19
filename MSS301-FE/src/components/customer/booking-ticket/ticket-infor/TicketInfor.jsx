import React from "react";

const TicketInfor = () => {
  return (
    <div className="col-span-1 xl:pl-4 xl:order-none order-first py-4">
      <div className="mb-4">
        <div className="h-[6px] bg-[#F58020] rounded-t-lg"></div>
        <div className="bg-white p-4 grid grid-cols-3 gap-2 items-center">
          <div className="row-span-2 block">
            <img
              alt="Bí Kíp Luyện Rồng"
              width="100"
              height="150"
              className="w-full rounded-[.375rem]"
              src="https://cdn.galaxycine.vn/media/2025/2/17/bi-kip-luyen-rong-500_1739776695143.jpg"
            ></img>
          </div>
          <div class="flex-1 col-span-2 row-span-1">
            <h3 class="font-nunito-sans text-[16px] text-[#4A4A4A] font-bold mb-2">
              Bí Kíp Luyện Rồng
            </h3>
            <div className="flex items-center gap-1 mt-4">
              <p className="text-[14px] font-nunito-sans text-[#4A4A4A]">
                2D Phụ Đề
              </p>
              <span className="text-[14px] font-nunito-sans text-[#4A4A4A]">
                -
              </span>
              <div className="w-[38px] font-nunito-sans h-7 rounded-[.375rem] flex justify-center items-center bg-[rgba(245,128,32,1)] font-medium text-white">
                K
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <div>
              <div className="flex gap-2 text-[16px] font-nunito-sans mt-4">
                <h4 className="font-bold text-[#4A4A4A]">Galaxy ÉP BÊ TÊ</h4>
                <span>-</span>
                <p className="font-light text-[#4A4A4A">RAP 7</p>
              </div>
              <div className="mt-2 flex gap-x-1 text-[#4A4A4A]">
                <div className="flex gap-x-1 text-[16px] font-nunito-sans">
                  <span>Suất:</span>
                  <span className="font-bold">22:00</span>
                </div>
                <span>-</span>
                <div className="flex gap-x-1 text-[14px]">
                  <span>Thứ Tư,</span>
                  <span className="font-bold">18/06/2025</span>
                </div>
              </div>
            </div>
            <div className="my-4 border-t border-grey-60 border-dashed xl:block hidden"></div>
          </div>
          <div className="col-span-3 font-nunito-sans flex justify-between">
            <h4 className="font-bold text-[#4A4A4A] text-[16px]">Tổng cộng</h4>
            <h5 className="font-bold text-[16px] text-[#F58020]">0đ</h5>
          </div>
        </div>
        <div className="mt-8 flex">
          <button class="w-1/2 mr-2 py-2 text-[#F58020] cursor-pointer">
            <span>Quay lại</span>
          </button>
          <button class="w-1/2 ml-2 py-2 cursor-pointer  bg-[#F58020] text-white border rounded-md">
            <span>Tiếp tục</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketInfor;
