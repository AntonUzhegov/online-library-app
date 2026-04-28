package ru.online_library.library.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.online_library.library.dto.BookDTO;
import ru.online_library.library.model.Author;
import ru.online_library.library.model.Book;
import ru.online_library.library.model.Category;
import ru.online_library.library.model.Loan;
import ru.online_library.library.repository.AuthorRepository;
import ru.online_library.library.repository.BookRepository;
import ru.online_library.library.repository.CategoryRepository;
import ru.online_library.library.repository.LoanRepository;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookService {

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private LoanService loanService;

    @Autowired
    private LoanRepository loanRepository;

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
                borrowedBy,
                null  // ← loanCount
        );
    }

    public List<BookDTO> getAllBooks() {
        return bookRepository.findAllOrderByPopularityWithCount().stream()
                .map(row -> {
                    Book book = (Book) row[0];
                    Long count = (Long) row[1];
                    BookDTO dto = convertToDTO(book);
                    dto.setLoanCount(count);
                    return dto;
                })
                .collect(Collectors.toList());
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

    public BookDTO addBook(BookDTO bookDTO) {
        Book book = new Book();
        book.setTitle(bookDTO.getTitle());
        book.setIsbn(bookDTO.getIsbn());
        book.setPublicationYear(bookDTO.getPublicationYear());
        book.setPublisher(bookDTO.getPublisher());
        book.setAvailable(true);
        book.setCoverImage(bookDTO.getCoverImage());

        // Привязка авторов
        if (bookDTO.getAuthors() != null && !bookDTO.getAuthors().isEmpty()) {
            Set<Author> authors = new HashSet<>();
            for (String fullName : bookDTO.getAuthors()) {
                String[] parts = fullName.split(" ", 2);
                String firstName = parts[0];
                String lastName = parts.length > 1 ? parts[1] : "";

                Author author = authorRepository.findByFirstNameAndLastName(firstName, lastName)
                        .orElseGet(() -> {
                            Author newAuthor = new Author();
                            newAuthor.setFirstName(firstName);
                            newAuthor.setLastName(lastName);
                            return authorRepository.save(newAuthor);
                        });
                authors.add(author);
            }
            book.setAuthors(authors);
        }

        // Привязка категорий
        if (bookDTO.getCategories() != null && !bookDTO.getCategories().isEmpty()) {
            Set<Category> categories = new HashSet<>();
            for (String categoryName : bookDTO.getCategories()) {
                Category category = categoryRepository.findByName(categoryName)
                        .orElseGet(() -> {
                            Category newCategory = new Category();
                            newCategory.setName(categoryName);
                            return categoryRepository.save(newCategory);
                        });
                categories.add(category);
            }
            book.setCategories(categories);
        }

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

        // Обновление авторов
        if (bookDTO.getAuthors() != null) {
            Set<Author> authors = new HashSet<>();
            for (String fullName : bookDTO.getAuthors()) {
                String[] parts = fullName.split(" ", 2);
                String firstName = parts[0];
                String lastName = parts.length > 1 ? parts[1] : "";

                Author author = authorRepository.findByFirstNameAndLastName(firstName, lastName)
                        .orElseGet(() -> {
                            Author newAuthor = new Author();
                            newAuthor.setFirstName(firstName);
                            newAuthor.setLastName(lastName);
                            return authorRepository.save(newAuthor);
                        });
                authors.add(author);
            }
            book.setAuthors(authors);
        }

        // Обновление категорий
        if (bookDTO.getCategories() != null) {
            Set<Category> categories = new HashSet<>();
            for (String categoryName : bookDTO.getCategories()) {
                Category category = categoryRepository.findByName(categoryName)
                        .orElseGet(() -> {
                            Category newCategory = new Category();
                            newCategory.setName(categoryName);
                            return categoryRepository.save(newCategory);
                        });
                categories.add(category);
            }
            book.setCategories(categories);
        }

        return convertToDTO(bookRepository.save(book));
    }

    // Удалить книгу
    public void deleteBook(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Книга не найдена"));

        // Удалить связанные выдачи
        List<Loan> loans = loanRepository.findByBook_Id(id);
        loanRepository.deleteAll(loans);

        // Удалить книгу
        bookRepository.delete(book);
    }

    public List<BookDTO> getAllBooksByPopularity() {
        return bookRepository.findAllOrderByPopularity().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}