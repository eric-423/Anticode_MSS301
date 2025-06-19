import React from 'react'

const SignSeat = () => {
  return (
      <div className="w-full">
        <div className="flex justify-center items-center gap-5  font-nunito-sans text-[14px] text-[#4A4A4A]">
          <div className="flex items-center gap-2">
            <div className="w-[20px] h-[20px] bg-[#F58020]"></div>
            <span>Ghế bạn chọn</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[20px] h-[20px] bg-[#DFDFDF]">
              <img
                className="w-full h-full"
                src="https://cdn.moveek.com/build/images/seat-unavailable.6c1ab33c.png"
              />
            </div>
            <span>Không thể chọn</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-[20px] h-[20px]"
              style={{
                background:
                  "repeating-linear-gradient(45deg, hsla(0, 0%, 60%, .4), hsla(0, 0%, 60%, .4) 10px, hsla(0, 0%, 60%, .6) 0, hsla(0, 0%, 60%, .6) 20px)",
              }}
            ></div>
            <span>Đã bán</span>
          </div>
        </div>
      </div>
  )
}

export default SignSeat