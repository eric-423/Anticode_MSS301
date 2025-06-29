
const topMoviesData = [
    { name: 'Lật Mặt 7', value: 400 },
    { name: 'Doraemon: Nobita và Bản Giao Hưởng Địa Cầu', value: 300 },
    { name: 'Godzilla x Kong: Đế Chế Mới', value: 300 },
    { name: 'Các Phim Khác', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const moviesData = [
    { id: 1, title: 'Lật Mặt 7: Một Điều Ước', genre: 'Hành động, Gia đình', duration: '135 phút', releaseDate: '26/04/2024', status: 'Đang chiếu' },
    { id: 2, title: 'Doraemon: Nobita và Bản Giao Hưởng Địa Cầu', genre: 'Hoạt hình', duration: '115 phút', releaseDate: '24/05/2024', status: 'Đang chiếu' },
    { id: 3, title: 'Gia Tài Của Ngoại', genre: 'Tình cảm, Gia đình', duration: '125 phút', releaseDate: '07/06/2024', status: 'Sắp chiếu' },
    { id: 4, title: 'Haikyu!!: Trận Chiến Bãi Phế Liệu', genre: 'Hoạt hình, Thể thao', duration: '85 phút', releaseDate: '15/05/2024', status: 'Đã chiếu' },
];

const cinemasData = [
    { id: 1, name: 'Galaxy Nguyễn Du', address: '116 Nguyễn Du, P. Bến Thành, Q.1, TPHCM', rooms: 8, status: 'Hoạt động' },
    { id: 2, name: 'Galaxy Tân Bình', address: '246 Nguyễn Hồng Đào, P.14, Q.Tân Bình, TPHCM', rooms: 7, status: 'Hoạt động' },
    { id: 3, name: 'Galaxy Kinh Dương Vương', address: '718bis Kinh Dương Vương, P.13, Q.6, TPHCM', rooms: 6, status: 'Hoạt động' },
    { id: 4, name: 'Galaxy Quang Trung', address: 'L3-Co.opmart, 304A Quang Trung, P.11, Q.Gò Vấp, TPHCM', rooms: 7, status: 'Bảo trì' },
];

const productsData = [
    { id: 1, name: 'Bắp rang bơ vị phô mai', category: 'Đồ ăn', price: '75.000đ', stock: 120, status: 'Còn hàng' },
    { id: 2, name: 'Nước ngọt Coca-Cola', category: 'Đồ uống', price: '35.000đ', stock: 300, status: 'Còn hàng' },
    { id: 3, name: 'Combo 1 (1 Bắp + 2 Nước)', category: 'Combo', price: '120.000đ', stock: 80, status: 'Còn hàng' },
    { id: 4, name: 'Mô hình nhân vật Doraemon', category: 'Sản phẩm rạp', price: '250.000đ', stock: 15, status: 'Sắp hết' },
    { id: 5, name: 'Hotdog', category: 'Đồ ăn', price: '45.000đ', stock: 0, status: 'Hết hàng' },
];

export default {
    topMoviesData,
    COLORS,
    moviesData,
    cinemasData,
    productsData
};
