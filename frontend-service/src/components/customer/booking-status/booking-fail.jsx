import React from "react";

const BookingFail = () => (
    <div className="bg-white p-10 shadow-2xl rounded mb-8">
        <div className="text-center">
            <img
                alt="Img Fail"
                width="80"
                height="80"
                className="w-[80px] h-[80px] inline object-cover"
                src="https://www.galaxycine.vn/_next/static/media/booking-fail.0c03e999.png"
                style={{ color: "transparent" }}
            />
            <h4 className="mt-4 mb-3 font-bold text-xl text-black-10 not-italic">
                Xuất vé thất bại
            </h4>
            <p className="font-normal text-sm not-italic text-black-10 text-center">
                Việc phản hồi tới quý khách có thể bị chậm trễ, mong quý khách thông cảm và kiên nhẫn cùng nhân viên CSKH của Galaxy Cinema
            </p>
            <p className="font-normal text-sm not-italic text-black-10 text-center my-4">
                Trường hợp giao dịch chưa thành công, quý khách vui lòng không thực hiện giao dịch online lần nữa và tới rạp Galaxy Cinema gần nhất để mua vé.
            </p>
            <p className="font-normal text-sm not-italic text-black-10 text-center">
                Chúng tôi cam kết sẽ hoàn lại 100% giá trị giao dịch lỗi đã bị trừ tiền sau khi đội ngũ CSKH kiểm tra và xác nhận. Vui lòng gởi thông tin giao dịch lỗi về email
                <a className="text-blue-10" href="mailto:supports@galaxystudio.vn"> supports@galaxystudio.vn</a>
                hoặc tin nhắn trang fanpage
                <a className="text-blue-10" href="https://www.facebook.com/galaxycinevn" target="_blank" rel="noopener noreferrer"> https://www.facebook.com/galaxycinevn</a>
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

export default BookingFail;