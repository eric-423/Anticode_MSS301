import React from "react";

const BookingSuccess = () => (
      <div className="bg-white p-10 shadow-2xl rounded mb-8">
            <div className="text-center">
                  <img
                        alt="Img Success"
                        width="80"
                        height="80"
                        className="w-[80px] h-[80px] inline object-cover"
                        src="https://www.galaxycine.vn/_next/static/media/booking-fail.0c03e999.png"
                        style={{ color: "transparent" }}
                  />
                  <h4 className="mt-4 mb-3 font-bold text-xl text-black-10 not-italic">
                        Đặt vé thành công
                  </h4>
                  <p className="font-normal text-sm not-italic text-black-10 text-center">
                        Quý khách vui lòng kiểm tra lại thông tin đặt vé và thanh toán để hoàn tất đơn hàng.
                  </p>
                  <a
                        className="text-white w-44 border bg-[#fb9440] cursor-pointer rounded text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#fb9440] dark:focus:ring-[#fb9440] justify-center mt-6"
                        href="/"
                  >
                        Quay Về Trang Chủ
                  </a>
            </div>
      </div>
);

export default BookingSuccess;