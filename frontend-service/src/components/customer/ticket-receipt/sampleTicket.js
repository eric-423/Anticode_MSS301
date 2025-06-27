export const sampleTicket = {
    id: 'TICKET12345XYZ',
    movie: {
        title: 'LẬT MẶT 7: MỘT ĐIỀU ƯỚC',
        posterUrl: 'https://koicine.com/wp-content/uploads/2024/03/Lat-Mat-7-Mot-Dieu-Uoc-819x1024.jpg',
        ageRating: 'C13',
        duration: '138 phút',
        format: '2D Phụ đề'
    },
    cinema: {
        name: 'Hall C',
        address: '116 Nguyễn Du, P. Bến Thành, Quận 1, TP. HCM',
        screen: 'Phòng chiếu 2'
    },
    showtime: {
        date: 'Thứ Sáu, 28/06/2024',
        time: '19:30'
    },
    seats: ['F5', 'F6'],
    concessions: [
        { name: 'Bắp rang bơ vị caramen', quantity: 1, price: 75000 },
        { name: 'Nước ngọt (Lớn)', quantity: 2, price: 45000 },
    ],
    price: {
        tickets: 180000,
        concessions: 165000,
        total: 345000
    },
    bookingDate: '26/06/2024 23:50',
    qrValue: 'https://example.com/ticket/TICKET12345XYZ'
};
