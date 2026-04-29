SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

DROP DATABASE IF EXISTS library;
CREATE DATABASE IF NOT EXISTS library;
USE library;


CREATE TABLE categories (
    category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE books (
    book_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    isbn VARCHAR(13) UNIQUE,
    publication_year INT,
    publisher VARCHAR(255),
    available BOOLEAN DEFAULT TRUE,
    cover_image VARCHAR(255)
);

CREATE TABLE authors (
    author_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    birth_date DATE
);

CREATE TABLE books_categories (
    book_id BIGINT,
    category_id BIGINT,
    PRIMARY KEY (book_id, category_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

CREATE TABLE book_authors (
    book_id BIGINT,
    author_id BIGINT,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE
);

CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    middle_name VARCHAR(100),
    last_name VARCHAR(100),
    password_hash VARCHAR(255) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role ENUM('ROLE_USER', 'ROLE_LIBRARIAN', 'ROLE_ADMIN') DEFAULT 'ROLE_USER',
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE loans (
    loan_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    book_id BIGINT NOT NULL,
    user_id BIGINT NOT NULL,
    loan_date DATETIME NOT NULL,
    due_date DATETIME NOT NULL,
    return_date DATETIME NULL,
    status ENUM('ACTIVE', 'RETURNED', 'OVERDUE') DEFAULT 'ACTIVE',
    FOREIGN KEY (book_id) REFERENCES books(book_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO categories (name) VALUES
('Художественная литература'),
('Научная фантастика'),
('Фэнтези'),
('Детектив'),
('Биография'),
('История'),
('Программирование'),
('Дизайн');

INSERT INTO authors (first_name, last_name, middle_name, birth_date) VALUES
('Джордж', 'Оруэлл', NULL, '1903-06-25'),
('Джон Рональд Руэл', 'Толкин', NULL, '1892-01-03'),
('Айзек', 'Азимов', NULL, '1920-01-02'),
('Агата', 'Кристи', NULL, '1890-09-15'),
('Уолтер', 'Айзексон', NULL, '1952-05-20'),
('Роберт', 'Мартин', NULL, '1952-12-05'),
('Джейн', 'Остин', NULL, '1775-12-16'),
('Фёдор', 'Достоевский', 'Михайлович', '1821-11-11'),
('Лев', 'Толстой', 'Николаевич', '1828-09-09'),
('Михаил', 'Булгаков', 'Афанасьевич', '1891-05-15'),
('Фрэнсис Скотт', 'Фицджеральд', NULL, '1896-09-24'),
('Герман', 'Мелвилл', NULL, '1819-08-01'),
('Джоан Роулинг', 'Роулинг', NULL, '1965-07-31'),
('Энди', 'Уир', NULL, '1972-06-16'),
('Орсон Скотт', 'Кард', NULL, '1951-08-24'),
('Дуглас', 'Адамс', NULL, '1952-03-11'),
('Дэн', 'Браун', NULL, '1964-06-22'),
('Гиллиан', 'Флинн', NULL, '1971-02-24'),
('Халед', 'Хоссейни', NULL, '1965-03-04'),
('Маркус', 'Зузак', NULL, '1975-06-23'),
('Янн', 'Мартел', NULL, '1963-06-25'),
('Пауло', 'Коэльо', NULL, '1947-08-24'),
('Эндрю', 'Хант', NULL, '1964-01-01'),
('Дэвид', 'Томас', NULL, '1956-01-01'),
('Юваль Ной', 'Харари', NULL, '1976-02-24'),
('Харпер', 'Ли', NULL, '1926-04-28'),
('Джером Дэвид', 'Сэлинджер', NULL, '1919-01-01'),
('Олдос', 'Хаксли', NULL, '1894-07-26'),
('Рэй', 'Брэдбери', NULL, '1920-08-22'),
('Клайв Стейплз', 'Льюис', NULL, '1898-11-29'),
('Фрэнк', 'Герберт', NULL, '1920-10-08');


INSERT INTO books (title, isbn, publication_year, publisher, available, cover_image) VALUES
('1984', '9780451524935', 1949, 'Secker & Warburg', TRUE, '/covers/1984.jpg'),
('Хоббит', '9780547928227', 1937, 'George Allen & Unwin', TRUE, '/covers/hobbit.jpg'),
('Основание', '9780553293357', 1951, 'Gnome Press', TRUE, '/covers/foundation.jpg'),
('Убийство в Восточном экспрессе', '9780062693662', 1934, 'Collins Crime Club', TRUE, '/covers/orient_express.jpg'),
('Стив Джобс', '9781451648539', 2011, 'Simon & Schuster', TRUE, '/covers/steve_jobs.jpg'),
('Чистый код', '9780132350884', 2008, 'Prentice Hall', TRUE, '/covers/clean_code.jpg'),
('Гордость и предубеждение', '9780141439518', 1813, 'T. Egerton', TRUE, '/covers/pride.jpg'),
('Преступление и наказание', '9780679734505', 1866, 'The Russian Messenger', TRUE, '/covers/crime_punishment.jpg'),
('Марсианин', '9780553418026', 2011, 'Crown', TRUE, '/covers/martian.jpg'),
('Дюна', '9780441172719', 1965, 'Chilton Books', TRUE, '/covers/dune.jpg'),
('Война и мир', '9780199232765', 1869, 'The Russian Messenger', TRUE, '/covers/war_and_peace.jpg'),
('Анна Каренина', '9780143035008', 1877, 'The Russian Messenger', TRUE, '/covers/anna_karenina.jpg'),
('Мастер и Маргарита', '9780143108276', 1967, 'YMCA Press', TRUE, '/covers/master_and_margarita.jpg'),
('Великий Гэтсби', '9780743273565', 1925, 'Charles Scribner''s Sons', TRUE, '/covers/great_gatsby.jpg'),
('Моби Дик', '9781503280786', 1851, 'Harper & Brothers', TRUE, '/covers/moby_dick.jpg'),
('Гарри Поттер и философский камень', '9780439708180', 1997, 'Bloomsbury', TRUE, '/covers/harry_potter_1.jpg'),
('Гарри Поттер и Тайная комната', '9780439064873', 1998, 'Bloomsbury', TRUE, '/covers/harry_potter_2.jpg'),
('Братство Кольца', '9780547928210', 1954, 'George Allen & Unwin', TRUE, '/covers/fellowship.jpg'),
('Две крепости', '9780547928203', 1954, 'George Allen & Unwin', TRUE, '/covers/two_towers.jpg'),
('Возвращение короля', '9780547928197', 1955, 'George Allen & Unwin', TRUE, '/covers/return_king.jpg'),
('Проект «Аве Мария»', '9780593135204', 2021, 'Ballantine Books', TRUE, '/covers/project_hail_mary.jpg'),
('Игра Эндера', '9780812550702', 1985, 'Tor Books', TRUE, '/covers/enders_game.jpg'),
('Автостопом по галактике', '9780345391803', 1979, 'Pan Books', TRUE, '/covers/hitchhikers.jpg'),
('Десять негритят', '9780062073488', 1939, 'Collins Crime Club', TRUE, '/covers/and_then_there_were_none.jpg'),
('Код да Винчи', '9780307474278', 2003, 'Doubleday', TRUE, '/covers/davinci_code.jpg'),
('Исчезнувшая', '9780307588364', 2012, 'Crown Publishing', TRUE, '/covers/gone_girl.jpg'),
('Бегущий за ветром', '9781594631931', 2003, 'Riverhead Books', TRUE, '/covers/kite_runner.jpg'),
('Книжный вор', '9780375842207', 2005, 'Picador', TRUE, '/covers/book_thief.jpg'),
('Жизнь Пи', '9780156027328', 2001, 'Knopf Canada', TRUE, '/covers/life_of_pi.jpg'),
('Алхимик', '9780062502174', 1988, 'HarperCollins', TRUE, '/covers/alchemist.jpg'),
('Программист-прагматик', '9780201616224', 1999, 'Addison-Wesley', TRUE, '/covers/pragmatic_programmer.jpg'),
('Sapiens: Краткая история человечества', '9780062316097', 2011, 'Harper', TRUE, '/covers/sapiens.jpg'),
('Homo Deus: Краткая история будущего', '9780062464316', 2015, 'Harper', TRUE, '/covers/homo_deus.jpg'),
('Убить пересмешника', '9780061120084', 1960, 'J.B. Lippincott & Co.', TRUE, '/covers/to_kill_mockingbird.jpg'),
('Над пропастью во ржи', '9780316769488', 1951, 'Little, Brown and Company', TRUE, '/covers/catcher_in_rye.jpg'),
('О дивный новый мир', '9780060850524', 1932, 'Chatto & Windus', TRUE, '/covers/brave_new_world.jpg'),
('451 градус по Фаренгейту', '9781451673319', 1953, 'Ballantine Books', TRUE, '/covers/fahrenheit_451.jpg'),
('Лев, колдунья и платяной шкаф', '9780064471046', 1950, 'Geoffrey Bles', TRUE, '/covers/narnia.jpg');

INSERT INTO books_categories (book_id, category_id) VALUES
(1,1),(1,2),   -- 1984: Художественная, Научная фантастика
(2,3),         -- Хоббит: Фэнтези
(3,2),         -- Основание: Научная фантастика
(4,4),         -- Убийство в Восточном экспрессе: Детектив
(5,5),         -- Стив Джобс: Биография
(6,7),         -- Чистый код: Программирование
(7,1),         -- Гордость и предубеждение: Художественная
(8,1),(8,6),   -- Преступление и наказание: Художественная, История
(9,2),         -- Марсианин: Научная фантастика
(10,2),        -- Дюна: Научная фантастика
(11,1),(12,1),(13,1),(14,1),(15,1),  -- Художественная
(16,3),(17,3),(18,3),(19,3),(20,3),  -- Фэнтези
(21,2),(22,2),(23,2),                -- Научная фантастика
(24,4),(25,4),(26,4),                -- Детектив (было 27,4 - удалено)
(27,1),(28,1),(29,1),(30,1),         -- Художественная
(31,7),                              -- Программирование
(32,6),(33,6),                       -- История
(34,1),(35,1),(36,2),(37,2),(38,3);  -- Художественная, Научная фантастика, Фэнтези

INSERT INTO book_authors (book_id, author_id) VALUES
(1,1),   -- 1984 → Оруэлл
(2,2),   -- Хоббит → Толкин
(3,3),   -- Основание → Азимов
(4,4),   -- Убийство в Восточном экспрессе → Кристи
(5,5),   -- Стив Джобс → Айзексон
(6,6),   -- Чистый код → Мартин
(7,7),   -- Гордость и предубеждение → Остин
(8,8),   -- Преступление и наказание → Достоевский
(9,14),  -- Марсианин → Уир
(10,31), -- Дюна → Герберт
(11,9),  -- Война и мир → Толстой
(12,9),  -- Анна Каренина → Толстой
(13,10), -- Мастер и Маргарита → Булгаков
(14,11), -- Великий Гэтсби → Фицджеральд
(15,12), -- Моби Дик → Мелвилл
(16,13), -- Гарри Поттер 1 → Роулинг
(17,13), -- Гарри Поттер 2 → Роулинг
(18,2),  -- Братство Кольца → Толкин
(19,2),  -- Две крепости → Толкин
(20,2),  -- Возвращение короля → Толкин
(21,14), -- Проект «Аве Мария» → Уир
(22,15), -- Игра Эндера → Кард
(23,16), -- Автостопом по галактике → Адамс
(24,4),  -- Десять негритят → Кристи
(25,17), -- Код да Винчи → Браун
(26,18), -- Исчезнувшая → Флинн
(27,19), -- Бегущий за ветром → Хоссейни
(28,20), -- Книжный вор → Зузак
(29,21), -- Жизнь Пи → Мартел
(30,22), -- Алхимик → Коэльо
(31,23), -- Программист-прагматик → Хант
(31,24), -- Программист-прагматик → Томас
(32,25), -- Sapiens → Харари
(33,25), -- Homo Deus → Харари
(34,26), -- Убить пересмешника → Ли
(35,27), -- Над пропастью во ржи → Сэлинджер
(36,28), -- О дивный новый мир → Хаксли
(37,29), -- 451 градус по Фаренгейту → Брэдбери
(38,30); -- Лев, колдунья и платяной шкаф → Льюис

INSERT INTO users (username, email, first_name, last_name, password_hash, role, is_active) VALUES
('ivanov', 'ivanov@example.com', 'Иван', 'Иванов', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5Ef', 'ROLE_USER', TRUE),
('petrov', 'petrov@example.com', 'Петр', 'Петров', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5Ef', 'ROLE_USER', TRUE),
('sidorov', 'sidorov@example.com', 'Сидор', 'Сидоров', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5Ef', 'ROLE_USER', TRUE),
('admin', 'admin@library.com', 'Admin', 'Adminov', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5Ef', 'ROLE_ADMIN', TRUE),
('librarian', 'lib@library.com', 'Библиотекарь', 'Библиотекарев', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5Ef', 'ROLE_LIBRARIAN', TRUE),
('kuznetsov', 'kuznetsov@example.com', 'Алексей', 'Кузнецов', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5Ef', 'ROLE_USER', TRUE),
('volkova', 'volkova@example.com', 'Елена', 'Волкова', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5Ef', 'ROLE_USER', TRUE),
('morozov', 'morozov@example.com', 'Дмитрий', 'Морозов', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5Ef', 'ROLE_USER', TRUE),
('novikova', 'novikova@example.com', 'Анна', 'Новикова', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5Ef', 'ROLE_USER', TRUE),
('petrova', 'petrova@example.com', 'Мария', 'Петрова', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5Ef', 'ROLE_USER', TRUE);

INSERT INTO loans (book_id, user_id, loan_date, due_date, return_date, status) VALUES
(1, 1, '2026-04-01 10:00:00', '2026-04-15 10:00:00', NULL, 'ACTIVE'),
(2, 2, '2026-04-02 11:00:00', '2026-04-16 11:00:00', NULL, 'ACTIVE'),
(3, 3, '2026-04-03 12:00:00', '2026-04-17 12:00:00', NULL, 'ACTIVE'),
(4, 6, '2026-04-05 14:00:00', '2026-04-19 14:00:00', NULL, 'ACTIVE'),
(5, 8, '2026-04-07 09:00:00', '2026-04-21 09:00:00', NULL, 'ACTIVE'),
(6, 9, '2026-04-10 15:00:00', '2026-04-24 15:00:00', NULL, 'ACTIVE'),
(7, 10, '2026-04-12 13:00:00', '2026-04-26 13:00:00', NULL, 'ACTIVE'),
(16, 1, '2026-04-14 10:00:00', '2026-04-28 10:00:00', NULL, 'ACTIVE'),
(21, 2, '2026-04-15 11:00:00', '2026-04-29 11:00:00', NULL, 'ACTIVE'),
(22, 3, '2026-04-16 09:00:00', '2026-04-30 09:00:00', NULL, 'ACTIVE'),
(8, 1, '2025-12-01 10:00:00', '2025-12-15 10:00:00', '2025-12-14 10:00:00', 'RETURNED'),
(9, 2, '2025-12-05 11:00:00', '2025-12-19 11:00:00', '2025-12-18 11:00:00', 'RETURNED'),
(10, 3, '2025-12-10 14:00:00', '2025-12-24 14:00:00', '2025-12-22 14:00:00', 'RETURNED'),
(11, 4, '2026-01-05 13:00:00', '2026-01-19 13:00:00', '2026-01-18 13:00:00', 'RETURNED'),
(12, 5, '2026-01-10 15:00:00', '2026-01-24 15:00:00', '2026-01-23 15:00:00', 'RETURNED'),
(13, 6, '2026-01-15 09:00:00', '2026-01-29 09:00:00', '2026-01-28 09:00:00', 'RETURNED'),
(14, 7, '2026-02-01 10:00:00', '2026-02-15 10:00:00', '2026-02-14 10:00:00', 'RETURNED'),
(15, 8, '2026-02-05 11:00:00', '2026-02-19 11:00:00', '2026-02-18 11:00:00', 'RETURNED'),
(17, 9, '2026-02-10 14:00:00', '2026-02-24 14:00:00', '2026-02-23 14:00:00', 'RETURNED'),
(18, 10, '2026-02-15 13:00:00', '2026-02-28 13:00:00', '2026-02-27 13:00:00', 'RETURNED'),
(19, 1, '2026-03-01 09:00:00', '2026-03-15 09:00:00', '2026-03-14 09:00:00', 'RETURNED'),
(20, 2, '2026-03-05 11:00:00', '2026-03-19 11:00:00', '2026-03-18 11:00:00', 'RETURNED'),
(23, 3, '2026-03-10 12:00:00', '2026-03-24 12:00:00', '2026-03-23 12:00:00', 'RETURNED'),
(24, 4, '2026-03-15 14:00:00', '2026-03-29 14:00:00', '2026-03-28 14:00:00', 'RETURNED'),
(25, 5, '2026-03-20 10:00:00', '2026-04-03 10:00:00', '2026-04-02 10:00:00', 'RETURNED'),
(26, 6, '2026-03-25 09:00:00', '2026-04-08 09:00:00', '2026-04-07 09:00:00', 'RETURNED'),
(27, 7, '2026-04-01 11:00:00', '2026-04-15 11:00:00', '2026-04-14 11:00:00', 'RETURNED'),
(28, 8, '2026-04-03 13:00:00', '2026-04-17 13:00:00', '2026-04-16 13:00:00', 'RETURNED'),
(29, 9, '2026-04-05 14:00:00', '2026-04-19 14:00:00', '2026-04-18 14:00:00', 'RETURNED'),
(30, 10, '2026-04-07 15:00:00', '2026-04-21 15:00:00', '2026-04-20 15:00:00', 'RETURNED'),
(31, 1, '2026-03-01 10:00:00', '2026-03-15 10:00:00', NULL, 'OVERDUE'),
(32, 2, '2026-03-05 11:00:00', '2026-03-19 11:00:00', NULL, 'OVERDUE'),
(33, 3, '2026-03-10 14:00:00', '2026-03-24 14:00:00', NULL, 'OVERDUE'),
(34, 4, '2026-03-15 13:00:00', '2026-03-29 13:00:00', NULL, 'OVERDUE'),
(35, 5, '2026-03-20 09:00:00', '2026-04-03 09:00:00', NULL, 'OVERDUE'),
(36, 6, '2026-03-25 10:00:00', '2026-04-08 10:00:00', NULL, 'OVERDUE'),
(37, 7, '2026-03-28 11:00:00', '2026-04-11 11:00:00', NULL, 'OVERDUE'),
(38, 8, '2026-03-30 14:00:00', '2026-04-13 14:00:00', NULL, 'OVERDUE'),
(1, 4, '2025-11-01 10:00:00', '2025-11-15 10:00:00', '2025-11-14 10:00:00', 'RETURNED'),
(1, 5, '2025-11-20 11:00:00', '2025-12-04 11:00:00', '2025-12-03 11:00:00', 'RETURNED'),
(1, 6, '2025-12-10 09:00:00', '2025-12-24 09:00:00', '2025-12-22 09:00:00', 'RETURNED'),
(1, 7, '2026-01-15 14:00:00', '2026-01-29 14:00:00', '2026-01-28 14:00:00', 'RETURNED'),
(1, 8, '2026-02-20 10:00:00', '2026-03-06 10:00:00', '2026-03-05 10:00:00', 'RETURNED'),
(2, 4, '2025-10-05 13:00:00', '2025-10-19 13:00:00', '2025-10-18 13:00:00', 'RETURNED'),
(2, 5, '2025-11-12 09:00:00', '2025-11-26 09:00:00', '2025-11-25 09:00:00', 'RETURNED'),
(2, 6, '2025-12-18 11:00:00', '2026-01-01 11:00:00', '2025-12-31 11:00:00', 'RETURNED'),
(2, 7, '2026-01-25 14:00:00', '2026-02-08 14:00:00', '2026-02-07 14:00:00', 'RETURNED'),
(10, 1, '2025-09-10 10:00:00', '2025-09-24 10:00:00', '2025-09-23 10:00:00', 'RETURNED'),
(10, 2, '2025-10-15 11:00:00', '2025-10-29 11:00:00', '2025-10-28 11:00:00', 'RETURNED'),
(10, 5, '2025-11-20 14:00:00', '2025-12-04 14:00:00', '2025-12-03 14:00:00', 'RETURNED'),
(10, 8, '2025-12-25 09:00:00', '2026-01-08 09:00:00', '2026-01-07 09:00:00', 'RETURNED'),
(10, 9, '2026-01-30 13:00:00', '2026-02-13 13:00:00', '2026-02-12 13:00:00', 'RETURNED'),
(9, 3, '2025-08-05 12:00:00', '2025-08-19 12:00:00', '2025-08-18 12:00:00', 'RETURNED'),
(9, 4, '2025-09-12 10:00:00', '2025-09-26 10:00:00', '2025-09-25 10:00:00', 'RETURNED'),
(9, 7, '2025-10-18 11:00:00', '2025-11-01 11:00:00', '2025-10-31 11:00:00', 'RETURNED'),
(9, 9, '2025-11-22 09:00:00', '2025-12-06 09:00:00', '2025-12-05 09:00:00', 'RETURNED'),
(8, 2, '2025-07-10 14:00:00', '2025-07-24 14:00:00', '2025-07-23 14:00:00', 'RETURNED'),
(8, 3, '2025-08-15 13:00:00', '2025-08-29 13:00:00', '2025-08-28 13:00:00', 'RETURNED'),
(8, 6, '2025-09-20 10:00:00', '2025-10-04 10:00:00', '2025-10-03 10:00:00', 'RETURNED'),
(6, 1, '2025-06-01 09:00:00', '2025-06-15 09:00:00', '2025-06-14 09:00:00', 'RETURNED'),
(6, 2, '2025-07-05 11:00:00', '2025-07-19 11:00:00', '2025-07-18 11:00:00', 'RETURNED'),
(6, 3, '2025-08-10 14:00:00', '2025-08-24 14:00:00', '2025-08-23 14:00:00', 'RETURNED'),
(6, 5, '2025-09-15 13:00:00', '2025-09-29 13:00:00', '2025-09-28 13:00:00', 'RETURNED'),
(13, 1, '2025-06-20 10:00:00', '2025-07-04 10:00:00', '2025-07-03 10:00:00', 'RETURNED'),
(13, 4, '2025-07-25 11:00:00', '2025-08-08 11:00:00', '2025-08-07 11:00:00', 'RETURNED'),
(13, 7, '2025-08-30 14:00:00', '2025-09-13 14:00:00', '2025-09-12 14:00:00', 'RETURNED'),
(32, 1, '2025-05-10 09:00:00', '2025-05-24 09:00:00', '2025-05-23 09:00:00', 'RETURNED'),
(32, 2, '2025-06-15 10:00:00', '2025-06-29 10:00:00', '2025-06-28 10:00:00', 'RETURNED'),
(32, 3, '2025-07-20 11:00:00', '2025-08-03 11:00:00', '2025-08-02 11:00:00', 'RETURNED'),
(32, 6, '2025-08-25 14:00:00', '2025-09-08 14:00:00', '2025-09-07 14:00:00', 'RETURNED'),
(32, 9, '2025-09-30 13:00:00', '2025-10-14 13:00:00', '2025-10-13 13:00:00', 'RETURNED'),
(16, 3, '2025-06-05 12:00:00', '2025-06-19 12:00:00', '2025-06-18 12:00:00', 'RETURNED'),
(16, 5, '2025-07-10 09:00:00', '2025-07-24 09:00:00', '2025-07-23 09:00:00', 'RETURNED'),
(16, 7, '2025-08-15 10:00:00', '2025-08-29 10:00:00', '2025-08-28 10:00:00', 'RETURNED'),
(16, 9, '2025-09-20 11:00:00', '2025-10-04 11:00:00', '2025-10-03 11:00:00', 'RETURNED');

UPDATE books SET available = FALSE WHERE book_id IN (1,2,3,4,5,6,7,16,21,22,31,32,33,34,35,36,37,38);