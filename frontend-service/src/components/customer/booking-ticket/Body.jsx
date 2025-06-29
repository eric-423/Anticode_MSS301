import React from 'react'
import ProgressBar from './progress-bar/ProgressBar'
import TicketInfor from './ticket-infor/TicketInfor'
import ChooseSeat from './choose-seat/ChooseSeat'
import Concessions from './concessions/Concessions'
import Payment from './choose-seat/payment/Payment'
import BookingFilmDetail from './choose-seat/seat-container/booking-detail/BookingFilmDetail'
import { StudentProvider } from './choose-seat/seat-container/booking-detail/StudentContext'

const Body = ({ movieId, showtimeId }) => {
  return (
    <StudentProvider>
      <div className="bg-[#F9F9F9] pt-[6px]">
        <ProgressBar />
        <div className="grid grid-cols-3 max-w-[1390px] mx-auto gap-5">
          <ChooseSeat movieId={movieId} showtimeId={showtimeId} />
          <BookingFilmDetail />

          {/* <Concessions /> */}
          {/* <Payment /> */}
          {/* <TicketInfor /> */}
        </div>
      </div>
    </StudentProvider>
  )
}

export default Body
