import React, { useState, useRef, useEffect } from 'react';
import { logout } from '../../../../utils/api';

const UserIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const StarBadgeIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.51zM12 17.27z" transform="scale(0.8) translate(3, 3)" />
    <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z" />
  </svg>
);

const GiftIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3s-3 1.34-3 3c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM4 8h16v11H4V8zm7 1h2v2h-2v-1z m-4 0h2v2H7v-1z m8 0h2v2h-2v-1z m-4 3h2v2h-2v-2z m-4 0h2v2H7v-2z m8 0h2v2h-2v-2z" />
  </svg>
);

function UserProfileCard({ user }) {
  const userName = user?.username;
  const userRank = "Star";
  const userStars = 0;
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 150);
  };

  const handleDropdownClick = (event) => {
    window.location.href = `/${event}`;
    console.log(`Redirecting to ${event}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowDropdown(false);
    logout().catch(console.error);
    window.location.href = '/';
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative inline-block pb-2" ref={dropdownRef}>

      <div
        className="bg-white rounded-lg font-sans flex items-center space-x-4 p-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <UserIcon className="w-6 h-6 text-gray-500" />
        </div>

        <div className="flex flex-col space-y-1">
          <h2 className="text-sm font-semibold text-gray-800">{userName}</h2>
          <div className="flex items-center space-x-1 text-gray-600">
            <StarBadgeIcon className="w-4 h-4 text-yellow-500" />
            <span className="text-xs">{userRank}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <GiftIcon className="w-4 h-4 text-orange-500" />
            <span className="text-xs">{userStars} Stars</span>
          </div>
        </div>
      </div>


      {showDropdown && (
        <div
          className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg p-2 z-50 border border-gray-200"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <ul className="space-y-1">
            <li
              className="flex items-center space-x-2 hover:bg-orange-50 p-2 rounded cursor-pointer transition-colors duration-200"
              onClick={() => handleDropdownClick('user-detail')}
            >
              <UserIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Tài Khoản</span>
            </li>
            <li
              className="flex items-center space-x-2 hover:bg-orange-50 p-2 rounded cursor-pointer transition-colors duration-200"
              onClick={() => handleDropdownClick()}
            >
              <StarBadgeIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Lịch Sử</span>
            </li>
            <li
              className="flex items-center space-x-2 hover:bg-orange-50 p-2 rounded cursor-pointer transition-colors duration-200"
              onClick={() => handleLogout()}
            >
              <GiftIcon className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-700">Đăng Xuất</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default function UserProfileCardWrapper({ user }) {
  return (
    <UserProfileCard user={user} />
  );
}