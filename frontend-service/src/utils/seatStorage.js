// Utility functions để quản lý localStorage cho chỗ ngồi

const SEAT_STORAGE_KEY = 'selectedSeats';
const SEAT_DETAIL_STORAGE_KEY = 'selectedSeatsDetail';

// Hàm emit custom event để thông báo thay đổi
const emitSeatSelectionChange = () => {
  window.dispatchEvent(new CustomEvent('seatSelectionChange'));
};

// Lấy danh sách chỗ ngồi đã chọn
export const getSelectedSeats = () => {
  try {
    const saved = localStorage.getItem(SEAT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Lỗi khi đọc danh sách chỗ ngồi:', error);
    return [];
  }
};

// Lưu danh sách chỗ ngồi đã chọn
export const saveSelectedSeats = (seats) => {
  try {
    localStorage.setItem(SEAT_STORAGE_KEY, JSON.stringify(seats));
    emitSeatSelectionChange();
  } catch (error) {
    console.error('Lỗi khi lưu danh sách chỗ ngồi:', error);
  }
};

// Lấy thông tin chi tiết chỗ ngồi
export const getSelectedSeatsDetail = () => {
  try {
    const saved = localStorage.getItem(SEAT_DETAIL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Lỗi khi đọc thông tin chi tiết chỗ ngồi:', error);
    return [];
  }
};

// Lưu thông tin chi tiết chỗ ngồi
export const saveSelectedSeatsDetail = (seatsDetail) => {
  try {
    localStorage.setItem(SEAT_DETAIL_STORAGE_KEY, JSON.stringify(seatsDetail));
    emitSeatSelectionChange();
  } catch (error) {
    console.error('Lỗi khi lưu thông tin chi tiết chỗ ngồi:', error);
  }
};

// Tính tổng tiền từ thông tin chỗ ngồi
export const calculateTotalPrice = () => {
  const seatsDetail = getSelectedSeatsDetail();
  return seatsDetail.reduce((total, seat) => total + (seat.ticketPrice || 0), 0);
};

// Thêm chỗ ngồi mới
export const addSeat = (seatDetail) => {
  const currentSeats = getSelectedSeats();
  const currentSeatsDetail = getSelectedSeatsDetail();
  
  // Kiểm tra xem chỗ đã tồn tại chưa
  if (!currentSeats.includes(seatDetail.seatLabel)) {
    const newSeats = [...currentSeats, seatDetail.seatLabel];
    const newSeatsDetail = [...currentSeatsDetail, seatDetail];
    
    saveSelectedSeats(newSeats);
    saveSelectedSeatsDetail(newSeatsDetail);
    
    return true;
  }
  
  return false;
};

// Xóa chỗ ngồi
export const removeSeat = (seatLabel) => {
  const currentSeats = getSelectedSeats();
  const currentSeatsDetail = getSelectedSeatsDetail();
  
  const newSeats = currentSeats.filter(seat => seat !== seatLabel);
  const newSeatsDetail = currentSeatsDetail.filter(seat => seat.seatLabel !== seatLabel);
  
  saveSelectedSeats(newSeats);
  saveSelectedSeatsDetail(newSeatsDetail);
};

// Xóa tất cả chỗ ngồi
export const clearAllSeats = () => {
  localStorage.removeItem(SEAT_STORAGE_KEY);
  localStorage.removeItem(SEAT_DETAIL_STORAGE_KEY);
  emitSeatSelectionChange();
};

// Lấy thông tin chỗ ngồi theo showtime
export const getSeatsByShowtime = (showtimeId) => {
  const seatsDetail = getSelectedSeatsDetail();
  return seatsDetail.filter(seat => seat.showtimeId === showtimeId);
}; 