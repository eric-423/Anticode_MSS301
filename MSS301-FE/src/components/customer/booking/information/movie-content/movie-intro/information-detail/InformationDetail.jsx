import React from "react";
import Title from "./title/Title";
import Time from "./time/Time";
import Rating from "./rating/Rating";
import SupportInfor from "./support-infor/SupportInfor";

const InformationDetail = () => {
  return (
    <div className="col-span-2 lg:-translate-y-20 flex flex-col justify-end md:-translate-y-16 -translate-y-0">
      <Title />
      <Time />
      <Rating />
      <SupportInfor />
    </div>
  );
};

export default InformationDetail;
