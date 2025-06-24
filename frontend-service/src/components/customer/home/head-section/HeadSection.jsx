import React from 'react'
import Carousel from './carousel/Carousel'
import QuicklyReservation from './quickly-reservation/QuicklyReservation'

const HeadSection = () => {
  return (
    <div className='relative w-full pt-[25px] mb-[50px]'>
        <Carousel />
        <div className='absolute w-full h-[56px] top-[100%] translate-y-[-50%] mx-auto '>
          <QuicklyReservation />
        </div>
    </div>
  )
}

export default HeadSection;
