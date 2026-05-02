package ru.online_library.library.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.online_library.library.dto.BookDTO;
import ru.online_library.library.model.Author;
import ru.online_library.library.model.Book;
import ru.online_library.library.model.Category;
import ru.online_library.library.model.Loan;
import ru.online_library.library.repository.AuthorRepository;
import ru.online_library.library.repository.BookRepository;
import ru.online_library.library.repository.CategoryRepository;
import ru.online_library.library.repository.LoanRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
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

    public BookDTO addBook(String title, String isbn, Integer year,
                           String publisher, String authors, String categories,
                           MultipartFile coverFile) throws IOException {
        Book book = new Book();
        book.setTitle(title);
        book.setIsbn(isbn);
        book.setPublicationYear(year);
        book.setPublisher(publisher);
        book.setAvailable(true);

        // Обложка
        if (coverFile != null && !coverFile.isEmpty()) {
            String fileName = UUID.randomUUID().toString().substring(0, 8) + "_" + coverFile.getOriginalFilename();
            Path uploadPath = Paths.get("../frontend/public/covers/");
            Files.createDirectories(uploadPath);
            Files.copy(coverFile.getInputStream(), uploadPath.resolve(fileName));
            book.setCoverImage("/covers/" + fileName);
        }

        // Привязка авторов
        if (authors != null && !authors.isEmpty()) {
            Set<Author> authorSet = new HashSet<>();
            for (String fullName : authors.split(",")) {
                String[] parts = fullName.trim().split(" ", 2);
                String firstName = parts[0];
                String lastName = parts.length > 1 ? parts[1] : "";

                Author author = authorRepository.findByFirstNameAndLastName(firstName, lastName)
                        .orElseGet(() -> {
                            Author newAuthor = new Author();
                            newAuthor.setFirstName(firstName);
                            newAuthor.setLastName(lastName);
                            return authorRepository.save(newAuthor);
                        });
                authorSet.add(author);
            }
            book.setAuthors(authorSet);
        }

        // Привязка категорий
        if (categories != null && !categories.isEmpty()) {
            Set<Category> categorySet = new HashSet<>();
            for (String name : categories.split(",")) {
                Category category = categoryRepository.findByName(name.trim())
                        .orElseGet(() -> {
                            Category newCat = new Category();
                            newCat.setName(name.trim());
                            return categoryRepository.save(newCat);
                        });
                categorySet.add(category);
            }
            book.setCategories(categorySet);
        }

        return convertToDTO(bookRepository.save(book));
    }

    public BookDTO updateBook(Long id, String title, String isbn, Integer year,
                              String publisher, String authors, String categories,
                              MultipartFile coverFile) throws IOException {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Книга не найдена"));

        book.setTitle(title);
        book.setIsbn(isbn);
        book.setPublicationYear(year);
        book.setPublisher(publisher);

        // Обложка (только если загрузили новую)
        if (coverFile != null && !coverFile.isEmpty()) {
            String fileName = UUID.randomUUID().toString().substring(0, 8) + "_" + coverFile.getOriginalFilename();
            Path uploadPath = Paths.get("../frontend/public/covers/");
            Files.createDirectories(uploadPath);
            Files.copy(coverFile.getInputStream(), uploadPath.resolve(fileName));
            book.setCoverImage("/covers/" + fileName);
        }

        // Обновление авторов
        if (authors != null && !authors.isEmpty()) {
            Set<Author> authorSet = new HashSet<>();
            for (String fullName : authors.split(",")) {
                String[] parts = fullName.trim().split(" ", 2);
                String firstName = parts[0];
                String lastName = parts.length > 1 ? parts[1] : "";

                Author author = authorRepository.findByFirstNameAndLastName(firstName, lastName)
                        .orElseGet(() -> {
                            Author newAuthor = new Author();
                            newAuthor.setFirstName(firstName);
                            newAuthor.setLastName(lastName);
                            return authorRepository.save(newAuthor);
                        });
                authorSet.add(author);
            }
            book.setAuthors(authorSet);
        }

        // Обновление категорий
        if (categories != null && !categories.isEmpty()) {
            Set<Category> categorySet = new HashSet<>();
            for (String name : categories.split(",")) {
                Category category = categoryRepository.findByName(name.trim())
                        .orElseGet(() -> {
                            Category newCat = new Category();
                            newCat.setName(name.trim());
                            return categoryRepository.save(newCat);
                        });
                categorySet.add(category);
            }
            book.setCategories(categorySet);
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