import React from "react";
import ChangeShowTime from "./change-showtimes/ChangeShowTime";
import SeatContainer from "./seat-container/SeatContainer";

const ChooseSeat = () => {
  return (
    <div className="col-span-2">
      <ChangeShowTime />
      <SeatContainer />
    </div>
  );
};

export default ChooseSeat;
