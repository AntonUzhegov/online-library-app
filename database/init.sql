CREATE DATABASE IF NOT EXISTS library;
USE library;

-- Категории
CREATE TABLE categories (
    category_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Книги
CREATE TABLE books (
    book_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    isbn VARCHAR(13) UNIQUE,
    publication_year INT,
    publisher VARCHAR(255),
    available BOOLEAN DEFAULT TRUE,
    cover_image VARCHAR(255)
);

-- Авторы
CREATE TABLE authors (
    author_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    birth_date DATE
);

-- Связь книги-категории
CREATE TABLE books_categories (
    book_id BIGINT,
    category_id BIGINT,
    PRIMARY KEY (book_id, category_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

-- Связь книги-авторы
CREATE TABLE book_authors (
    book_id BIGINT,
    author_id BIGINT,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE
);

-- Пользователи
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    middle_name VARCHAR(100),
    last_name VARCHAR(100),
    password_hash VARCHAR(255) NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role ENUM('USER', 'LIBRARIAN', 'ADMIN') DEFAULT 'USER',
    is_active BOOLEAN DEFAULT TRUE
);

-- Выдачи книг
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

-- ============================================
-- ТЕСТОВЫЕ ДАННЫЕ
-- ============================================

-- Категории
INSERT INTO categories (name) VALUES 
('Fiction'), 
('Science Fiction'), 
('Fantasy'), 
('Mystery'), 
('Biography'), 
('History'), 
('Programming'), 
('Design');

-- Авторы
INSERT INTO authors (first_name, last_name, middle_name, birth_date) VALUES
('George', 'Orwell', NULL, '1903-06-25'),
('J.R.R.', 'Tolkien', NULL, '1892-01-03'),
('Isaac', 'Asimov', NULL, '1920-01-02'),
('Agatha', 'Christie', NULL, '1890-09-15'),
('Walter', 'Isaacson', NULL, '1952-05-20'),
('Robert', 'Martin', NULL, '1952-12-05'),
('Jane', 'Austen', NULL, '1775-12-16'),
('Fyodor', 'Dostoevsky', 'Mikhailovich', '1821-11-11');

-- Книги
INSERT INTO books (title, isbn, publication_year, publisher, available, cover_image) VALUES
('1984', '9780451524935', 1949, 'Secker & Warburg', TRUE, '/covers/1984.jpg'),
('The Hobbit', '9780547928227', 1937, 'George Allen & Unwin', TRUE, '/covers/hobbit.jpg'),
('Foundation', '9780553293357', 1951, 'Gnome Press', TRUE, '/covers/foundation.jpg'),
('Murder on the Orient Express', '9780062693662', 1934, 'Collins Crime Club', FALSE, '/covers/orient_express.jpg'),
('Steve Jobs', '9781451648539', 2011, 'Simon & Schuster', TRUE, '/covers/steve_jobs.jpg'),
('Clean Code', '9780132350884', 2008, 'Prentice Hall', FALSE, '/covers/clean_code.jpg'),
('Pride and Prejudice', '9780141439518', 1813, 'T. Egerton', TRUE, '/covers/pride.jpg'),
('Crime and Punishment', '9780679734505', 1866, 'The Russian Messenger', TRUE, '/covers/crime_punishment.jpg');

-- Связи книг с категориями
INSERT INTO books_categories (book_id, category_id) VALUES
(1,1),(1,2),(2,3),(3,2),(4,4),(5,5),(6,7),(7,1),(8,1),(8,6);

-- Связи книг с авторами
INSERT INTO book_authors (book_id, author_id) VALUES
(1,1),(2,2),(3,3),(4,4),(5,5),(6,6),(7,7),(8,8);

-- Пользователи (пароль: password123, захеширован BCrypt)
INSERT INTO users (username, email, first_name, last_name, password_hash, role, is_active) VALUES
('john_doe', 'john@example.com', 'John', 'Doe', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USER', TRUE),
('jane_smith', 'jane@example.com', 'Jane', 'Smith', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USER', TRUE),
('admin', 'admin@library.com', 'Admin', 'User', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', TRUE),
('librarian1', 'lib@library.com', 'Sarah', 'Johnson', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'LIBRARIAN', TRUE),
('alex_wong', 'alex@example.com', 'Alex', 'Wong', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USER', TRUE);

-- Выдачи книг
INSERT INTO loans (book_id, user_id, loan_date, due_date, return_date, status) VALUES
(1,1,'2026-04-01','2026-04-15','2026-04-14','RETURNED'),
(4,2,'2026-04-05','2026-04-19',NULL,'ACTIVE'),
(6,2,'2026-04-10','2026-04-24',NULL,'ACTIVE'),
(8,5,'2026-03-20','2026-04-03',NULL,'OVERDUE'),
(2,1,'2026-04-12','2026-04-26',NULL,'ACTIVE'),
(3,3,'2026-04-08','2026-04-22','2026-04-20','RETURNED');

-- Дополнительные книги
INSERT INTO books (title, isbn, publication_year, publisher, available, cover_image) VALUES
('The Martian', '9780553418026', 2011, 'Crown', TRUE, '/covers/martian.jpg'),
('Dune', '9780441172719', 1965, 'Chilton Books', TRUE, '/covers/dune.jpg');

-- Дополнительные авторы
INSERT INTO authors (first_name, last_name, birth_date) VALUES
('Andy', 'Weir', '1972-06-16'),
('Frank', 'Herbert', '1920-10-08');

-- Связи дополнительных книг
INSERT INTO book_authors (book_id, author_id) VALUES (9,9), (10,10);
INSERT INTO books_categories (book_id, category_id) VALUES (9,2), (10,2);