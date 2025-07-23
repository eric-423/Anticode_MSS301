import React, { useEffect, useState } from 'react'

import { spendingData } from './sampleData'
import UserProfile from './UserProfile'
import TabNavigation from './TabNavigation'
import Header from '../header/Header'
import UserDetail from './UserDetail'
import jwtDecode from 'jwt-decode'
import { getHistoryBooking } from '../../../utils/api'
import BookingHistory from './BookingHistory'

const UserInfoPage = () => {
  const [tab, setTab] = useState('profile')
  const [user, setUser] = useState(null)
  const [historyBooking, setHistoryBooking] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decodeUser = jwtDecode(token)
        if (decodeUser.exp && Date.now() >= decodeUser.exp * 1000) {
          localStorage.removeItem('token')
          setUser(null)
          return
        }
        setUser(decodeUser)

      } catch {
        localStorage.removeItem('token')
        setUser(null)
      }
    } else {
      setUser(null)
    }
  }, [])

  useEffect(() => {
    const fetchHistoryBooking = async () => {
      const response = await getHistoryBooking(
        jwtDecode(localStorage.getItem('token')).id
      )
      console.log(response)
      setHistoryBooking(response.data.content)
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
          <UserProfile user={user} spending={spendingData} />
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
          {tab === 'profile' && <UserDetail userData={user ? user : null} />}
          {tab === 'history' && (
            <BookingHistory bookings={historyBooking} />
          )}
        </div>
      </div>
    </>
  )
}

export default UserInfoPage
