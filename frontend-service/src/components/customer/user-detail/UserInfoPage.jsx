import React, { useEffect, useState } from 'react'

import { spendingData } from './sampleData'
import UserProfile from './UserProfile'
import TabNavigation from './TabNavigation'
import Header from '../header/Header'
import UserDetail from './UserDetail'
import jwtDecode from 'jwt-decode'
import { getHistoryBooking, getUserInfo } from '../../../utils/api'
import BookingHistory from './BookingHistory'

const UserInfoPage = () => {
  const [tab, setTab] = useState('profile')
  const [userProfile, setUserProfile] = useState(null)
  const [historyBooking, setHistoryBooking] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decodeUser = jwtDecode(token)
        if (decodeUser.exp && Date.now() >= decodeUser.exp * 1000) {
          localStorage.removeItem('token')
          setUserProfile(null)
          return
        }
        // Lấy profile từ API
        const fetchUserProfile = async () => {
          try {
            const response = await getUserInfo(decodeUser.id)
            setUserProfile(response.data.data)
          } catch {
            setUserProfile(null)
          }
        }
        fetchUserProfile()
      } catch {
        localStorage.removeItem('token')
        setUserProfile(null)
      }
    } else {
      setUserProfile(null)
    }
  }, [])

  useEffect(() => {
    const fetchHistoryBooking = async () => {
      const token = localStorage.getItem('token')
      if (!token) return
      const decodeUser = jwtDecode(token)
      const response = await getHistoryBooking(decodeUser.id)
      const setBookingTime = response.data.content.map(booking => {
        return {
          ...booking,
          showTime: booking.showTime
            ? new Date(new Date(booking.showTime).getTime() + 7 * 60 * 60 * 1000).toISOString()
            : booking.showTime,
        }
      })
      setHistoryBooking(setBookingTime)
    }
    fetchHistoryBooking()
  }, [])

  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          background: '#fafafa',
          minHeight: '100vh',
          padding: 32,
        }}
      >
        <div style={{ marginRight: 48 }}>
          <UserProfile user={userProfile} spending={spendingData} />
        </div>

        <div
          style={{
            flex: 1,
            maxWidth: 900,
            borderRadius: 16,
            padding: 32,
            paddingTop: 0,
          }}
        >
          <TabNavigation tab={tab} setTab={setTab} />
          {tab === 'profile' && <UserDetail userData={userProfile} />}
          {tab === 'history' && (
            <BookingHistory bookings={historyBooking} />
          )}
        </div>
      </div>
    </>
  )
}

export default UserInfoPage
