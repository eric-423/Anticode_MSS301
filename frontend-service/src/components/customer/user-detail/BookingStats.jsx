import React from 'react';
import PropTypes from 'prop-types';

const BookingStats = ({ bookings }) => {
  const stats = React.useMemo(() => {
    const total = bookings.length;
    const completed = bookings.filter(b => b.status === 'completed').length;
    const upcoming = bookings.filter(b => b.status === 'upcoming').length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;
    const totalSpent = bookings
      .filter(b => b.status === 'completed')
      .reduce((sum, b) => sum + b.totalPrice, 0);

    return {
      total,
      completed,
      upcoming,
      cancelled,
      totalSpent
    };
  }, [bookings]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Thống kê đặt vé</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-500">Tổng số vé</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-sm text-gray-500">Đã hoàn thành</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.upcoming}</div>
          <div className="text-sm text-gray-500">Sắp tới</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
          <div className="text-sm text-gray-500">Đã hủy</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600">{formatPrice(stats.totalSpent)}</div>
          <div className="text-sm text-gray-500">Tổng chi tiêu</div>
        </div>
      </div>
    </div>
  );
};

BookingStats.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(['completed', 'upcoming', 'cancelled']).isRequired,
      totalPrice: PropTypes.number.isRequired
    })
  ).isRequired
};

export default BookingStats; 