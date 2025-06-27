import { useState } from "react";
import SideBar from "./SideBar";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Movies from "./Movies";
import Cinemas from "./Cinemas";
import Products from "./Products";

const ManageDashboard = () => {
    const [activeView, setActiveView] = useState('dashboard');

    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <Dashboard />;
            case 'movies':
                return <Movies />;
            case 'cinemas':
                return <Cinemas />;
            case 'products':
                return <Products />;
            default:
                return <Dashboard />;
        }
    };

    const getTitle = () => {
        switch (activeView) {
            case 'dashboard': return 'Tổng quan';
            case 'movies': return 'Quản lý Phim';
            case 'cinemas': return 'Quản lý Rạp';
            case 'products': return 'Quản lý Sản phẩm';
            default: return 'Tổng quan';
        }
    }

    return (
        <div className="flex bg-gray-100 font-sans">
            <SideBar activeView={activeView} setActiveView={setActiveView} />
            <main className="flex-1">
                <Header title={getTitle()} />
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 88px)' }}>
                    {renderView()}
                </div>
            </main>
        </div>
    );
}

export default ManageDashboard;
