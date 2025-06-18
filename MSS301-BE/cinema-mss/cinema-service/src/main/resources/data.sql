INSERT INTO cinema_service.concession_products
VALUES (1, 'Chocolate Box', 35000, 'chocolate_box.jpg', 'M'),
       (2, 'Ice Cream', 20000, 'ice_cream.jpg', 'S'),
       (3, 'Combo Meal', 85000, 'combo_meal.jpg', 'L'),
       (4, 'Fanta', 25000, 'fanta.jpg', 'M'),
       (5, 'Candy Bag', 30000, 'candy_bag.jpg', 'M'),
       (6, 'Cheese Popcorn', 60000, 'cheese_popcorn.jpg', 'L'),
       (7, 'Water Bottle', 15000, 'water_bottle.jpg', 'S'),
       (8, 'Pizza Slice', 45000, 'pizza_slice.jpg', 'M'),
       (9, 'Iced Coffee', 30000, 'iced_coffee.jpg', 'M'),
       (10, 'Combo Snack', 75000, 'combo_snack.jpg', 'L');

INSERT INTO cinema_service.genres
VALUES (1, 'Action'),
       (4, 'Animation'),
       (3, 'Comedy'),
       (2, 'Drama'),
       (5, 'Sci-Fi');

INSERT INTO cinema_service.film_personel
VALUES (1, '1970-07-30 00:00:00.000000', 'https://cdn.galaxycine.vn/media/2023/11/13/500_1699849044207.jpg',
        'Celine Song', 1),
       (2, '1977-09-15 00:00:00.000000', 'https://cdn.galaxycine.vn/media/a/k/akivaschaffer.jpg', 'Akiva Schaffer', 2),
       (3, '1971-08-29 00:00:00.000000',
        'https://cdn.galaxycine.vn/media/2020/9/23/1985-ralphfiennes-700x875-aaony8qz0oth_1600832198204.jpg',
        'Ralph Fiennes', 1),
       (4, '1967-08-08 00:00:00.000000', 'https://cdn.galaxycine.vn/media/s/c/scarlet-johannson.jpg',
        'Scarlett Johansson', 1),
       (5, '1953-06-13 00:00:00.000000',
        'https://cdn.galaxycine.vn/media/2023/11/6/milo-machado-graner-500_1699243349876.jpg', 'Milo Machado-Graner',
        2),
       (6, '2025-06-17 13:38:31.000000', 'https://cdn.galaxycine.vn/media/2023/11/6/swann-arlaud-500_1699243487297.jpg',
        'Swann Arlaud', 1),
       (7, '2000-06-17 13:39:37.000000', 'https://cdn.galaxycine.vn/media/2023/11/6/500_1699240101123.jpg',
        'Justine Triet', 1),
       (8, '1970-06-17 13:40:29.000000', 'https://cdn.galaxycine.vn/media/2022/6/8/aa-1_1654682835798.jpg',
        'Aaron Taylor-Johnson', 1),
       (9, '2012-06-17 22:34:25.000000',
        'https://static.wikia.nocookie.net/filmguide/images/7/7e/Apple_Studios.png/revision/latest/smart/width/386/height/259?cb=20241012005318',
        'Apple Studios', 1),
       (10, '1978-06-17 22:42:11.000000', 'https://cdn.galaxycine.vn/media/2023/11/22/pedro-pascal-1_1700643958370.jpg',
        'Pedro Pascal', 1);

INSERT INTO cinema_service.hall_types
VALUES (1, 15, 'Standard', 10),
       (2, 20, 'IMAX', 12),
       (3, 12, '4DX', 8),
       (4, 10, 'VIP', 6),
       (5, 8, 'Couple', 5),
       (6, 16, 'Deluxe', 10),
       (7, 18, 'Platinum', 12),
       (8, 10, 'Economy', 8),
       (9, 16, 'Gold', 11),
       (10, 14, 'Silver', 9),
       (11, 12, 'Family', 7),
       (12, 20, 'Premium IMAX', 13);


INSERT INTO cinema_service.cinema_halls
VALUES (1, 'Hall A', '2D', 1),
       (2, 'Hall B', 'IMAX', 2),
       (3, 'Hall C', '4DX', 3),
       (4, 'Hall D', 'VIP', 4),
       (5, 'Hall E', '2D', 2),
       (6, 'Hall F', '2D', 2),
       (7, 'Hall G', 'IMAX', 3),
       (8, 'Hall H', '4DX', 4),
       (9, 'Hall I', 'VIP', 2),
       (10, 'Hall J', '2D', 10),
       (11, 'Hall K', 'Premium IMAX', 2),
       (12, 'Hall L', 'Deluxe', 8);

