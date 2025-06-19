import React from "react";

const PaymentMethod = () => {
  return (
    <div className="bg-white p-4 mt-5 font-nunito-sans">
      <h3 className="text-[18px] text-[#4A4A4A] font-semibold">
        Phương thức thanh toán
      </h3>
      <div className="grid grid-cols-2 pt-5 gap-5 px-5">
        <div className="flex cursor-pointer items-center gap-2.5 px-4 py-2 border-[1px] border-[rgba(0,0,0,0.1)] justify-center rounded-[.375rem]">
          <div className="w-[50px] h-[50px]">
            <img src="https://cdn.galaxycine.vn/media/2021/12/2/download_1638460623615.png" />
          </div>
          <p className="text-[16px] text-[#4A4A4A] ">VNPAY</p>
        </div>
        <div className="flex cursor-pointer items-center gap-2.5 px-4 py-2 border-[1px] border-[rgba(0,0,0,0.1)] justify-center rounded-[.375rem]">
          <div className="w-[50px] h-[50px]">
            <img src="https://cdn.galaxycine.vn/media/2020/10/20/momo-icon_1603203874499.png" />
          </div>
          <p className="text-[16px] text-[#4A4A4A] ">Ví Điện Tử MoMo</p>
        </div>
         <div className="flex cursor-pointer items-center gap-2.5 px-4 py-2 border-[1px] border-[rgba(0,0,0,0.1)] justify-center rounded-[.375rem]">
          <div className="w-[50px] h-[50px]">
            <img src="https://play-lh.googleusercontent.com/22cJzF0otG-EmmQgILMRTWFPnx0wTCSDY9aFaAmOhHs30oNHxi63KcGwUwmbR76Msko" />
          </div>
          <p className="text-[16px] text-[#4A4A4A] ">VietQR</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
