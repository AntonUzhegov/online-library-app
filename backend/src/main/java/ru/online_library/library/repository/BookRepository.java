package ru.online_library.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.online_library.library.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}
