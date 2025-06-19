import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../../components/customer/header/Header'
import Banner from '../../../components/customer/booking/banner/Banner'
import Information from '../../../components/customer/booking/information/Information'
import Footer from '../../../components/customer/footer/Footer'
import { getMovieDetail } from '../../../utils/api'

const Booking = () => {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    if (!movieId) return
    getMovieDetail(movieId)
      .then((res) => setMovie(res.data.data))
      .catch((err) => console.error(err))
  }, [movieId])

  return (
    <div>
        <Header />
        <Banner movie={movie} />
        <Information movie={movie} movieId={movieId} />
           <Footer />
    </div>
  )
}

export default Booking
