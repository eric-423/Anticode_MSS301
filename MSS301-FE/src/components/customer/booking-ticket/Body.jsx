import React, { useState } from "react";
import ProgressBar from "./progress-bar/ProgressBar";
import TicketInfor from "./ticket-infor/TicketInfor";
import ChooseSeat from "./choose-seat/ChooseSeat";
import Concessions from "./concessions/Concessions";
import Payment from "./choose-seat/payment/Payment";

const Body = () => {
  return (
    <div className="bg-[#F9F9F9] pt-[6px]">
      <ProgressBar />
      <div className="grid grid-cols-3 max-w-[1390px] mx-auto">
        {/* <ChooseSeat /> */}
        {/* <Concessions /> */}
        <Payment />
        <TicketInfor />
      </div>
    </div>
  );
};

export default Body;
