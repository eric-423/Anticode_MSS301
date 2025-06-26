import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangeShowTime from "./change-showtimes/ChangeShowTime";
import SeatContainer from "./seat-container/SeatContainer";
import { getShowtimeById, getShowtimesByMovieDate } from "../../../../utils/api";

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
};

const ChooseSeat = ({ movieId, showtimeId }) => {
  const [currentShowtimeId, setCurrentShowtimeId] = useState(showtimeId);
  const [showtimeDetail, setShowtimeDetail] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentShowtimeId) return;
    getShowtimeById(currentShowtimeId)
      .then((res) => {
        const detail = res.data.data;
        setShowtimeDetail(detail);
        const date = formatDate(detail.startTime);
        return getShowtimesByMovieDate(movieId, date);
      })
      .then((res) => setShowtimes(res?.data?.data || []))
      .catch((err) => console.error(err));
  }, [movieId, currentShowtimeId]);

  return (
    <div className="col-span-2">
      <ChangeShowTime
        showtimes={showtimes}
        currentId={currentShowtimeId}
        onSelect={setCurrentShowtimeId}
      />

      <SeatContainer showtimeDetail={showtimeDetail} />

      {/* <div className="flex justify-end mt-4">
        <button
          className="bg-[#F58020] text-white px-4 py-2 rounded"
          onClick={() => navigate("/concessions")}
        >
          Tiếp tục
        </button>
      </div> */}


    </div>
  );
};

export default ChooseSeat;
