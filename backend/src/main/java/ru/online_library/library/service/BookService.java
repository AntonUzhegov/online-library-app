package ru.online_library.library.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.online_library.library.dto.BookDTO;
import ru.online_library.library.model.Book;
import ru.online_library.library.model.Category;
import ru.online_library.library.repository.BookRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    private BookDTO convertToDTO(Book book){

        Set<String> authorsNames = book.getAuthors().stream()
                .map(author -> author.getFirstName() + " " + author.getLastName())
                .collect(Collectors.toSet());

        Set<String> categoryNames = book.getCategories().stream()
                .map(Category::getName)
                .collect(Collectors.toSet());

        return new BookDTO(
                book.getId(),
                book.getTitle(),
                book.getIsbn(),
                book.getPublicationYear(),
                book.getPublisher(),
                book.getAvailable(),
                book.getCoverImage(),
                authorsNames,
                categoryNames
        );
    }

    public List<BookDTO> getAllBooks(){
        return bookRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Книга не найдена"));
        return convertToDTO(book);
    }

    public BookDTO addBook(BookDTO bookDTO) {
        Book book = new Book();
        // заполнить поля из DTO
        // сохранить
        return convertToDTO(bookRepository.save(book));
    }


    // Фильтрация по категории
    public List<BookDTO> getBooksByCategory(Long categoryId) {
        return bookRepository.findByCategories_Id(categoryId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Фильтрация по автору
    public List<BookDTO> getBooksByAuthor(Long authorId) {
        return bookRepository.findByAuthors_Id(authorId)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<BookDTO> searchBooks(String query) {
        return bookRepository
                .findByTitleContainingIgnoreCaseOrAuthors_FirstNameContainingIgnoreCaseOrAuthors_LastNameContainingIgnoreCase(
                        query, query, query)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Фильтрация по году
    public List<BookDTO> getBooksByYearRange(Integer yearFrom, Integer yearTo) {
        return bookRepository.findByPublicationYearBetween(yearFrom, yearTo)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Фильтрация по доступности
    public List<BookDTO> getBooksByAvailable(Boolean available) {
        return bookRepository.findByAvailable(available)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}