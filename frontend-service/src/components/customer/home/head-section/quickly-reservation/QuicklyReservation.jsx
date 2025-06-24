import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import vi from 'date-fns/locale/vi'
import RESERVATION_STEP from '../../../../../utils/reservation-step'
import {
  getMovies,
  getShowtimesByMovie,
  getShowtimesByMovieDate,
} from '../../../../../utils/api'
import { MOVIE_STATUS } from '../../../../../utils/status'
import { useNavigate } from "react-router-dom";

const QuicklyReservation = () => {
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState('')
  const [dates, setDates] = useState([])
  const [selectedDate, setSelectedDate] = useState('')
  const [showtimes, setShowtimes] = useState([])
  const [selectedShowtime, setSelectedShowtime] = useState('')
  const navigate = useNavigate();



  useEffect(() => {
    getMovies({ status: MOVIE_STATUS.NOW_SHOWING })
      .then((res) => setMovies(res.data.data.content || []))
      .catch((err) => console.error(err))
  }, [])



  useEffect(() => {
    if (!selectedMovie) {
      setDates([])
      setSelectedDate('')
      setShowtimes([])
      setSelectedShowtime('')
      return
    }
    getShowtimesByMovie(selectedMovie)
      .then((res) => setDates(res.data.data || []))
      .catch((err) => console.error(err))
  }, [selectedMovie])

  useEffect(() => {
    if (!selectedMovie || !selectedDate) {
      setShowtimes([])
      setSelectedShowtime('')
      return
    }

    const formattedDate = format(new Date(selectedDate), 'dd/MM/yyyy')

    getShowtimesByMovieDate(selectedMovie, formattedDate)
      .then((res) => setShowtimes(res.data.data || []))
      .catch((err) => console.error(err))
  }, [selectedMovie, selectedDate])

  const formatShowDate = (dateStr) => {
    const d = new Date(dateStr)
    const day = format(d, 'EEEE', { locale: vi })
    const labelDay = day.charAt(0).toUpperCase() + day.slice(1)
    return `${labelDay}, ${format(d, 'dd/MM/yyyy')}`
  }

  const formatShowTime = (start, end) =>
    `${format(new Date(start), 'HH:mm')} - ${format(new Date(end), 'HH:mm')}`

  return (
    <div className="w-[1152px] bg-white overflow-hidden h-full mx-auto shadow-2xl rounded-[.375rem] grid grid-cols-9">
      {RESERVATION_STEP.map((item) => {
        const isStep1 = item.id === '1'
        const isStep2 = item.id === '2'
        const isStep3 = item.id === '3'
        const isDisabled =
          (!selectedMovie && !isStep1) || (isStep3 && !selectedDate)

        return (
          <div
            key={item.id}
            className={`
              ${item.class} flex justify-center items-center pl-[2%] 
              ${isDisabled ? 'opacity-50 pointer-events-none' : ''}
            `}
          >
            <span className="bg-[#f58020] text-[10px] text-white font-bold px-1.5 py-0.5 rounded-full">
              {item.id}
            </span>

            <div className="pl-[8px] cursor-pointer w-ful">

              <span className="font-nunito-sans text-[14px] text-[#4A4A4A] line-clamp-1 pt-[2px]">
                {/* {item.name} */}
              </span>


              {isStep1 && (
                <select
                  className="w-full rounded text-sm outline-none"
                  value={selectedMovie}
                  onChange={(e) => setSelectedMovie(e.target.value)}
                >
                  <option value="">Chọn Phim</option>
                  {movies.map((movie) => (
                    <option key={movie.id} value={movie.id}>
                      {movie.name || movie.title}
                    </option>
                  ))}
                </select>
              )}


              {isStep2 && (
                <select
                  className="w-full rounded text-sm outline-none"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="">Chọn Ngày</option>
                  {dates.map((d, idx) => (
                    <option key={idx} value={d}>
                      {formatShowDate(d)}
                    </option>
                  ))}
                </select>
              )}


              {isStep3 && (
                <select
                  className="w-full rounded text-sm outline-none"
                  value={selectedShowtime}
                  onChange={(e) => setSelectedShowtime(e.target.value)}
                >
                  <option value="">Chọn Suất</option>
                  {showtimes.map((st) => (
                    <option key={st.id} value={st.id}>
                      {formatShowTime(st.startTime, st.endTime)}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        )
      })}


      <div
        className={`relative col-span-2 font-nunito-sans text-[14px] flex justify-center items-center text-white cursor-pointer
        ${(!selectedMovie || !selectedDate || !selectedShowtime) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[rgb(245,128,32,1)]'}`}
        onClick={() => {
          if (selectedMovie && selectedDate && selectedShowtime) {
            navigate(`/booking-ticket/${selectedMovie}?showtimeId=${selectedShowtime}`);
          }
        }}
      >
        Mua Vé Nhanh
      </div>


      {/* <div className="relative col-span-2 bg-[#f8ac6e] 
                      font-nunito-sans text-[14px] flex justify-center items-center 
                      text-white cursor-pointer"
        isDisabled={(!selectedMovie || !selectedDate || !selectedShowtime)}
        onClick={() => navigate(`/booking-ticket/${selectedMovie.id}?showtimeId=${selectedShowtime}`)}
      >
        Mua Vé Nhanh
      </div> */}
    </div>
    // http://localhost:5173/booking-ticket/1?showtimeId=51
  )
}

export default QuicklyReservation
