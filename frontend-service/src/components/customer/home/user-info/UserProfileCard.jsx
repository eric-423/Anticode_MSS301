import React, { useRef, useState } from 'react'

function UserProfileCard({ user }) {
  const dropdownRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleAvatarClick = () => {
    window.location.href = '/user-detail'
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
  }

  if (!user) return <div>Đang tải thông tin...</div>

  return (
    <div
      className="relative inline-block pb-2"
      ref={dropdownRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-lg font-sans flex items-center space-x-4 p-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
        <div
          className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden"
          onClick={handleAvatarClick}
          style={{ cursor: 'pointer' }}
        >
          <img
            src="https://www.galaxycine.vn/_next/static/media/user_default.b1a2ce07.png"
            alt="avatar"
            className="w-10 h-10 object-cover"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <h2 className="text-sm font-semibold text-gray-800">
            {user.fullName}
          </h2>
          <div className="text-xs text-gray-600">Email: {user.email}</div>
          <div className="text-xs text-gray-600">SĐT: {user.phone}</div>
        </div>
      </div>

      {/* Logout button that appears on hover */}
      {isHovered && (
        <div className="absolute top-full left-0 -mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Đăng xuất</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default function UserProfileCardWrapper({ user }) {
  return <UserProfileCard user={user} />
}
