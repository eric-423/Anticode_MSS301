import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const ConcessionCard = ({ product }) => {
  // Lấy quantity ban đầu từ localStorage nếu có
  const getInitialQuantity = () => {
    const concessions = JSON.parse(localStorage.getItem('selectedConcessions') || '[]');
    const found = concessions.find(item => item.id === product.id);
    return found ? found.quantity : 0;
  };

  const [quantity, setQuantity] = useState(getInitialQuantity());

  // Cập nhật localStorage mỗi khi quantity thay đổi
  useEffect(() => {
    const concessions = JSON.parse(localStorage.getItem('selectedConcessions') || '[]');
    const idx = concessions.findIndex(item => item.id === product.id);
    if (quantity > 0) {
      if (idx !== -1) {
        concessions[idx] = { ...concessions[idx], quantity };
      } else {
        concessions.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
        });
      }
    } else {
      // Nếu quantity = 0 thì xóa khỏi danh sách
      if (idx !== -1) {
        concessions.splice(idx, 1);
      }
    }
    localStorage.setItem('selectedConcessions', JSON.stringify(concessions));
    window.dispatchEvent(new Event('concessionsChange'));
  }, [quantity, product]);

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  if (!product) {
    return null;
  }

  return (
    <div className="grid grid-cols-9 text-[16px] px-[25px] py-[20px] border-b-[1px] border-[rgb(237,242,249)]">
      <div className="col-span-5">
        <div className="flex items-center gap-3">
          {product.productImageUrl && (
            <img
              src={product.productImageUrl}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
          <div>
            <h6 className="text-[#4A4A4A] font-semibold text-[16px]">
              {product.name}
            </h6>
            {product.size && (
              <p className="text-[14px] text-[#777777]">
                Kích thước: {product.size}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-2 flex justify-center items-center">
        <span className="text-[14px] text-[#4A4A4A] font-medium">
          {product.price?.toLocaleString('vi-VN')} ₫
        </span>
      </div>
      <div className="col-span-2 flex justify-center gap-[15px] items-center text-[14px] text-[#4A4A4A] font-medium">
        <div
          className={`w-[25px] cursor-pointer h-[25px] flex justify-center items-center rounded-full border-[1px] border-[rgba(0,0,0,0.1)] ${quantity > 0 ? 'hover:bg-gray-100' : 'opacity-50 cursor-not-allowed'}`}
          onClick={handleDecrease}
        >
          <svg
            className="w-[8px] h-[8px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
            ></path>
          </svg>
        </div>
        <span className="min-w-[20px] text-center">{quantity}</span>
        <div
          className="w-[25px] cursor-pointer h-[25px] flex justify-center items-center rounded-full border-[1px] border-[rgba(0,0,0,0.1)] hover:bg-gray-100"
          onClick={handleIncrease}
        >
          <svg
            className="w-[8px] h-[8px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

ConcessionCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    productImageUrl: PropTypes.string,
    size: PropTypes.string,
  }).isRequired,
};

export default ConcessionCard;
