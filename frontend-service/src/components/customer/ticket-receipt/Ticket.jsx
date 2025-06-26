// src/components/customer/ticket/Ticket.jsx

import React from 'react';
import './Ticket.css';
import { sampleTicket } from './sampleTicket';


const Ticket = ({ ticketData }) => {
    const ticket = ticketData || sampleTicket;

    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
        ticket.qrValue
    )}`;

    const totalConcessionPrice = ticket.concessions.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleGoHome = () => {
        window.location.href = '/';
    }

    return (
        <div className="ticket-page-wrapper">
            <div className="ticket-container">
                <div className="ticket-header">
                    <h1 className="cinema-name">Galaxy Nha Van Hoa</h1>
                </div>

                <div className="ticket-body">
                    <div className="movie-main-info">
                        <div className="movie-poster">
                            <img src={ticket.movie.posterUrl} alt={ticket.movie.title} />
                        </div>
                        <div className="movie-details">
                            <h2 className="movie-title">{ticket.movie.title}</h2>
                            <p className="movie-format">
                                {ticket.movie.format} - {ticket.movie.duration}
                            </p>
                        </div>
                    </div>

                    <div className="showtime-details">
                        <div className="detail-grid">
                            <div className="detail-item">
                                <span className="detail-label">Hall</span>
                                <span className="detail-value">{ticket.cinema.name}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Phòng chiếu</span>
                                <span className="detail-value">{ticket.cinema.screen}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Ngày</span>
                                <span className="detail-value">{ticket.showtime.date}</span>
                            </div>
                            <div className="detail-item">
                                <span className="detail-label">Giờ</span>
                                <span className="detail-value">{ticket.showtime.time}</span>
                            </div>
                        </div>
                        <div className="seat-details">
                            <span className="detail-label">Ghế</span>
                            <div className="seat-tags">
                                {ticket.seats.map((seat) => (
                                    <span key={seat} className="seat-tag">
                                        {seat}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="qr-section">
                        <img src={qrApiUrl} alt="QR Code" className="qr-code-img" />
                        <p className="ticket-id">{ticket.id}</p>
                    </div>

                    <div className="price-details">
                        <h3 className="price-title">Chi tiết thanh toán</h3>
                        <div className="price-item">
                            <span>Giá vé ({ticket.seats.length} vé)</span>
                            <span>{ticket.price.tickets.toLocaleString('vi-VN')} đ</span>
                        </div>
                        {ticket.concessions.length > 0 && (
                            <div className="price-item">
                                <span>Bắp nước</span>
                                <span>{totalConcessionPrice.toLocaleString('vi-VN')} đ</span>
                            </div>
                        )}
                        <div className="price-separator"></div>
                        <div className="price-item total">
                            <span>TỔNG CỘNG</span>
                            <span>{ticket.price.total.toLocaleString('vi-VN')} đ</span>
                        </div>
                    </div>
                </div>

                <div className="ticket-footer">
                    <p>Ngày đặt vé: {ticket.bookingDate}</p>
                </div>
            </div>

            <div className="actions">
                <button className="action-btn home-btn" onClick={handleGoHome}>
                    Về trang chủ
                </button>
            </div>
        </div>
    );
};

export default Ticket;
