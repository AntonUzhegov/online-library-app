package ru.online_library.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.online_library.library.model.Book;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    // Поиск по названию ИЛИ имени автора, ИЛИ фамилии автора
    List<Book> findByTitleContainingIgnoreCaseOrAuthors_FirstNameContainingIgnoreCaseOrAuthors_LastNameContainingIgnoreCase(
            String title, String authorFirstName, String authorLastName);

    // Фильтрация по категории
    List<Book> findByCategories_Id(Long categoryId);

    // Фильтрация по автору
    List<Book> findByAuthors_Id(Long authorId);
}