INSERT INTO cinema_service.movies
VALUES (1, 16, 148, 'https://cdn.galaxycine.vn/media/2025/5/9/mi8-500_1746763198482.jpg', 'NOW_SHOWING',
        'Phim mới Mission: Impossible - The Final Reckoning/ Nhiệm Vụ: Bất Khả Thi - Nghiệp Báo Cuối Cùng là phần cuối của loạt phim hành động lừng danh do Tom Cruise thủ vai chính.',
        'Nhiệm Vụ: Bất Khả Thi - Nghiệp Báo Cuối Cùng'),
       (2, 0, 100, 'https://cdn.galaxycine.vn/media/2025/6/3/kim-nguu-500_1748925145963.jpg', 'NOW_SHOWING',
        'Bố mẹ của chú bé Quỳnh bị kết tội chiếm đoạt bảo vật triều đình.', 'Trạng Quỳnh Nhí: Truyền Thuyết Kim Ngưu'),
       (3, 13, 169,
        'https://cdn.galaxycine.vn/media/2025/5/1/mua-lua---anh-trai-vuot-ngan-chong-gai-movie-2_1746078168404.jpg',
        'NOW_SHOWING', 'Những câu chuyện chưa từng lên sóng', 'Mưa Lửa - Anh Trai Vượt Ngàn Chông Gai Movie'),
       (4, 6, 105, 'https://cdn.galaxycine.vn/media/2025/6/9/the-wages-of-fear-2_1749453731023.jpg', 'NOW_SHOWING',
        'Công ty dầu mỏ tại Trung Mỹ đưa ra khoản tiền lớn cho bất kỳ ai đồng ý lái hai chiếc xe tải chở đầy nitroglycerin vượt qua 500 km đường ray để dập lửa ở một giếng dầu. ',
        'Cái Giá Của Sự Sợ Hãi'),
       (5, 16, 150, 'https://cdn.galaxycine.vn/media/2025/5/26/ballerina-500_1748252018554.jpg', 'NOW_SHOWING',
        'Lấy bối cảnh giữa sự kiện của Sát thủ John Wick: Phần 3 – Chuẩn Bị Chiến Tranh',
        'Từ Vũ Trụ John Wick: Ballerina'),
       (6, 18, 180,
        'https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F05-2025%2Fmuon-hon-doat-xac.jpg&w=1920&q=75',
        'NOW_SHOWING',
        'A brother and sister uncover a terrifying ritual at the secluded home of their new foster mother.',
        'BRING HER BACK'),
       (7, 18, 120,
        'https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F06-2025%2Fmuon-ruou-day-keo.jpg&w=1920&q=75',
        'NOW_SHOWING',
        'n 1997, when the Asian financial crisis hit Korea, Gukbo, the number one Soju company was on the brink of bankruptcy',
        'BIG DEAL'),
       (8, 13, 150,
        'https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F06-2025%2Felio-poster.png&w=1920&q=75',
        'NOW_SHOWING',
        'Elio, a space fanatic with an active imagination, finds himself on a cosmic misadventure where he must form new bonds with alien lifeforms',
        'ELIO (P) DUB'),
       (9, 10, 120, 'https://cdn.galaxycine.vn/media/2025/5/23/doraemon-movie-44-2_1748017492103.jpg', 'COMING_SOON',
        'Phim Điện Ảnh Doraemon: Nobita Và Cuộc Phiêu Lưu Vào Thế Giới Trong Tranh', 'Doraemon'),
       (10, 16, 130, 'https://cdn.galaxycine.vn/media/2025/6/3/cuon-bang-qu-am-500_1748940630172.jpg', 'COMING_SOON',
        '13 năm sau sự biến mất bí ẩn của em trai, Keita vẫn sống trong dằn vặt và hy vọng. Một cuộn băng VHS từ mẹ hé lộ hình ảnh cuối cùng của Hinata trước khi cậu bé mất tích trong căn nhà hoang trên núi Mushiro.',
        'Cuộn Băng Quỷ Ám'),
       (11, 10, 110, 'https://cdn.galaxycine.vn/media/2025/6/2/dan-da-dan-1_1748857295325.jpg', 'COMING_SOON',
        'Để điều tra vụ việc liên quan tới gia đình Jiji', 'Dan Da Dan: Tà Nhãn'),
       (12, 0, 100, 'https://cdn.galaxycine.vn/media/2025/5/16/lilo-500_1747389395062.jpg', 'COMING_SOON',
        'Cô bé Lilo sống tại Hawaii cùng chị gái Nani sau khi cha mẹ qua đời. Lilo thường cảm thấy cô đơn',
        ' khó hòa nhập với bạn bè đồng trang lứa. Chính vì vậy'),
       (13, 0, 170, 'https://cdn.galaxycine.vn/media/2025/2/17/bi-kip-luyen-rong-500_1739776695143.jpg', 'COMING_SOON',
        'Câu chuyện về một chàng trai trẻ với ước mơ trở thành thợ săn rồng  nhưng định mệnh lại đưa đẩy anh đến tình bạn bất ngờ với một chú rồng , nhưng định mệnh lại đưa đẩy anh đến tình bạn bất ngờ với một chú rồng',
        'Bí Kíp Luyện Rồng'),
       (14, 18, 160, 'https://cdn.galaxycine.vn/media/2025/5/29/qu-tha-ma-bat-500_1748503238035.jpg', 'COMING_SOON',
        'Emma Schmidt, một phụ nữ 46 tuổi, đã phải chịu đựng suốt nhiều năm với các triệu chứng đáng sợ như mất ý thức,',
        'Quỷ Tha Ma Bắt'),
       (15, 18, 98, 'https://cdn.galaxycine.vn/media/2025/6/3/duoi-day-ho-p-500_1748921679301.jpg', 'COMING_SOON',
        'Dưới Đáy Hồ là phim kinh dị siêu nhiên chủ đề song trùng đầu tiên tại Việt Nam', 'Dưới Đáy Hồ'),
       (16, 0, 84, 'https://cdn.galaxycine.vn/media/2025/5/19/de-men-500_1747627703806.jpg', 'COMING_SOON',
        'Bộ phim kể về chuyến phiêu lưu của 2 anh em Dế Mèn – Dế Trũi tại xóm lầy lội. Nơi những nguy hiểm liên tục rình rập trước sự hiếu kỳ của anh em nhà Dế. Để rồi vượt qua nhiều hiểm nguy',
        'Dế Mèn: Cuộc Phiêu Lưu Tới Xóm Lầy Lội'),
       (17, 16, 91, 'https://cdn.galaxycine.vn/media/2025/6/11/horror-express_1749624500017.jpg', 'COMING_SOON',
        'Trong nỗ lực cứu vãn kênh Youtube tâm huyết Jyujuring quyết định tổ chức livestream ngay tại một ngôi nhà hoang bí ẩn',
        'Bóng Ma Cõi Mạng'),
       (18, 16, 120, 'https://cdn.galaxycine.vn/media/2025/6/10/halaba-500_1749539454772.jpg', 'COMING_SOON',
        'Thanh tra Dan – kẻ mang biệt danh rùng rợn “Dan Trăm Xác” – là một cảnh sát liều mạng,nổi tiếng với quá khứ đẫm máu và những phi vụ bất chấp luật lệ. Sau một sai lầm kinh hoàng trong lúc thực hiện nhiệm vụ',
        'Halabala: Rừng Ma Tế Xác'),
       (19, 7, 151, 'https://cdn.galaxycine.vn/media/2024/2/27/anatomy-of-a-fall_1709024807223.png', 'COMING_SOON',
        'Cuộc sống của nhà văn Sandra cùng chồng Samuel và cậu con trai mù Daniel ở căn nhà gỗ hẻo lánh trên dãy Alps bất ngờ bị xáo trộn khi Samuel được tìm thấy đã chết một cách bí ẩn trên tuyết',
        'Kỳ Án Trên Đồi Tuyết'),
       (20, 0, 120, 'https://cdn.galaxycine.vn/media/2025/4/28/f1-500_1745833699523.jpg', 'COMING_SOON',
        '1® kể về Sonny Hayes (Brad Pitt) được mệnh danh là \"Huyền thoại chưa từng được gọi tên\" là ngôi sao sáng giá nhất của FORMULA 1 trong những năm 1990 cho đến khi một vụ tai nạn trên đường đua suýt nữa đã kết thúc sự nghiệp của anh.',
        'F1®');

