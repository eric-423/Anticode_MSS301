import React from "react";
import Poster from "./poster/Poster";
import InformationDetail from "./information-detail/InformationDetail";

const MovieIntro = ({ movie }) => {
  return (
    <div className="w-full grid grid-cols-3 gap-5 h-[400px]">
      <Poster movie={movie} />
      <InformationDetail movie={movie} />
    </div>
  );
};

export default MovieIntro;
