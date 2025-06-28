import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BookingDetailModal from './BookingDetailModal';

const BookingHistory = ({ bookings }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const filteredBookings = filterStatus === 'all'
    ? bookings
    : bookings.filter(booking => booking.status === filterStatus);

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
      {/* Filter Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Lịch sử đặt vé UI test</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === 'all'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilterStatus('upcoming')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === 'upcoming'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Sắp tới
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === 'completed'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Đã hoàn thành
          </button>
          <button
            onClick={() => setFilterStatus('cancelled')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === 'cancelled'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            Đã hủy
          </button>
        </div>
      </div>

      {/* Booking List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="flex">
              {/* Movie Poster */}
              <div className="w-24 h-32 flex-shrink-0">
                <img
                  src={booking.poster}
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
                      {booking.cinema}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {getStatusText(booking.status)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Mã đặt vé:</span>
                    <p className="font-medium text-gray-900">{booking.bookingCode}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Ngày xem:</span>
                    <p className="font-medium text-gray-900">
                      {formatDate(booking.date)} - {booking.time}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Ghế:</span>
                    <p className="font-medium text-gray-900">{booking.seats.join(', ')}</p>
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

      {filteredBookings.length === 0 && (
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