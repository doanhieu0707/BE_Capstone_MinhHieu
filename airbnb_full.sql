-- =========================
-- 1. CREATE DATABASE
-- =========================
DROP DATABASE IF EXISTS airbnb_db;
CREATE DATABASE airbnb_db;
USE airbnb_db;

-- =========================
-- 2. USERS
-- =========================
CREATE TABLE users (
    userID INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(100),
    phone VARCHAR(20),
    avatar VARCHAR(255),
    role VARCHAR(20) DEFAULT 'USER'
);

-- =========================
-- 3. ROOMS
-- =========================
CREATE TABLE rooms (
    roomID INT AUTO_INCREMENT PRIMARY KEY,
    roomName VARCHAR(255),
    description TEXT,
    price FLOAT,
    location VARCHAR(255),
    image VARCHAR(255),
    userID INT,
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE
);

-- =========================
-- 4. BOOKINGS
-- =========================
CREATE TABLE bookings (
    bookingID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    roomID INT,
    checkIn DATE,
    checkOut DATE,
    guests INT,
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE,
    FOREIGN KEY (roomID) REFERENCES rooms(roomID) ON DELETE CASCADE
);

-- =========================
-- 5. REVIEWS
-- =========================
CREATE TABLE reviews (
    reviewID INT AUTO_INCREMENT PRIMARY KEY,
    userID INT,
    roomID INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    content TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE,
    FOREIGN KEY (roomID) REFERENCES rooms(roomID) ON DELETE CASCADE
);

-- =========================
-- 6. SAMPLE DATA (DEMO)
-- =========================

-- USERS
INSERT INTO users (email, password, fullname, phone, role) VALUES
('admin@gmail.com', '123456', 'Admin', '0900000001', 'ADMIN'),
('user1@gmail.com', '123456', 'Nguyen Van A', '0900000002', 'USER'),
('user2@gmail.com', '123456', 'Tran Van B', '0900000003', 'USER');

-- ROOMS
INSERT INTO rooms (roomName, description, price, location, userID) VALUES
('Villa biển Đà Nẵng', 'View biển cực đẹp', 100, 'Đà Nẵng', 1),
('Căn hộ Sài Gòn', 'Trung tâm quận 1', 50, 'TP.HCM', 1),
('Homestay Đà Lạt', 'Không khí mát mẻ', 40, 'Đà Lạt', 2);

-- BOOKINGS
INSERT INTO bookings (userID, roomID, checkIn, checkOut, guests) VALUES
(2, 1, '2026-05-01', '2026-05-05', 2),
(3, 2, '2026-06-01', '2026-06-03', 1);

-- REVIEWS
INSERT INTO reviews (userID, roomID, rating, content) VALUES
(2, 1, 5, 'Phòng rất đẹp, sẽ quay lại'),
(3, 2, 4, 'Ổn áp, giá hợp lý');

-- =========================
-- 7. QUERY TEST (OPTIONAL)
-- =========================

-- Lấy danh sách phòng + chủ phòng
SELECT r.*, u.fullname 
FROM rooms r
JOIN users u ON r.userID = u.userID;

-- Lấy booking của user
SELECT * FROM bookings WHERE userID = 2;

-- Lấy review của phòng
SELECT * FROM reviews WHERE roomID = 1;