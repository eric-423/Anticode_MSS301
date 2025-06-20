

import { Search, Bell } from 'lucide-react';


const Header = ({ title }) => {
    return (
        <header className="bg-white shadow-sm p-6 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
            <div className="flex items-center space-x-6">
                <button className="relative text-gray-500 hover:text-gray-800">
                    <Bell className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                </button>
            </div>
        </header>
    );
};
export default Header;