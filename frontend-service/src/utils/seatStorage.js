const SEAT_DETAIL_STORAGE_KEY = 'selectedSeatsDetail';

const emitSeatSelectionChange = () => {
  window.dispatchEvent(new CustomEvent('seatSelectionChange'));
};

export const getSelectedSeats = () => {
  try {
    const seatsDetail = getSelectedSeatsDetail();
    return seatsDetail.map(seat => seat.seatName);
  } catch (error) {
    console.error('Lỗi khi đọc danh sách chỗ ngồi:', error);
    return [];
  }
};

export const saveSelectedSeats = () => {
  try {
    console.warn('saveSelectedSeats is deprecated, use selectedSeatsDetail instead');
    emitSeatSelectionChange();
  } catch (error) {
    console.error('Lỗi khi lưu danh sách chỗ ngồi:', error);
  }
};

export const getSelectedSeatsDetail = () => {
  try {
    const saved = localStorage.getItem(SEAT_DETAIL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Lỗi khi đọc thông tin chi tiết chỗ ngồi:', error);
    return [];
  }
};

export const saveSelectedSeatsDetail = (seatsDetail) => {
  try {
    localStorage.setItem(SEAT_DETAIL_STORAGE_KEY, JSON.stringify(seatsDetail));
    emitSeatSelectionChange();
  } catch (error) {
    console.error('Lỗi khi lưu thông tin chi tiết chỗ ngồi:', error);
  }
};

export const calculateTotalPrice = () => {
  const seatsDetail = getSelectedSeatsDetail();
  return seatsDetail.reduce((total, seat) => total + (seat.price || 0), 0);
};

export const addSeat = (seatDetail) => {
  const currentSeatsDetail = getSelectedSeatsDetail();

  const existingSeat = currentSeatsDetail.find(
    seat => seat.seatName === seatDetail.seatName && seat.showtime === seatDetail.showtime
  );

  if (!existingSeat) {
    const newSeatsDetail = [...currentSeatsDetail, seatDetail];
    saveSelectedSeatsDetail(newSeatsDetail);
    return true;
  }

  return false;
};

export const removeSeat = (seatName, showtime = null) => {
  const currentSeatsDetail = getSelectedSeatsDetail();

  let newSeatsDetail;
  if (showtime) {
    newSeatsDetail = currentSeatsDetail.filter(
      seat => !(seat.seatName === seatName && seat.showtime === showtime)
    );
  } else {
    newSeatsDetail = currentSeatsDetail.filter(seat => seat.seatName !== seatName);
  }

  saveSelectedSeatsDetail(newSeatsDetail);
};

export const clearAllSeats = () => {
  localStorage.removeItem(SEAT_DETAIL_STORAGE_KEY);
  emitSeatSelectionChange();
};

export const getSeatsByShowtime = (showtime) => {
  const seatsDetail = getSelectedSeatsDetail();
  return seatsDetail.filter(seat => seat.showtime === showtime);
};

export const getSeatNamesByShowtime = (showtime) => {
  const seatsDetail = getSelectedSeatsDetail();
  return seatsDetail
    .filter(seat => seat.showtime === showtime)
    .map(seat => seat.seatName);
}; 