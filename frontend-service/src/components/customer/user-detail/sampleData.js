export const userData = {
  name: "Tran Minh Nhut",
  avatar: "",
  point: 0,
  email: "NhutTMSE172865@fpt.edu.vn",
  dateOfBirth: "29/12/2003",
  phoneNumber: '0384463039',
  password: "12345678",
};

export const spendingData = {
  year: 2025,
  total: 0,
  milestones: [
    { value: 0, icon: "🥇" },
    { value: 2000000, icon: "⭐" },
    { value: 4000000, icon: "🏆" },
  ],
};

export const transactionHistory = [
  {
    id: 1,
    bookingCode: "BK202412001",
    movieName: "Doraemon: Nobita và Vùng Đất Lý Tưởng trên Bầu Trời",
    cinema: "Galaxy Cinema - Tân Bình",
    date: "2024-12-15",
    time: "19:30",
    seats: ["A5", "A6"],
    totalPrice: 180000,
    status: "completed",
    poster: "/src/assets/doraemon-movie.jpg",
    bookingDate: "2024-12-10"
  },
  {
    id: 2,
    bookingCode: "BK202412002",
    movieName: "Thám Tử Kien",
    cinema: "Galaxy Cinema - Quận 7",
    date: "2024-12-20",
    time: "20:00",
    seats: ["C8"],
    totalPrice: 90000,
    status: "upcoming",
    poster: "/src/assets/tham-tu-kien-poster.jpg",
    bookingDate: "2024-12-12"
  },
  {
    id: 4,
    bookingCode: "BK202411002",
    movieName: "Chống Gai",
    cinema: "Galaxy Cinema - Quận 1",
    date: "2024-11-18",
    time: "21:00",
    seats: ["D2"],
    totalPrice: 90000,
    status: "cancelled",
    poster: "/src/assets/chong-gai.jpg",
    bookingDate: "2024-11-15"
  },
]; 