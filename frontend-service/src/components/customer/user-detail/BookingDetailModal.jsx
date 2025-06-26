import React from 'react';
import PropTypes from 'prop-types';

const BookingDetailModal = ({ booking, isOpen, onClose }) => {
  if (!isOpen || !booking) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Đã hoàn thành';
      case 'upcoming':
        return 'Sắp tới';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Chi tiết đặt vé</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex space-x-6 mb-6">
            {/* Movie Poster */}
            <div className="w-32 h-48 flex-shrink-0">
              <img
                src={booking.poster}
                alt={booking.movieName}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  e.target.src = '/src/assets/glx.png';
                }}
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {booking.movieName}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="text-gray-500 w-24">Rạp:</span>
                  <span className="font-medium">{booking.cinema}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-24">Ngày xem:</span>
                  <span className="font-medium">{formatDate(booking.date)}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-24">Giờ chiếu:</span>
                  <span className="font-medium">{booking.time}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 w-24">Trạng thái:</span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {getStatusText(booking.status)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Thông tin đặt vé</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Mã đặt vé:</span>
                <p className="font-medium text-gray-900">{booking.bookingCode}</p>
              </div>
              <div>
                <span className="text-gray-500">Ngày đặt vé:</span>
                <p className="font-medium text-gray-900">{formatDate(booking.bookingDate)}</p>
              </div>
              <div>
                <span className="text-gray-500">Ghế:</span>
                <p className="font-medium text-gray-900">{booking.seats.join(', ')}</p>
              </div>
              <div>
                <span className="text-gray-500">Tổng tiền:</span>
                <p className="font-medium text-orange-600 text-lg">{formatPrice(booking.totalPrice)}</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4">
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-semibold text-gray-900 mb-2">Lưu ý</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Vui lòng đến rạp trước giờ chiếu 15 phút</li>
                <li>• Mang theo mã đặt vé hoặc CMND/CCCD để nhận vé</li>
                <li>• Không được hoàn vé sau khi đã thanh toán</li>
                {booking.status === 'upcoming' && (
                  <li>• Có thể hủy vé trước giờ chiếu 2 tiếng</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          {booking.status === 'upcoming' && (
            <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
              Hủy vé
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

BookingDetailModal.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.number.isRequired,
    bookingCode: PropTypes.string.isRequired,
    movieName: PropTypes.string.isRequired,
    cinema: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    seats: PropTypes.arrayOf(PropTypes.string).isRequired,
    totalPrice: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['completed', 'upcoming', 'cancelled']).isRequired,
    poster: PropTypes.string.isRequired,
    bookingDate: PropTypes.string.isRequired
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default BookingDetailModal; 