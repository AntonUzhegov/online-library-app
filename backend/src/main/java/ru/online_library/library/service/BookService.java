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

    @Autowired
    private LoanService loanService;

    private BookDTO convertToDTO(Book book) {
        Set<String> authorsNames = book.getAuthors().stream()
                .map(author -> author.getFirstName() + " " + author.getLastName())
                .collect(Collectors.toSet());

        Set<String> categoryNames = book.getCategories().stream()
                .map(Category::getName)
                .collect(Collectors.toSet());

        // Получаем, кто взял книгу (если недоступна)
        String borrowedBy = null;
        if (!book.getAvailable()) {
            borrowedBy = loanService.getBookBorrowedBy(book.getId());
        }

        return new BookDTO(
                book.getId(),
                book.getTitle(),
                book.getIsbn(),
                book.getPublicationYear(),
                book.getPublisher(),
                book.getAvailable(),
                book.getCoverImage(),
                authorsNames,
                categoryNames,
                borrowedBy  // ← новое поле
        );
    }

    public List<BookDTO> getAllBooks(){
        return bookRepository.findAllByOrderByAvailableDesc().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Книга не найдена"));
        return convertToDTO(book);
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

    public BookDTO addBook(BookDTO bookDTO){
        Book book = new Book();
        book.setTitle(bookDTO.getTitle());
        book.setIsbn(bookDTO.getIsbn());
        book.setPublicationYear(bookDTO.getPublicationYear());
        book.setPublisher(bookDTO.getPublisher());
        book.setAvailable(true);
        book.setCoverImage(bookDTO.getCoverImage());

        return convertToDTO(bookRepository.save(book));
    }

    // Обновить книгу
    public BookDTO updateBook(Long id, BookDTO bookDTO) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Книга не найдена"));

        book.setTitle(bookDTO.getTitle());
        book.setIsbn(bookDTO.getIsbn());
        book.setPublicationYear(bookDTO.getPublicationYear());
        book.setPublisher(bookDTO.getPublisher());
        book.setCoverImage(bookDTO.getCoverImage());

        return convertToDTO(bookRepository.save(book));
    }

    // Удалить книгу
    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Книга не найдена");
        }
        bookRepository.deleteById(id);
    }
}