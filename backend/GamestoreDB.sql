--Creating the Tables and referencing foreign keys
-- User Table
CREATE TABLE [User] (
    user_id INT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL
    CONSTRAINT chk_user_role
            CHECK (role in ('Customer','Admin')),
    CONSTRAINT uq_user_username UNIQUE (username),
    CONSTRAINT uq_user_email UNIQUE (email)
);

-- Customer Table
CREATE TABLE Customer (
    user_id INT PRIMARY KEY FOREIGN KEY REFERENCES [User](user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    address VARCHAR(255)
);

-- Admin Table
CREATE TABLE Admin (
    user_id INT PRIMARY KEY FOREIGN KEY REFERENCES [User](user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    full_name VARCHAR(100) NOT NULL,
    access_level INT NOT NULL,
    last_login DATETIME DEFAULT GETDATE()
);

-- Game Table
CREATE TABLE Game (
    game_id INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(500),
    price DECIMAL(10,2)
        CONSTRAINT chk_game_price
            CHECK (price >= 0),
    genre VARCHAR(50),
    release_date DATE,
    platform VARCHAR(50),
    image_url VARCHAR(255)
);


-- Inventory Table
CREATE TABLE Inventory (
    game_id INT PRIMARY KEY FOREIGN KEY REFERENCES Game(game_id) ON DELETE CASCADE ON UPDATE CASCADE,
    quantity INT NOT NULL DEFAULT 0,
    last_supplied DATE DEFAULT GETDATE()
);

-- Order Table
CREATE TABLE [Order] (
    order_id INT PRIMARY KEY,
    order_date DATE NOT NULL DEFAULT GETDATE(),
    customer_id INT FOREIGN KEY REFERENCES Customer(user_id) ON UPDATE CASCADE,
    status VARCHAR(20)
        CONSTRAINT chk_order_status
            CHECK (status in ('Pending','Completed','Cancelled'))
);

-- OrderItem Table
CREATE TABLE OrderItem (
    order_id INT FOREIGN KEY REFERENCES [Order](order_id) ON UPDATE CASCADE ON DELETE CASCADE,
    game_id INT FOREIGN KEY REFERENCES Game(game_id) ON UPDATE CASCADE,
    unit_price DECIMAL(10,2)
        CONSTRAINT chk_orderitem_unitprice
            CHECK (unit_price >= 0),
    quantity INT
        CONSTRAINT chk_orderitem_quantity
            CHECK (quantity > 0),
    PRIMARY KEY (order_id, game_id)
);

-- Payment Table
CREATE TABLE Payment (
    payment_id INT PRIMARY KEY,
    payment_date DATE NOT NULL DEFAULT GETDATE(),
    order_id INT UNIQUE FOREIGN KEY REFERENCES [Order](order_id) ON UPDATE CASCADE,
    status VARCHAR(20)
        CONSTRAINT chk_status
            CHECK (status in ('Pending','Paid','Refunded')),
    method VARCHAR(50)
);


-- INDEXES
-- User Table
CREATE INDEX idx_user_username ON [User](username);
CREATE INDEX idx_user_email ON [User](email);

-- Customer Table
CREATE INDEX idx_customer_userid ON Customer(user_id);

-- Admin Table
CREATE INDEX idx_admin_userid ON Admin(user_id);

-- Game Table
CREATE INDEX idx_game_title ON Game(title);
CREATE INDEX idx_game_genre ON Game(genre);

-- Inventory Table
CREATE INDEX idx_inventory_gameid ON Inventory(game_id);

-- Order Table
CREATE INDEX idx_order_customerid ON [Order](customer_id);

-- OrderItem Table
CREATE INDEX idx_orderitem_orderid ON OrderItem(order_id);
CREATE INDEX idx_orderitem_gameid ON OrderItem(game_id);

-- Payment Table
CREATE INDEX idx_payment_orderid ON Payment(order_id);


-- Inserting some data into Tables
-- User Table
INSERT INTO [User] (user_id, username, email, password, role) VALUES
(1, 'ahmed123', 'ahmed@gmail.com', 'pass123', 'customer'),
(2, 'zara_khan', 'zara@gmail.com', 'zpass123', 'customer'),
(3, 'bilal_coder', 'bilal@gmail.com', 'bilalpass', 'admin'),
(4, 'sanaQ', 'sanaq@gmail.com', 'sana456', 'customer'),
(5, 'fahad_dev', 'fahad@gmail.com', 'fahad789', 'admin'),
(6, 'usman_99', 'usman@gmail.com', 'usmanpass', 'customer'),
(7, 'maria_star', 'maria@gmail.com', 'maria456', 'customer'),
(8, 'hassan007', 'hassan@gmail.com', 'hassan007', 'customer'),
(9, 'komal.r', 'komal@gmail.com', 'komalpw', 'customer'),
(10, 'ali_theboss', 'ali@gmail.com', 'ali123', 'customer'),
(11, 'hiba_dev', 'hiba@gmail.com', 'hibapass', 'admin'),
(12, 'danish_s', 'danish@gmail.com', 'danish456', 'customer'),
(13, 'iqra_b', 'iqra@gmail.com', 'iqra789', 'customer'),
(14, 'taha_coder', 'taha@gmail.com', 'tahapass', 'customer'),
(15, 'areeba_m', 'areeba@gmail.com', 'areeba123', 'customer');

--Customer Table
INSERT INTO Customer (user_id, full_name, phone, address) VALUES
(1, 'Ahmed Ali', '03001234567', 'Gulberg, Lahore'),
(2, 'Zara Khan', '03111234567', 'DHA Phase 6, Karachi'),
(4, 'Sana Qureshi', '03451234567', 'Bahria Town, Islamabad'),
(6, 'Usman Raza', '03211234567', 'Model Town, Lahore'),
(7, 'Maria Saeed', '03011239876', 'Clifton, Karachi'),
(8, 'Hassan Ahmed', '03411237654', 'G-11, Islamabad'),
(9, 'Komal Rizwan', '03141239876', 'Askari 11, Lahore'),
(10, 'Ali Raza', '03321239876', 'North Nazimabad, Karachi'),
(12, 'Danish Shaikh', '03061239876', 'Gulshan-e-Iqbal, Karachi'),
(13, 'Iqra Bashir', '03441239876', 'Satellite Town, Rawalpindi'),
(14, 'Taha Siddiqui', '03221239876', 'Johar Town, Lahore'),
(15, 'Areeba Malik', '03131239876', 'F-10, Islamabad');

-- Admin Table
INSERT INTO Admin (user_id, full_name, access_level, last_login) VALUES
(3, 'Bilal Ahmed', 2, '2025-04-15'),
(5, 'Fahad Khan', 3, '2025-04-10'),
(11, 'Hiba Tariq', 1, '2025-04-18');

--Game table
INSERT INTO Game (game_id, title, description, price, genre, release_date, platform, image_url) VALUES
(101, 'Punjab Warriors', 'Join the ranks of legendary fighters from Punjab in this epic battle game. Defend your land with honor, courage, and raw power.', 1299.00, 'Action', '2024-12-01', 'PC, Mobile', 'punjab.jpeg'),
(102, 'Shadow of the Sapphire Realms', 'Embark on a mystical journey across fractured kingdoms where ancient sapphires hold the key to forgotten magic. Customize your hero, forge alliances, and shape the fate of the realms in this epic RPG', 799.00, 'RPG', '2023-08-21', 'PC, PlayStation, Xbox', 'shadow-realms.png'),
(103, 'Cricket Champions', 'Lead your team to victory in this action-packed cricket simulator. Master batting, bowling, and strategy to become the ultimate champion.', 999.00, 'Sports', '2023-03-01', 'Mobile', 'cricket.jpeg'),
(104, 'Echo Drift', 'Race through shifting soundscapes in a sleek, futuristic world where echoes shape the path ahead. Navigate the noise, dodge distortions, and ride the rhythm in this immersive audio-driven adventure.', 1149.00, 'Racing', '2024-02-15', 'PlayStation, Mobile', 'echo-drift.png'),
(105, 'Ludo Pro', 'Classic Ludo with power-ups and multiplayer. Test how far your luck will take you, earn rewards, and move up the rating ladder', 499.00, 'Board', '2021-07-10', 'Mobile', 'ludo-pro.png'),
(106, 'The Last Man', 'In a world overrun by chaos, you are the final survivor. Scavenge, fight, and uncover the truth in this gripping post-apocalyptic adventure.', 1399.00, 'Fighting', '2023-06-06', 'Xbox, PlayStation', 'last-man.jpeg'),
(107, 'Racecar Pro', 'Buckle up for high-speed thrills in this realistic racing simulator. Fine-tune your car, burn rubber, and dominate the tracks.', 749.00, 'Racing', '2024-03-19', 'Mobile,PC, PlayStation, Xbox', 'racecar-pro.jpeg'),
(108, 'Dragon Wars', 'Command mighty dragons in explosive aerial battles. Conquer kingdoms, unleash firestorms, and prove your dominance in the skies.', 1599.00, 'Adventure', '2024-05-05', 'PC, Xbox, PlayStation', 'dragon-wars.jpeg'),
(109, 'Cyber Lahore', 'Step into a futuristic version of Lahore, where neon lights and cyber-enhanced rebels battle for control. Hack, race, and fight your way through the digital underworld.', 1799.00, 'Shooter', '2024-09-09', 'PC, Xbox, Mobile', 'cyber-lahore.jpeg'),
(110, 'Jet Wars', 'Engage in high-octane dogfights across the globe. Pilot advanced jets, complete daring missions, and outmaneuver your enemies in intense aerial combat.', 899.00, 'Fighter', '2023-12-12', 'PC', 'jet-wars.jpeg'),
(111, 'Chai vs Coffee', 'A hilarious and chaotic food fight between two caffeinated rivals! Pick your side and brew up some mayhem in this quirky arcade brawler.', 649.00, 'Arcade', '2024-01-01', 'PC, Mobile', 'chai.jpeg'),
(112, 'Metro Run', 'Dash through crowded subway stations and high-speed trains in this fast-paced endless runner. Dodge obstacles and collect power-ups as you race to freedom.', 399.00, 'Adventure', '2022-04-04', 'Mobile, PlayStation, Xbox', 'metro-run.jpeg'),
(113, 'Motor GP', 'Experience the speed and precision of professional motorcycle racing. Compete on iconic tracks and rise through the ranks to become a MotorGP legend.', 299.00, 'Racing', '2021-05-05', 'PC, Xbox, PlayStation, Mobile', 'motor-gp.jpeg');

INSERT INTO Inventory (game_id, quantity, last_supplied) VALUES
(101, 50, '2025-04-01'),
(102, 100, '2025-03-15'),
(103, 200, '2025-03-20'),
(104, 70, '2025-04-05'),
(105, 90, '2025-03-28'),
(106, 300, '2025-04-10'),
(107, 40, '2025-02-25'),
(108, 60, '2025-04-12'),
(109, 35, '2025-03-30'),
(110, 25, '2025-04-15'),
(111, 85, '2025-04-03'),
(112, 120, '2025-03-22'),
(113, 95, '2025-04-07');

INSERT INTO [Order] (order_id, order_date, customer_id, status) VALUES
(201, '2025-04-01', 1, 'Completed'),
(202, '2025-04-02', 2, 'Pending'),
(203, '2025-04-03', 4, 'Completed'),
(204, '2025-04-04', 6, 'Cancelled'),
(205, '2025-04-05', 7, 'Completed'),
(206, '2025-04-06', 8, 'Pending'),
(207, '2025-04-07', 9, 'Completed'),
(208, '2025-04-08', 10, 'Completed'),
(209, '2025-04-09', 12, 'Completed'),
(210, '2025-04-10', 13, 'Pending'),
(211, '2025-04-11', 14, 'Completed'),
(212, '2025-04-12', 15, 'Completed'),
(213, '2025-04-13', 2, 'Completed'),
(214, '2025-04-14', 7, 'Pending'),
(215, '2025-04-15', 1, 'Completed');


INSERT INTO OrderItem (order_id, game_id, unit_price, quantity) VALUES
(201, 101, 1299.00, 1),
(202, 102, 799.00, 2),
(203, 103, 999.00, 1),
(204, 104, 1149.00, 1),
(205, 105, 849.00, 1),
(206, 106, 499.00, 3),
(207, 107, 1399.00, 1),
(208, 108, 749.00, 1),
(209, 109, 1599.00, 2),
(210, 110, 1799.00, 1),
(211, 111, 599.00, 2),
(212, 112, 899.00, 1),
(213, 113, 649.00, 1),
(214, 101, 399.00, 3),
(215, 102, 299.00, 4);


INSERT INTO Payment (payment_id, payment_date, order_id, status, method) VALUES
(301, '2025-04-01', 201, 'Paid', 'Credit Card'),
(302, '2025-04-02', 202, 'Pending', 'Cash on Delivery'),
(303, '2025-04-03', 203, 'Paid', 'PayPal'),
(304, '2025-04-04', 204, 'Refunded', 'Google Pay'),
(305, '2025-04-05', 205, 'Paid', 'Credit Card'),
(306, '2025-04-06', 206, 'Pending', 'Cash on Delivery'),
(307, '2025-04-07', 207, 'Paid', 'PayPal'),
(308, '2025-04-08', 208, 'Paid', 'Google Pay'),
(309, '2025-04-09', 209, 'Paid', 'Credit Card'),
(310, '2025-04-10', 210, 'Pending', 'Cash on Delivery'),
(311, '2025-04-11', 211, 'Paid', 'Credit Card'),
(312, '2025-04-12', 212, 'Paid', 'PayPal'),
(313, '2025-04-13', 213, 'Paid', 'Google Pay'),
(314, '2025-04-14', 214, 'Pending', 'Credit Card'),
(315, '2025-04-15', 215, 'Paid', 'Credit Card');
GO

-- VIEWS
CREATE VIEW CustomerDetailsView AS
(SELECT 
    c.user_id,
    u.username,
    u.email,
    c.full_name,
    c.phone,
    c.address
FROM [User] u
JOIN Customer c ON u.user_id = c.user_id
WHERE u.role = 'customer');
GO

select * from Game;
GO



CREATE VIEW InventoryStatusView AS
SELECT 
    g.game_id,
    g.title,
    g.price,
    g.genre,
    g.platform,
    i.quantity,
    i.last_supplied,
    CASE 
        WHEN i.quantity = 0 THEN 'Out of Stock'
        WHEN i.quantity < 10 THEN 'Low Stock'
        WHEN i.quantity < 50 THEN 'Medium Stock'
        ELSE 'Well Stocked'
    END AS stock_status
FROM Game g
JOIN Inventory i ON g.game_id = i.game_id;
GO

-- OrderSummaryView - Provides a summary of orders with customer details
CREATE VIEW OrderSummaryView AS
SELECT 
    o.order_id,
    o.order_date,
    c.full_name AS customer_name,
    c.phone AS customer_phone,
    o.status AS order_status,
    p.status AS payment_status,
    p.method AS payment_method,
    SUM(oi.unit_price * oi.quantity) AS total_amount
FROM [Order] o
JOIN Customer c ON o.customer_id = c.user_id
JOIN OrderItem oi ON o.order_id = oi.order_id
LEFT JOIN Payment p ON o.order_id = p.order_id
GROUP BY o.order_id, o.order_date, c.full_name, c.phone, o.status, p.status, p.method;
GO

-- DailyRevenueView - Daily sales aggregation
CREATE VIEW DailyRevenueView AS
SELECT 
    CAST(o.order_date AS DATE) AS sale_date,
    COUNT(DISTINCT o.order_id) AS number_of_orders,
    SUM(oi.quantity) AS total_units_sold,
    SUM(oi.quantity * oi.unit_price) AS total_revenue
FROM [Order] o
JOIN OrderItem oi ON o.order_id = oi.order_id
WHERE o.status = 'Completed'
GROUP BY CAST(o.order_date AS DATE);
GO

-- GenrePopularityView - Shows popularity of game genres
CREATE VIEW GenrePopularityView AS
SELECT 
    g.genre,
    COUNT(DISTINCT g.game_id) AS number_of_games,
    SUM(oi.quantity) AS total_units_sold,
    SUM(oi.quantity * oi.unit_price) AS total_revenue
FROM Game g
LEFT JOIN OrderItem oi ON g.game_id = oi.game_id
LEFT JOIN [Order] o ON oi.order_id = o.order_id
WHERE o.status = 'Completed' OR o.status IS NULL
GROUP BY g.genre;
GO


-- TRIGGERS
-- 1. Update Inventory after order
CREATE TRIGGER trg_UpdateInventory
ON OrderItem
AFTER INSERT
AS
BEGIN
    UPDATE Inventory
    SET Inventory.quantity = Inventory.quantity - i.quantity
    FROM Inventory
    INNER JOIN inserted i ON Inventory.game_id = i.game_id
END;
GO


/* SELECT game_id, quantity FROM Inventory WHERE game_id = 101;

INSERT INTO [Order] (order_id, order_date, customer_id, status)
VALUES (220, '2025-04-20', 1, 'Pending');

INSERT INTO OrderItem (order_id, game_id, unit_price, quantity)
VALUES (220, 101, 1299.00, 2);

SELECT game_id, quantity FROM Inventory WHERE game_id = 101; */

CREATE TRIGGER trg_ValidateGamePrice
ON Game
AFTER INSERT, UPDATE
AS
BEGIN
    -- Check if any inserted/updated prices are outside valid range
    IF EXISTS (
        SELECT 1 FROM inserted 
        WHERE price < 100.00 OR price > 5000.00
    )
    BEGIN
        -- Roll back the transaction if invalid prices detected
        RAISERROR('Game price must be between PKR 100 and PKR 5000', 16, 1)
        ROLLBACK TRANSACTION
    END
END;
GO


-- UPDATE Game SET price = 6000.00 WHERE game_id = 101;

CREATE TRIGGER trg_UpdateOrderStatus
ON Payment
AFTER INSERT, UPDATE
AS
BEGIN
    -- If payment status is 'Paid', update order status to 'Completed'
    UPDATE [Order]
    SET status = 'Completed'
    FROM [Order] o
    INNER JOIN inserted i ON o.order_id = i.order_id
    WHERE i.status = 'Paid' AND o.status = 'Pending'
    
    -- If payment status is 'Refunded', update order status to 'Cancelled'
    UPDATE [Order]
    SET status = 'Cancelled'
    FROM [Order] o
    INNER JOIN inserted i ON o.order_id = i.order_id
    WHERE i.status = 'Refunded' AND o.status != 'Cancelled'
END;
GO

/* select * from [Order]

INSERT INTO [Order] (order_id, order_date, customer_id, status)
VALUES (221, '2025-04-20', 2, 'Pending');

INSERT INTO Payment (payment_id, payment_date, order_id, status, method)
VALUES (320, '2025-04-20', 221, 'Paid', 'JazzCash');

SELECT order_id, status FROM [Order] WHERE order_id = 221;

SELECT * FROM [User] WHERE email = 'usman@gmail.com' AND password = 'usmanpass'

delete from [Order] where order_id = 216; */

-- drop table Payment;
-- drop table OrderItem;
-- drop table [Order];
-- drop table Inventory;
-- drop table Game;
-- drop table [Customer];
-- drop table [Admin];
-- drop table [User];

-- select * from [Order]

-- delete from [Order] where order_id IN (216, 217, 218)