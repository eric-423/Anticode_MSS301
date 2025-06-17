INSERT INTO hall_types (type_id, type_name, row_count, column_count) VALUES
                                                                         (1, 'Standard', 10, 15),
                                                                         (2, 'IMAX', 12, 20),
                                                                         (3, '4DX', 8, 12),
                                                                         (4, 'VIP', 6, 10),
                                                                         (5, 'Couple', 5, 8);

-- Bảng cinema_halls
INSERT INTO cinema_halls (hall_id, hall_name, screen_type, hall_type_id) VALUES
                                                                             (1, 'Hall A', '2D', 1),
                                                                             (2, 'Hall B', 'IMAX', 2),
                                                                             (3, 'Hall C', '4DX', 3),
                                                                             (4, 'Hall D', 'VIP', 4),
                                                                             (5, 'Hall E', '2D', 1);


-- Bảng concession_products
INSERT INTO concession_products (product_id, product_name, price, product_image_url, size) VALUES
                                                                                               (1, 'Popcorn Combo', 70000, 'popcorn_combo.jpg', 'L'),
                                                                                               (2, 'Coke', 25000, 'coke.jpg', 'M'),
                                                                                               (3, 'Nachos', 30000, 'nachos.jpg', 'M'),
                                                                                               (4, 'Sprite', 25000, 'sprite.jpg', 'M'),
                                                                                               (5, 'Hot Dog', 40000, 'hotdog.jpg', 'L');


-- Bảng film_personel
INSERT INTO film_personel (personel_id, name, role, date_of_birth, image_url) VALUES
                                                                                  (1, 'Christopher Nolan', 1, '1970-07-30', 'nolan.jpg'),
                                                                                  (2, 'Tom Hardy', 2, '1977-09-15', 'hardy.jpg'),
                                                                                  (3, 'Emma Thomas', 1, '1971-08-29', 'emma.jpg'),
                                                                                  (4, 'Lee Unkrich', 1, '1967-08-08', 'lee.jpg'),
                                                                                  (5, 'Tim Allen', 2, '1953-06-13', 'tim.jpg');

-- Bảng genres
INSERT INTO genres (genre_id, genre_name) VALUES
                                              (1, 'Action'),
                                              (2, 'Drama'),
                                              (3, 'Comedy'),
                                              (4, 'Animation'),
                                              (5, 'Sci-Fi');



-- Bảng movies
INSERT INTO movies (movie_id, title, synopsis, duration, status, age_ranging, image_url) VALUES
                                                                                             (1, 'Inception', 'A mind-bending thriller', 148, 1, 16, 'inception.jpg'),
                                                                                             (2, 'Toy Story 4', 'Toys go on an adventure', 100, 1, 0, 'toystory4.jpg'),
                                                                                             (3, 'Interstellar', 'Space exploration epic', 169, 1, 13, 'interstellar.jpg'),
                                                                                             (4, 'Coco', 'Boy travels to the Land of the Dead', 105, 1, 6, 'coco.jpg'),
                                                                                             (5, 'Tenet', 'Inversion-based action', 150, 1, 16, 'tenet.jpg');

-- Bảng showtimes
INSERT INTO showtimes (showtime_id, start_time, end_time, cinema_hall_id, movie_id) VALUES
                                                                                        (1, '2025-06-06 18:00:00', '2025-06-06 20:30:00', 1, 1),
                                                                                        (2, '2025-06-06 15:00:00', '2025-06-06 17:00:00', 2, 2),
                                                                                        (3, '2025-06-06 21:00:00', '2025-06-06 23:49:00', 2, 3),
                                                                                        (4, '2025-06-06 10:00:00', '2025-06-06 11:45:00', 3, 4),
                                                                                        (5, '2025-06-06 22:00:00', '2025-06-07 00:30:00', 1, 5);

-- Bảng ticket_types
INSERT INTO ticket_types (ticket_type_id, type_name) VALUES
                                                         (1, 'Adult'),
                                                         (2, 'Child'),
                                                         (3, 'Student'),
                                                         (4, 'Senior'),
                                                         (5, 'Couple');

-- Bảng showtime_ticket_prices
INSERT INTO showtime_ticket_prices (showtime_ticket_price_id, showtime_id, ticket_type_id, ticket_price) VALUES
                                                                                                             (1, 1, 1, 90000),
                                                                                                             (2, 1, 2, 70000),
                                                                                                             (3, 2, 1, 80000),
                                                                                                             (4, 3, 3, 75000),
                                                                                                             (5, 4, 1, 85000);
