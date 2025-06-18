import React from "react";

const ContentDetail = () => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="w-[4px] h-[22px] bg-[rgb(3,78,162)] mr-2"></div>
        <h1 className="font-nunito-sans text-[16px] text-start text-[#4A4A4A] mr-10 font-bold">
          Nội Dung Phim
        </h1>
      </div>

      <div className="font-nunito-sans text-[14px]">
        <p className="text-[#333333]">
          Câu chuyện về một chàng trai trẻ với ước mơ trở thành thợ săn rồng,
          nhưng định mệnh lại đưa đẩy anh đến tình bạn bất ngờ với một chú rồng.
        </p>
        <p className="text-[#333333] my-[8pt]">
          Giống như bộ phim hay gốc từ năm 2010, Bí Kíp Luyện Rồng phiên bản
          live-action lần này diễn ra trên Đảo Berk, nơi người Viking và rồng đã
          là kẻ thù không đội trời chung trong nhiều thế hệ. Nhưng khi Hiccup
          (Mason Thames) – con trai của Tù trưởng Stoick the Vast đi ngược lại
          truyền thống hàng thế kỷ để kết bạn với Toothless - một con rồng Night
          Fury, chính giây phút đó anh ấy đã phá vỡ quy tắc vốn có của cộng đồng
          và mở ra sự căng thẳng tột cùng cho cả người Viking và rồng.
        </p>
        <p className="text-[#333333]">
          Phim mới How to Train Your Dragon / Bí Kíp Luyện Rồng suất chiếu sớm
          12.06 (Không áp dụng Movie Voucher), khởi chiếu chính thức 13.06.2025
          tại các rạp chiếu phim toàn quốc.
        </p>
      </div>
    </div>
  );
};

export default ContentDetail;
