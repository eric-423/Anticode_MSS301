

import { Search, Bell } from 'lucide-react';


const Header = ({ title }) => {
    return (
        <header className="bg-white shadow-sm p-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            <div className="flex items-center space-x-6">
                <div className="relative w-full max-w-xs">
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="w-full pl-10 pr-4 py-2 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                <button className="relative text-gray-500 hover:text-gray-800">
                    <Bell className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                </button>
            </div>
        </header>
    );
};
export default Header;