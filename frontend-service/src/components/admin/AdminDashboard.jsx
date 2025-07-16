import React, { useState } from 'react';
import AdminSideBar from './AdminSideBar';
import AccountManager from '../admin/AccountManager';

const AdminDashboard = () => {
    const [activeView, setActiveView] = useState('accounts');

    const renderView = () => {
        switch (activeView) {
            case 'accounts':
            default:
                return <AccountManager />;
        }
    };

    return (
        <div className="flex bg-gray-100 font-sans">
            <AdminSideBar activeView={activeView} setActiveView={setActiveView} />
            <main className="flex-1">
                <header className="bg-white shadow-sm p-6 flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-gray-800">Quản trị Admin</h2>
                </header>
                <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 88px)' }}>
                    {renderView()}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard; 