INSERT INTO cinema_service.movie_genres
VALUES (1, 1),
       (2, 2),
       (3, 4),
       (4, 4),
       (5, 5),
       (6, 4),
       (7, 2),
       (8, 5),
       (9, 5),
       (10, 4),
       (11, 4),
       (12, 4),
       (13, 1),
       (14, 3),
       (15, 2),
       (16, 5);


INSERT INTO cinema_service.showtimes
VALUES (1, '2025-06-06 20:30:00.000000', '2025-06-06 18:00:00.000000', 1, 1),
       (2, '2025-06-06 17:00:00.000000', '2025-06-06 15:00:00.000000', 2, 2),
       (3, '2025-06-06 23:49:00.000000', '2025-06-06 21:00:00.000000', 2, 3),
       (4, '2025-06-06 11:45:00.000000', '2025-06-06 10:00:00.000000', 3, 4),
       (5, '2025-06-07 00:30:00.000000', '2025-06-06 22:00:00.000000', 1, 5);


INSERT INTO cinema_service.ticket_types
VALUES (1, 'Adult'),
       (2, 'Child'),
       (5, 'Couple'),
       (4, 'Senior'),
       (3, 'Student');


INSERT INTO cinema_service.showtime_ticket_prices
VALUES (1, 90000, 1, 1),
       (2, 70000, 1, 2),
       (3, 80000, 2, 1),
       (4, 75000, 3, 3),
       (5, 85000, 4, 1);















