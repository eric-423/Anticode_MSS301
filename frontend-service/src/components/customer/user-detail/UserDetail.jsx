import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './UserDetail.css'
import PropTypes from 'prop-types'

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
)

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
)

const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
  </svg>
)

const PhoneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.024 11.024 0 004.755 4.755l.76-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C6.477 18 2 13.523 2 8V5a1 1 0 011-1h.001z" />
  </svg>
)

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 2a4 4 0 00-4 4v2H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2h-2V6a4 4 0 00-4-4zm2 6V6a2 2 0 10-4 0v2h4z"
      clipRule="evenodd"
    />
  </svg>
)

const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-500"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path
      fillRule="evenodd"
      d="M.458 10C3.732 4.943 9.522 3 10 3s6.268 1.943 9.542 7c-3.274 5.057-9.03 7-9.542 7S3.732 15.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
      clipRule="evenodd"
    />
  </svg>
)

const EyeOffIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-500"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C16.268 4.943 10.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
      clipRule="evenodd"
    />
    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.458 6.697A10.004 10.004 0 01.458 10c3.274 5.057 9.03 7 9.542 7 .847 0 1.673-.125 2.454-.36z" />
  </svg>
)

async function getUserProfile(userId) {
  console.log('Fetching profile for userId:', userId)
  const token = localStorage.getItem('token')
  const res = await fetch(
    `http://35.247.155.58:8080/account-service/api/users/profile/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (!res.ok) throw new Error('Không lấy được thông tin user')
  const json = await res.json()
  return json.data
}

export default function UserDetail({ userData }) {
  const [userProfile, setUserProfile] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    let userId = null
    if (userData && userData.id) {
      userId = userData.id
    } else {
      userId = localStorage.getItem('userId')
    }
    if (userId) {
      getUserProfile(userId).then(setUserProfile).catch(console.error)
    } else {
      console.warn('No userId found for profile fetch')
    }
  }, [userData])

  useEffect(() => {
    if (userData?.dateOfBirth) {
      setSelectedDate(new Date(userData.dateOfBirth))
    }
  }, [userData])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  if (!userProfile) return <div>Đang tải thông tin...</div>

  return (
    <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-md">
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Họ và tên
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon />
              </div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                defaultValue={userData?.username}
                className="w-full pl-10 pr-3 py-2 bg-gray-100 border-transparent rounded-md focus:ring-orange-500 focus:border-orange-500 block"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="birthDate"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Ngày sinh
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CalendarIcon />
              </div>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date)
                  setUserProfile(prev => ({ ...prev, dateOfBirth: date.toISOString().substring(0, 10) }))
                }}
                dateFormat="dd/MM/yyyy"
                placeholderText="Chọn ngày sinh"
                className="w-full pl-10 pr-3 py-2 bg-gray-100 border-transparent rounded-md focus:ring-orange-500 focus:border-orange-500 block"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={15}
                maxDate={new Date()}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={userData?.email}
                className="w-full pl-10 pr-24 py-2 bg-gray-100 border-transparent rounded-md focus:ring-orange-500 focus:border-orange-500 block"
                readOnly
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm font-semibold text-orange-600 hover:text-orange-500"
              >
                Thay đổi
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Số điện thoại
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <PhoneIcon />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                defaultValue={userData?.phone}
                className="w-full pl-10 pr-3 py-2 bg-gray-100 border-transparent rounded-md focus:ring-orange-500 focus:border-orange-500 block"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                defaultValue={userData?.password}
                className="w-full pl-10 pr-12 py-2 bg-gray-100 border-transparent rounded-md focus:ring-orange-500 focus:border-orange-500 block"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-8 pr-3 flex items-center text-sm font-semibold text-orange-600 hover:text-orange-500"
              >
                Thay đổi
              </button>
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm font-semibold text-orange-600 hover:text-orange-500"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2.5 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  )
}

UserDetail.propTypes = {
  userData: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    birthDate: PropTypes.string,
  }).isRequired,
}
