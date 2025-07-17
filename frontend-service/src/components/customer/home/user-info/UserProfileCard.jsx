import React, { useRef } from 'react'

function UserProfileCard({ user }) {
  const dropdownRef = useRef(null)

  const handleAvatarClick = () => {
    window.location.href = '/user-detail'
  }

  if (!user) return <div>Đang tải thông tin...</div>

  return (
    <div className="relative inline-block pb-2" ref={dropdownRef}>
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
          <div className="text-xs text-gray-600 font-bold">
            Điểm thành viên: {user.royalPoint}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function UserProfileCardWrapper({ user }) {
  return <UserProfileCard user={user} />
}
