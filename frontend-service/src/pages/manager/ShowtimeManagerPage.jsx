import React from 'react';
import ShowtimeManager from '../../components/manager/ShowtimeManager';
import SideBar from '../../components/manager/SideBar';
import Header from '../../components/manager/Header';

const ShowtimeManagerPage = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <SideBar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-6">
                    <ShowtimeManager />
                </main>
            </div>
        </div>
    );
};

export default ShowtimeManagerPage;