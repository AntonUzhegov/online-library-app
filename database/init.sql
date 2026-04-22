SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

DROP TABLE IF EXISTS users;

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
    loan_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE,
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
('Убийство в Восточном экспрессе', '9780062693662', 1934, 'Collins Crime Club', FALSE, '/covers/orient_express.jpg'),
('Стив Джобс', '9781451648539', 2011, 'Simon & Schuster', TRUE, '/covers/steve_jobs.jpg'),
('Чистый код', '9780132350884', 2008, 'Prentice Hall', FALSE, '/covers/clean_code.jpg'),
('Гордость и предубеждение', '9780141439518', 1813, 'T. Egerton', TRUE, '/covers/pride.jpg'),
('Преступление и наказание', '9780679734505', 1866, 'The Russian Messenger', TRUE, '/covers/crime_punishment.jpg'),
('Марсианин', '9780553418026', 2011, 'Crown', TRUE, '/covers/martian.jpg'),
('Дюна', '9780441172719', 1965, 'Chilton Books', TRUE, '/covers/dune.jpg'),
('Война и мир', '9780199232765', 1869, 'The Russian Messenger', TRUE, '/covers/war_and_peace.jpg'),
('Анна Каренина', '9780143035008', 1877, 'The Russian Messenger', TRUE, '/covers/anna_karenina.jpg'),
('Мастер и Маргарита', '9780143108276', 1967, 'YMCA Press', TRUE, '/covers/master_and_margarita.jpg'),
('Великий Гэтсби', '9780743273565', 1925, 'Charles Scribners Sons', TRUE, '/covers/great_gatsby.jpg'),
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

INSERT INTO users (username, email, password_hash, role) VALUES
('user1', 'user1@test.com', '$2a$10$pwMcLv0Vk4mR8CPYsi1W3OtVREoB42nSpuXWJu4nj20UyGRu4ZnHe', 'ROLE_USER'),
('user2', 'user2@test.com', '$2a$10$pwMcLv0Vk4mR8CPYsi1W3OtVREoB42nSpuXWJu4nj20UyGRu4ZnHe', 'ROLE_USER'),
('user3', 'user3@test.com', '$2a$10$pwMcLv0Vk4mR8CPYsi1W3OtVREoB42nSpuXWJu4nj20UyGRu4ZnHe', 'ROLE_USER'),
('user5', 'user5@test.com', '$2a$10$pwMcLv0Vk4mR8CPYsi1W3OtVREoB42nSpuXWJu4nj20UyGRu4ZnHe', 'ROLE_USER');


INSERT INTO loans (book_id, user_id, loan_date, due_date, return_date, status) VALUES
(1, 1, '2026-04-01', '2026-04-15', '2026-04-14', 'RETURNED'),
(4, 2, '2026-04-05', '2026-04-19', NULL, 'ACTIVE'),
(6, 2, '2026-04-10', '2026-04-24', NULL, 'ACTIVE'),
(8, 4, '2026-03-20', '2026-04-03', NULL, 'OVERDUE'),
(2, 1, '2026-04-12', '2026-04-26', NULL, 'ACTIVE'),
(3, 3, '2026-04-08', '2026-04-22', '2026-04-20', 'RETURNED');

