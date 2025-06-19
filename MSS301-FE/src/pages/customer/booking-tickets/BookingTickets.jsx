import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Header from '../../../components/customer/header/Header'
import Footer from '../../../components/customer/footer/Footer'
import Body from '../../../components/customer/booking-ticket/Body'

const BookingTickets = () => {
  const { movieId } = useParams()
  const [searchParams] = useSearchParams()
  const showtimeId = searchParams.get('showtimeId')

  return (
    <div>
        <Header />
        <Body movieId={movieId} showtimeId={showtimeId} />
        <Footer />
    </div>
  )
}

export default BookingTickets