package ru.online_library.library.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.online_library.library.dto.BookDTO;
import ru.online_library.library.dto.LoanDTO;
import ru.online_library.library.dto.UserDTO;
import ru.online_library.library.service.BookService;
import ru.online_library.library.service.LoanService;
import ru.online_library.library.service.UserService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {
    private final BookService bookService;
    private final UserService userService;
    private final LoanService loanService;

    public AdminController(BookService bookService, UserService userService, LoanService loanService) {
        this.bookService = bookService;
        this.userService = userService;
        this.loanService = loanService;
    }

    // Добавить книгу
    @PostMapping("/books")
    public ResponseEntity<?> addBook(@RequestBody BookDTO bookDTO) {
        try {
            BookDTO created = bookService.addBook(bookDTO);
            return ResponseEntity.ok(created);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Обновить книгу
    @PutMapping("/books/{id}")
    public ResponseEntity<?> updateBook(@PathVariable Long id, @RequestBody BookDTO bookDTO) {
        try {
            BookDTO updated = bookService.updateBook(id, bookDTO);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Удалить книгу
    @DeleteMapping("/books/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable Long id) {
        try {
            bookService.deleteBook(id);
            return ResponseEntity.ok("Книга удалена");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Список пользователей
    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // Изменить роль
    @PutMapping("/users/{id}/role")
    public ResponseEntity<?> changeUserRole(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            UserDTO updated = userService.changeUserRole(id, request.get("role"));
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Заблокировать/разблокировать
    @PutMapping("/users/{id}/toggle-active")
    public ResponseEntity<?> toggleUserActive(@PathVariable Long id) {
        try {
            UserDTO updated = userService.toggleUserActive(id);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Статистика всех выдач
    @GetMapping("/statistics/loans")
    public ResponseEntity<List<LoanDTO>> getAllLoans() {
        return ResponseEntity.ok(loanService.getAllLoans());
    }

    // Просроченные книги
    @GetMapping("/statistics/overdue")
    public ResponseEntity<List<LoanDTO>> getOverdueLoans() {
        return ResponseEntity.ok(loanService.getOverdueLoans());
    }

    // Активные выдачи
    @GetMapping("/statistics/active")
    public ResponseEntity<List<LoanDTO>> getActiveLoans() {
        return ResponseEntity.ok(loanService.getActiveLoans());
    }

    // Популярные книги
    @GetMapping("/statistics/popular")
    public ResponseEntity<?> getPopularBooks() {
        return ResponseEntity.ok(loanService.getPopularBooks());
    }

    // Статистика возвратов
    @GetMapping("/statistics/returns")
    public ResponseEntity<?> getReturnStatistics() {
        return ResponseEntity.ok(loanService.getReturnStatistics());
    }
}
