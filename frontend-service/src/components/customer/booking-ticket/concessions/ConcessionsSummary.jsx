import React, { useState, useEffect } from 'react';
import { getSeatsByShowtime } from '../../../../utils/seatStorage';
import { createBooking, createPayment } from '../../../../utils/api';
import jwtDecode from 'jwt-decode';

const ConcessionsSummary = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedConcessions, setSelectedConcessions] = useState([]);
  const [concessionsTotal, setConcessionsTotal] = useState(0);
  const [currentShowtimeId, setCurrentShowtimeId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedShowtimeId = localStorage.getItem('currentShowtimeId');
    setCurrentShowtimeId(savedShowtimeId ? parseInt(savedShowtimeId) : null);
  }, []);

  useEffect(() => {
    const updateSummary = () => {
      const currentShowtimeSeats = currentShowtimeId
        ? getSeatsByShowtime(currentShowtimeId)
        : [];
      setSelectedSeats(currentShowtimeSeats);

      // Lấy sản phẩm đã chọn từ localStorage
      const concessions = JSON.parse(localStorage.getItem('selectedConcessions') || '[]');
      const filtered = concessions.filter(item => item.quantity > 0);
      setSelectedConcessions(filtered);

      // Tính tổng tiền thức ăn
      const total = filtered.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setConcessionsTotal(total);

      window.dispatchEvent(new Event('concessionsChange'));
    };

    updateSummary();
    window.addEventListener('seatSelectionChange', updateSummary);
    window.addEventListener('storage', updateSummary);
    window.addEventListener('concessionsChange', updateSummary);

    return () => {
      window.removeEventListener('seatSelectionChange', updateSummary);
      window.removeEventListener('storage', updateSummary);
      window.removeEventListener('concessionsChange', updateSummary);
    };
  }, [currentShowtimeId]);

  const ticketsTotal = selectedSeats.reduce((total, seat) => total + (seat.price || 0), 0);
  const grandTotal = ticketsTotal + concessionsTotal;

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Vui lòng đăng nhập để tiếp tục thanh toán!');
        return;
      }

      if (selectedSeats.length === 0) {
        alert('Vui lòng chọn ít nhất một vé trước khi thanh toán!');
        return;
      }

      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.email;
      const userID = decodedToken.id || decodedToken.userId;

      const bookingData = {
        guestEmail: userEmail,
        totalPrice: grandTotal,
        bookDate: new Date().toISOString(),
        userID: userID,
        bookingConcessionList: selectedConcessions.map(item => ({
          concessionProductID: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        bookingSeatList: selectedSeats.map(seat => ({
          seatName: seat.seatName,
          showtime: seat.showtime,
          ticketType: seat.ticketType,
          price: seat.price
        }))
      };

      const response = await createBooking(bookingData);

      const paymentMethod = {
        "paymentMethod": "VIETQR"
      };
      console.log(response.data.id)
      await createPayment(response.data.id, paymentMethod)
        .then(res => {
          window.location.href = res.data.paymentUrl;
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          localStorage.removeItem('selectedConcessions');
          localStorage.removeItem('currentShowtimeId');
          localStorage.removeItem('selectedSeatsDetail');
        })

    } catch (error) {
      console.error('Lỗi khi đặt vé:', error);
      alert('Có lỗi xảy ra khi đặt vé. Vui lòng thử lại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="col-span-1">
      <div className="bg-white rounded-[.375rem] font-nunito-sans mb-10 border-[1px] border-[rgb(237,242,249)] overflow-hidden">
        <div className="px-[25px] py-[15px] bg-[#F9F9F9] border-b-[1px] border-[rgb(237,242,249)]">
          <h3 className="font-semibold text-[16px] text-[#4A4A4A]">TÓM TẮT ĐƠN HÀNG</h3>
        </div>

        <div className="p-[25px]">
          {/* Vé đã chọn */}
          <div className="mb-6">
            <h4 className="font-semibold text-[14px] text-[#4A4A4A] mb-3">VÉ ĐÃ CHỌN</h4>
            {selectedSeats.length > 0 ? (
              <div className="space-y-2">
                {selectedSeats.map((seat, index) => (
                  <div key={index} className="flex justify-between items-center text-[14px]">
                    <span className="text-[#777777]">
                      {seat.seatName} - {seat.movieName}
                    </span>
                    <span className="font-medium">
                      {seat.price?.toLocaleString('vi-VN')} ₫
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[14px] text-[#777777]">Chưa có vé nào cho suất chiếu này</p>
            )}
          </div>

          {/* Thức ăn đã chọn */}
          <div className="mb-6">
            <h4 className="font-semibold text-[14px] text-[#4A4A4A] mb-3">THỨC ĂN</h4>
            {selectedConcessions.length > 0 ? (
              <div className="space-y-2">
                {selectedConcessions.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-[14px]">
                    <span className="text-[#777777]">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-medium">
                      {(item.price * item.quantity).toLocaleString('vi-VN')} ₫
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[14px] text-[#777777]">Chưa chọn thức ăn</p>
            )}
          </div>

          {/* Tổng cộng */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center font-bold text-[16px] text-[#4A4A4A]">
              <span>TỔNG CỘNG</span>
              <span className="text-[#F58020]">{grandTotal.toLocaleString('vi-VN')} ₫</span>
            </div>
          </div>

          {/* Nút tiếp tục */}
          <div className="mt-6">
            <button
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#F58020] text-white hover:bg-[#e6731a]'
                }`}
              onClick={handlePayment}
              disabled={isLoading}
            >
              {isLoading ? 'ĐANG XỬ LÝ...' : 'TIẾP TỤC THANH TOÁN'}
            </button>
          </div>

          {/* Nút quay lại */}
          <div className="mt-3">
            <button
              className="w-full border border-[#F58020] text-[#F58020] py-3 rounded-lg font-semibold hover:bg-[#F58020] hover:text-white transition-colors"
              onClick={() => window.history.back()}
              disabled={isLoading}
            >
              QUAY LẠI
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcessionsSummary; 