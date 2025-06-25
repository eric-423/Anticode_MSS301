import React, { useEffect } from "react";
import MovieItem from "./movie-item/MovieItem";
import { getMovies } from "../../../../../utils/api";

const MovieShowing = () => {
  const [nowShowingMovies, setNowShowingMovies] = React.useState([]);

  useEffect(() => {
    getMovies({ status: "NOW_SHOWING" })
      .then((res) => {
        setNowShowingMovies(res.data?.data?.content || []);
      })
      .catch((error) => {
        console.error("Error fetching movies currently showing:", error);
      });
  }, [])


  return (
    <div className="col-span-2">
      <div className="flex items-center mb-4">
        <div className="w-[4px] h-[22px] bg-[rgb(3,78,162)] mr-2"></div>
        <h1 className="font-nunito-sans font-medium text-[20px] text-start text-[#4A4A4A] mr-10">
          PHIM ĐANG CHIẾU
        </h1>
      </div>
      <div className="grid gap-7">
        <MovieItem item={nowShowingMovies[0]} />
        <MovieItem item={nowShowingMovies[1]} />
        <MovieItem item={nowShowingMovies[2]} />
        <MovieItem item={nowShowingMovies[3]} />
        <div className="flex justify-end">
          <div className="cursor-pointer text-[#f26b38] hover:text-white w-40 border border-[#fb9440] hover:bg-[#fb9440] transition-all duration-300 rounded text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2 justify-center">
            Xem Thêm
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieShowing;
