package ru.online_library.library.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.online_library.library.dto.BookDTO;
import ru.online_library.library.service.BookService;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<List<BookDTO>> getAllBooks(){
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> getBookById(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<BookDTO>> searchBooks(@RequestParam String query) {
        return ResponseEntity.ok(bookService.searchBooks(query));
    }

    // Фильтрация по категории
    @GetMapping("/filter/category/{categoryId}")
    public ResponseEntity<List<BookDTO>> filterByCategory(@PathVariable Long categoryId) {
        return ResponseEntity.ok(bookService.getBooksByCategory(categoryId));
    }

    // Фильтрация по автору
    @GetMapping("/filter/author/{authorId}")
    public ResponseEntity<List<BookDTO>> filterByAuthor(@PathVariable Long authorId) {
        return ResponseEntity.ok(bookService.getBooksByAuthor(authorId));
    }

    // Фильтрация по году (диапазон)
    @GetMapping("/filter/year")
    public ResponseEntity<List<BookDTO>> filterByYearRange(
            @RequestParam(required = false) Integer yearFrom,
            @RequestParam(required = false) Integer yearTo) {
        if (yearFrom == null && yearTo == null) {
            return ResponseEntity.ok(bookService.getAllBooks());
        }
        return ResponseEntity.ok(bookService.getBooksByYearRange(yearFrom, yearTo));
    }

    // Фильтрация по доступности
    @GetMapping("/filter/available")
    public ResponseEntity<List<BookDTO>> filterByAvailable(@RequestParam Boolean available) {
        return ResponseEntity.ok(bookService.getBooksByAvailable(available));
    }
}
