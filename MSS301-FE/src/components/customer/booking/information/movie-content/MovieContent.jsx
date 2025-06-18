import React from 'react'
import MovieIntro from './movie-intro/MovieIntro'
import ContentDetail from './content-detail/ContentDetail'
import ShowTimes from './showtimes/ShowTimes'

const MovieContent = () => {
  return (
    <div className='col-span-5'>
        <MovieIntro />
        <ContentDetail />
        <ShowTimes />
    </div>
  )
}

export default MovieContent