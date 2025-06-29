import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BookingDetailModal from './BookingDetailModal';

const BookingHistory = ({ bookings }) => {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-green-100 text-green-800';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Đang chờ';
      case 'CONFIRMED':
        return 'Đã hoàn thành';
      case 'CANCELLED':
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  };

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

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">
          Bạn chưa có lịch sử đặt vé nào
        </div>
        <div className="text-gray-400 text-sm">
          Hãy đặt vé xem phim để có lịch sử ở đây
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Booking List */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.bookingId}
            className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="flex">
              {/* Movie Poster */}
              <div className="w-24 h-32 flex-shrink-0">
                <img
                  src={booking.imageUrl}
                  alt={booking.movieName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/src/assets/glx.png';
                  }}
                />
              </div>

              {/* Booking Details */}
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {booking.movieName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Galaxy Cinema - NhA Van Hoa
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.bookingStatus)}`}>
                      {getStatusText(booking.bookingStatus)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">

                  <div>
                    <span className="text-gray-500">Ngày xem:</span>
                    <p className="font-medium text-gray-900">
                      {formatDate(booking.bookingDate)} - {booking.showTime.substring(11, 16)}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Ghế:</span>
                    <p className="font-medium text-gray-900">{booking.seatNumbers.join(', ')}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Tổng tiền:</span>
                    <p className="font-medium text-orange-600">{formatPrice(booking.totalPrice)}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Đặt vé ngày: {formatDate(booking.bookingDate)}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewDetails(booking)}
                        className="px-3 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                      >
                        Xem chi tiết
                      </button>
                      {booking.status === 'upcoming' && (
                        <button className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                          Hủy vé
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {bookings.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-500">
            Không có lịch sử đặt vé nào với trạng thái này
          </div>
        </div>
      )}

      {/* Modal */}
      <BookingDetailModal
        booking={selectedBooking}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

BookingHistory.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired
};

export default BookingHistory; 