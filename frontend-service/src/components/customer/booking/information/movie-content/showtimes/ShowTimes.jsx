import React, { useState, useCallback } from 'react'
import NavTime from './nav-time/NavTime'
import { getShowtimesByMovieDate } from '../../../../../../utils/api'

const ShowTimes = ({ movieId }) => {
  const [listShowTimes, setListShowTimes] = useState([])

  // 2. Bọc hàm handleSelectDate trong useCallback
  const handleSelectDate = useCallback(
    (date) => {
      if (!movieId) return
      getShowtimesByMovieDate(movieId, date)
        .then((res) => setListShowTimes(res.data.data || []))
        .catch((err) => console.error(err))
    },
    [movieId]
  )

  return (
    <div className="mt-[8pt]">
      <div className="flex items-center mb-4">
        <div className="w-[4px] h-[22px] bg-[rgb(3,78,162)] mr-2"></div>
        <h1 className="font-nunito-sans text-[16px] text-start text-[#4A4A4A] mr-10 font-bold">
          Lịch Chiếu
        </h1>
      </div>

      <NavTime onSelectDate={handleSelectDate} />
      <div className="my-4 w-full h-[2px] bg-[#034ea2]"></div>
      <div className="py-8 px-3">
        <h1 className="font-nunito-sans mb-4 text-[16px] font-bold text-[#4A4A4A]">
          Galaxy ÉP BÊ TÊ
        </h1>
        <div className=" flex">
          <div className="w-[150px]"></div>
          <div className="flex flex-1 flex-row gap-x-3 gap-y-1 flex-wrap">
            {listShowTimes.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer py-2 px-8 text-[14px] text-[#333333] border rounded-lg border-[rgba(0,0,0,0.1)] hover:bg-[#034ea2] hover:text-white transition-all duration-500 ease-in-out"
              >
                {item.startTime?.slice(11, 16)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowTimes
