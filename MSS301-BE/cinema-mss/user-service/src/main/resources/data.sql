INSERT INTO user_service.roles
VALUES (2, 'ADMIN'),
       (3, 'MANAGER'),
       (1, 'USER');

INSERT INTO user_service.member_ship
VALUES (1, 1, 'UNRANK'),
       (2, 100, 'GOLD'),
       (3, 1000, 'PLATINUM');

INSERT INTO user_service.users
VALUES (1, '2025-06-17 10:06:09.000000', '2000-06-22 10:06:10.000000', 'user@gmail.com', _binary '', 'NGUYEN VAN USER',
        '>S2\"p3/XAHYDCnxs', '0932111223', 1, 1, 1),
       (2, '2025-06-17 10:08:14.000000', '2025-06-17 10:08:15.000000', 'admin@gmail.com', _binary '', 'LE VAN ADMIN',
        '>S2\"p3/XAHYDCnxs', '0909099983', 100, 2, 2),
       (5, '2025-06-17 10:15:53.000000', '2025-06-17 10:15:53.000000', 'manager@gmail.com', _binary '',
        'TRINH DINH MANAGER', '>S2\"p3/XAHYDCnxs', '9037239287', 76, 1, 3),
       (6, '2025-06-17 10:17:10.000000', '2025-06-17 10:17:11.000000', 'huyle123@gmail.com', _binary '',
        'HUUUUYYYY LEEEEE', '>S2\"p3/XAHYDCnxs', '0932203222', 100000000, 3, 1),
       (7, '2025-06-17 10:18:10.000000', '2025-06-17 10:18:11.000000', 'antretrau@gmail.com', _binary '',
        'AN TRE TRAU', '$2a$12$DfDgDBuH5KtKpY.3m5IowOUk3e2XhIFtQYDV4Vg4fjO1da2IpzQfW', '0909099992', 99999999, 3, 1),
       (8, '2025-06-17 06:35:22.168000', NULL, 'nhuttmse172865@fpt.edu.vn', _binary '', 'Tran Minh Nhut',
        '$2a$10$27TaVxX6CqWHZUdiCHpbJ.2H2Ih6WDCfTIXq/JlY./ra/3fcmiWV6', '0384463039', 0, NULL, 1);



