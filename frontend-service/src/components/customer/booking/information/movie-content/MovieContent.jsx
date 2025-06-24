import React from 'react'
import MovieIntro from './movie-intro/MovieIntro'
import ContentDetail from './content-detail/ContentDetail'
import ShowTimes from './showtimes/ShowTimes'

const MovieContent = ({ movie, movieId }) => {
  return (
    <div className='col-span-5'>
        <MovieIntro movie={movie} />
        <ContentDetail movie={movie} />
        <ShowTimes movieId={movieId} />
    </div>
  )
}

export default MovieContent
