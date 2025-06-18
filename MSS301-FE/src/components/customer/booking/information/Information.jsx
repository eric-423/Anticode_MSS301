import React from "react";
import MovieContent from "./movie-content/MovieContent";
import MovieShowing from "./movies-showing/MovieShowing";

const Information = () => {
  return (
    <div className="max-w-[1280px] mx-auto px-[16px] py-[28px] grid grid-cols-7 gap-8">
        <MovieContent />
        <MovieShowing />
    </div>
  );
};

export default Information;
