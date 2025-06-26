// src/pages/customer/ticket-receipt/TicketReceiptPage.jsx

import React from 'react';
import Header from '../../../components/customer/header/Header';
import Footer from '../../../components/customer/footer/Footer';
import Ticket from '../../../components/customer/ticket-receipt/Ticket';


const TicketReceiptPage = () => {
    return (
        <div>
            <Header />
            <Ticket />
            <Footer />
        </div>
    );
};

export default TicketReceiptPage;
