import { User, Film, Video, ShoppingBag, BarChart2 } from 'lucide-react';
import React from 'react';

const Sidebar = ({ activeView, setActiveView }) => {
    const navItems = [
        { id: 'dashboard', icon: BarChart2, label: 'Tổng quan' },
        { id: 'movies', icon: Film, label: 'Quản lý Phim' },
        { id: 'cinemas', icon: Video, label: 'Quản lý Rạp' },
        { id: 'products', icon: ShoppingBag, label: 'Quản lý Sản phẩm' },
    ];

    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col min-h-screen">
            <div className="flex items-center justify-center h-20 border-b border-gray-700">
                <Video className="h-8 w-8 text-red-500" />
                <h1 className="ml-3 text-2xl font-bold">Cinema Admin</h1>
            </div>
            <nav className="flex-1 px-4 py-6">
                <ul>
                    {navItems.map(item => (
                        <li key={item.id}>
                            <button
                                onClick={() => setActiveView(item.id)}
                                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${activeView === item.id
                                    ? 'bg-red-600 text-white'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`}
                            >
                                <item.icon className="h-5 w-5 mr-3" />
                                <span className="font-medium">{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <div className="flex items-center">
                    <User className="w-10 h-10 rounded-full bg-gray-700 p-2" />
                    <div className="ml-3">
                        <p className="font-semibold text-sm">Admin User</p>
                        <p className="text-xs text-gray-400">admin@cinema.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;