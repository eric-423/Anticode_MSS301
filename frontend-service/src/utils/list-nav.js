const LIST_NAVIGATION = [
  {
    name: "Phim",
    path: '/'
  },
  {
    name: "Sản Phẩm",
    path: '/product',
    sub_items: [
      { name: "Đồ Ăn Kèm" },
    ],
  },
  {
    name: "Sự Kiện",
    sub_items: [
      { name: "Ưu Đãi" },
      { name: "Phim Hay Tháng" },
      { name: "Anh Trai Vượt Ngàn Chông Gai" },
      { name: "Galaxy Merch" }
    ],
  },
  {
    name: "Rạp/Giá Vé",
    path: '/ticket-price'
  },
];

export default LIST_NAVIGATION;
