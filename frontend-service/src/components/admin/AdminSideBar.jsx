import jwtDecode from 'jwt-decode'
import { User } from 'lucide-react'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminSideBar = ({ activeView, setActiveView }) => {
  const navigate = useNavigate()
  const navItems = [{ id: 'accounts', icon: User, label: 'Quản lý Tài khoản' }]
  const handleLogout = () => {
    try {
      localStorage.removeItem('token')
    } catch (error) {
    } finally {
      navigate('/')
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return handleLogout()
    try {
      const decoded = jwtDecode(token)
      if (decoded.exp && Date.now() >= decoded.exp * 1000) return handleLogout()
      if (decoded.role !== 'ADMIN') return handleLogout()
    } catch {
      return handleLogout()
    }
  }, [])

  return (
    <div className="w-60 bg-gray-900 text-white flex flex-col min-h-screen">
      <div className="flex grid mb-[50px] items-center justify-center h-16 my-5 ">
        <img
          className="h-auto w-35 mb-[10px]"
          src="https://www.galaxycine.vn/_next/static/media/icon-login.fbbf1b2d.svg"
          alt=""
        />
        <h1 className="text-xl font-bold ms-0">Admin Panel</h1>
      </div>
      <nav className="flex-1 mt-5 px-2 py-4 overflow-y-auto">
        <ul>
          {navItems.map((item) => (
            <li
              className={`py-1 ${
                activeView === item.id
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
              key={item.id}
            >
              <button
                onClick={() => setActiveView(item.id)}
                className={`w-full flex items-center px-2 py-2 text-left rounded-lg transition-colors duration-200 ${
                  activeView === item.id
                    ? 'bg-red-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon className="h-4 w-4 mr-2" />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-2 border-t border-gray-700">
        <div className="flex items-center">
          <User className="w-8 h-8 rounded-full bg-gray-700 p-1.5" />
          <div className="ml-2">
            <p className="font-semibold text-xs">Admin</p>
            <p className="text-xs text-gray-400">admin@cinema.com</p>
          </div>
        </div>
        <button
          onClick={() => handleLogout()}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2 rounded-lg transition-colors duration-200"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  )
}

export default AdminSideBar
