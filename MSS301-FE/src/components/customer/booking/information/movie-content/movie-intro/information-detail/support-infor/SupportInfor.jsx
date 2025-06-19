import React from "react";
import Type from "./type/Type";
import Director from "./director/Director";
import Performer from "./performer/Performer";

const SupportInfor = ({ movie }) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-nowrap text-sm text-[#777777]">
        <span className="h-8 py-[6px]">Quốc gia:</span>
        <span className="h-8 ml-4 py-[6px]">Mỹ</span>
      </div>
      <div className="flex flex-nowrap text-sm text-[#777777]">
        <span className="h-8 py-[6px]">Nhà sản xuất:</span>
        <span className="h-8 ml-4 py-[6px]">DreamWorks</span>
      </div>
      <Type genres={movie?.genres} />
      <Director directors={movie?.personels?.filter((p) => p.role === 'DIRECTOR') || []} />
      <Performer performers={movie?.personels?.filter((p) => p.role === 'PERFORMER') || []} />
    </div>
  );
};

export default SupportInfor;
