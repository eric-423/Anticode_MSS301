import React, { useState, useRef, useEffect } from 'react'
import { logout } from '../../../../utils/api'

async function getUserProfile(userId) {
  const res = await fetch(`/api/users/profile/${userId}`)
  if (!res.ok) throw new Error('Không lấy được thông tin user')
  const json = await res.json()
  return json.data // Lấy đúng trường data
}

const UserIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
)

const StarBadgeIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.51zM12 17.27z"
      transform="scale(0.8) translate(3, 3)"
    />
    <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z" />
  </svg>
)

const GiftIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3s-3 1.34-3 3c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM4 8h16v11H4V8zm7 1h2v2h-2v-1z m-4 0h2v2H7v-1z m8 0h2v2h-2v-1z m-4 3h2v2h-2v-2z m-4 0h2v2H7v-2z m8 0h2v2h-2v-2z" />
  </svg>
)

function UserProfileCard({ userId }) {
  const [profile, setProfile] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (userId) {
      getUserProfile(userId).then(setProfile).catch(console.error)
    }
  }, [userId])

  if (!profile) return <div>Đang tải thông tin...</div>

  return (
    <div className="relative inline-block pb-2" ref={dropdownRef}>
      <div className="bg-white rounded-lg font-sans flex items-center space-x-4 p-2 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <span>{profile.fullName?.charAt(0) || '?'}</span>
        </div>
        <div className="flex flex-col space-y-1">
          <h2 className="text-sm font-semibold text-gray-800">
            {profile.fullName}
          </h2>
          <div className="text-xs text-gray-600">Email: {profile.email}</div>
          <div className="text-xs text-gray-600">SĐT: {profile.phone}</div>
          <div className="text-xs text-gray-600 font-bold">
            Điểm thành viên: {profile.royalPoint}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function UserProfileCardWrapper({ userId }) {
  return <UserProfileCard userId={userId} />
}
