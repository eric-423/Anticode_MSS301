import React, { useEffect, useState } from 'react'
import FilmNav from './film-nav/FilmNav'
import FilmCard from './film-card/FilmCard'
import { getMovies } from '../../../../utils/api'
import LIST_TYPE_FILM from '../../../../utils/list-type-film'
import { MOVIE_STATUS } from '../../../../utils/status'

const Film = () => {
  const [itemActive, setItemActive] = useState(
    LIST_TYPE_FILM.LIST_TYPE_FILM_MAIN[0]
  )
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const statusMap = {
      'Đang Chiếu': MOVIE_STATUS.NOW_SHOWING,
      'Sắp Chiếu': MOVIE_STATUS.COMING_SOON,
    }
    const status = statusMap[itemActive.name] || MOVIE_STATUS.NOW_SHOWING
    getMovies({ status })
      .then((res) => setMovies(res.data.data.content || []))
      .catch((err) => console.error(err))
  }, [itemActive])
  console.log(movies)

  return (
    <div className="w-[1280px] mx-auto px-[16px] pt-[24px] pb-[48px] ">
      <FilmNav itemActive={itemActive} onChange={setItemActive} />
      <section className="grid grid-cols-4 gap-6  mb-10">
        {movies.map((movie) => (
          <FilmCard key={movie.id} movie={movie} />
        ))}
      </section>
      <div className="h-[51px] flex justify-center">
        <div className="cursor-pointer text-[#f26b38] hover:text-white w-40 border border-[#fb9440] hover:bg-[#fb9440] transition-all duration-300 rounded text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 justify-center">
          Xem Thêm
        </div>
      </div>
    </div>
  )
}

export default Film
