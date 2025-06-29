import { useState, useEffect, useCallback } from 'react';
import { getShowtimeTicketPrice } from './api';
import {
  getSelectedSeatsDetail,
  addSeat,
  removeSeat
} from './seatStorage';
import { useStudentContext } from '../components/customer/booking-ticket/choose-seat/seat-container/booking-detail/useStudentContext';

export const useSeatSelection = (showtimeDetail) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isStudent } = useStudentContext();

  const getCurrentShowtimeSeats = () => {
    if (!showtimeDetail?.id) return [];

    const allSeatsDetail = getSelectedSeatsDetail();
    const currentShowtimeSeats = allSeatsDetail
      .filter(seat => seat.showtime === showtimeDetail.id)
      .map(seat => seat.seatName);

    return currentShowtimeSeats;
  };

  const isLastRow = (seatName) => {
    const row = showtimeDetail?.cinemaHall?.hallType?.roll || 0;
    const seatRow = seatName.charCodeAt(0) - 65;
    return seatRow === row - 1;
  };

  const getAdjacentSeat = (seatName) => {
    const row = seatName.charAt(0);
    const col = parseInt(seatName.slice(1));
    const totalCols = showtimeDetail?.cinemaHall?.hallType?.column || 0;

    if (col % 2 === 0) {
      return col > 1 ? `${row}${col - 1}` : null;
    } else {
      return col < totalCols ? `${row}${col + 1}` : null;
    }
  };

  const isSeatAvailable = (seatName) => {
    const bookedSeats = [""];
    return !bookedSeats.includes(seatName);
  };

  useEffect(() => {
    setSelectedSeats(getCurrentShowtimeSeats());
  }, [showtimeDetail?.id]);

  useEffect(() => {
    const handleStorageChange = () => {
      setSelectedSeats(getCurrentShowtimeSeats());
    };

    window.addEventListener('seatSelectionChange', handleStorageChange);
    return () => {
      window.removeEventListener('seatSelectionChange', handleStorageChange);
    };
  }, [showtimeDetail?.id]);

  const toggleSeat = useCallback(async (seat) => {
    if (selectedSeats.includes(seat)) {
      removeSeat(seat, showtimeDetail.id);

      if (isLastRow(seat)) {
        const adjacentSeat = getAdjacentSeat(seat);
        if (adjacentSeat && selectedSeats.includes(adjacentSeat)) {
          removeSeat(adjacentSeat, showtimeDetail.id);
        }
      }

      setSelectedSeats(getCurrentShowtimeSeats());
    } else {
      setIsLoading(true);
      try {
        const response = await getShowtimeTicketPrice(showtimeDetail.id, 1);
        const price = response.data.data.ticketPrice;

        const newSeatDetail = {
          seatName: seat,
          showtime: showtimeDetail.id,
          ticketType: isLastRow(seat) ? 2 : 1,
          price: price,
          movieId: showtimeDetail.movie?.id,
          movieName: showtimeDetail.movie?.title,
          cinemaName: showtimeDetail.cinemaHall?.cinema?.name,
          hallName: showtimeDetail.cinemaHall?.name
        };

        const success = addSeat(newSeatDetail);

        // Nếu là học sinh, không cho phép chọn ghế kề tự động
        if (success && isLastRow(seat) && !isStudent) {
          const adjacentSeat = getAdjacentSeat(seat);
          if (adjacentSeat && !selectedSeats.includes(adjacentSeat) && isSeatAvailable(adjacentSeat)) {
            const adjacentSeatDetail = {
              ...newSeatDetail,
              seatName: adjacentSeat,
              ticketType: 2
            };
            addSeat(adjacentSeatDetail);
          }
        }

        if (success) {
          setSelectedSeats(getCurrentShowtimeSeats());
        }
      } catch (error) {
        console.error("Lỗi khi lấy giá vé:", error);
        const newSeatDetail = {
          seatName: seat,
          showtime: showtimeDetail.id,
          ticketType: isLastRow(seat) ? 2 : 1,
          price: 0,
          movieId: showtimeDetail.movie?.id,
          movieName: showtimeDetail.movie?.title,
          cinemaName: showtimeDetail.cinemaHall?.cinema?.name,
          hallName: showtimeDetail.cinemaHall?.name
        };

        const success = addSeat(newSeatDetail);

        // Nếu là học sinh, không cho phép chọn ghế kề tự động
        if (success && isLastRow(seat) && !isStudent) {
          const adjacentSeat = getAdjacentSeat(seat);
          if (adjacentSeat && !selectedSeats.includes(adjacentSeat) && isSeatAvailable(adjacentSeat)) {
            const adjacentSeatDetail = {
              ...newSeatDetail,
              seatName: adjacentSeat,
              ticketType: 2
            };
            addSeat(adjacentSeatDetail);
          }
        }

        if (success) {
          setSelectedSeats(getCurrentShowtimeSeats());
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, [selectedSeats, showtimeDetail, isStudent]);

  return {
    selectedSeats,
    toggleSeat,
    isLoading,
    isLastRow
  };
}; 