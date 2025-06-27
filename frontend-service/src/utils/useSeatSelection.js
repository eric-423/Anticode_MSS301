import { useState, useEffect, useCallback } from 'react';
import { getShowtimeTicketPrice } from './api';
import { 
  getSelectedSeatsDetail,
  addSeat, 
  removeSeat 
} from './seatStorage';

export const useSeatSelection = (showtimeDetail) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Lấy chỗ ngồi đã chọn cho showtime hiện tại
  const getCurrentShowtimeSeats = () => {
    if (!showtimeDetail?.id) return [];
    
    const allSeatsDetail = getSelectedSeatsDetail();
    const currentShowtimeSeats = allSeatsDetail
      .filter(seat => seat.showtimeId === showtimeDetail.id)
      .map(seat => seat.seatLabel);
    
    return currentShowtimeSeats;
  };

  // Cập nhật state khi showtime thay đổi hoặc localStorage thay đổi
  useEffect(() => {
    setSelectedSeats(getCurrentShowtimeSeats());
  }, [showtimeDetail?.id]);

  // Lắng nghe thay đổi localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setSelectedSeats(getCurrentShowtimeSeats());
    };

    window.addEventListener('seatSelectionChange', handleStorageChange);
    return () => {
      window.removeEventListener('seatSelectionChange', handleStorageChange);
    };
  }, [showtimeDetail?.id]);

  // Hàm chọn/bỏ chọn chỗ ngồi
  const toggleSeat = useCallback(async (seat) => {
    if (selectedSeats.includes(seat)) {
      // Bỏ chọn chỗ
      removeSeat(seat);
      setSelectedSeats(getCurrentShowtimeSeats());
    } else {
      // Chọn chỗ mới
      setIsLoading(true);
      try {
        // Gọi API để lấy giá vé (giả sử ticketTypeId = 1 cho người lớn)
        const response = await getShowtimeTicketPrice(showtimeDetail.id, 1);
        const ticketPrice = response.data.data.ticketPrice;
        
        // Thêm thông tin chỗ ngồi mới
        const newSeatDetail = {
          seatLabel: seat,
          showtimeId: showtimeDetail.id,
          ticketTypeId: 1, // Giả sử là vé người lớn
          ticketPrice: ticketPrice,
          movieId: showtimeDetail.movie?.id,
          movieName: showtimeDetail.movie?.title,
          showtime: showtimeDetail.startTime,
          cinemaName: showtimeDetail.cinemaHall?.cinema?.name,
          hallName: showtimeDetail.cinemaHall?.name
        };
        
        const success = addSeat(newSeatDetail);
        if (success) {
          setSelectedSeats(getCurrentShowtimeSeats());
        }
      } catch (error) {
        console.error("Lỗi khi lấy giá vé:", error);
        // Nếu lỗi, vẫn thêm chỗ nhưng không có giá
        const newSeatDetail = {
          seatLabel: seat,
          showtimeId: showtimeDetail.id,
          ticketTypeId: 1,
          ticketPrice: 0,
          movieId: showtimeDetail.movie?.id,
          movieName: showtimeDetail.movie?.title,
          showtime: showtimeDetail.startTime,
          cinemaName: showtimeDetail.cinemaHall?.cinema?.name,
          hallName: showtimeDetail.cinemaHall?.name
        };
        
        const success = addSeat(newSeatDetail);
        if (success) {
          setSelectedSeats(getCurrentShowtimeSeats());
        }
      } finally {
        setIsLoading(false);
      }
    }
  }, [selectedSeats, showtimeDetail]);

  return {
    selectedSeats,
    toggleSeat,
    isLoading
  };
}; 