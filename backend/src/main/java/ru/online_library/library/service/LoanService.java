package ru.online_library.library.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.online_library.library.dto.LoanDTO;
import ru.online_library.library.model.Book;
import ru.online_library.library.model.Loan;
import ru.online_library.library.model.LoanStatus;
import ru.online_library.library.model.User;
import ru.online_library.library.repository.BookRepository;
import ru.online_library.library.repository.LoanRepository;
import ru.online_library.library.repository.UserRepository;
import java.util.stream.Collectors;

import java.time.LocalDate;
import java.util.List;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    private static final int MAX_BOOKS = 5;
    private static final int LOAN_DAYS = 14;

    //взять книгу
    @Transactional
    public LoanDTO borrowBook(Long bookId){
        User user = authService.getCurrentUser();

        //проверка на просроченные книги
        if(loanRepository.existsByUserAndStatus(user, LoanStatus.OVERDUE)){
            throw new RuntimeException("У вас есть просроченные книги. Верните их, чтобы взять новые.");
        }

        //проверка на лимит(5 книг)
        int activeLoans = loanRepository.countByUserAndStatusIn(user, List.of(LoanStatus.ACTIVE, LoanStatus.OVERDUE));
        if (activeLoans >= MAX_BOOKS){
            throw new RuntimeException("Вы не можете взять больше "+MAX_BOOKS+" книг. Верните хотя бы одну.");
        }

        //Найти книгу
        ru.online_library.library.model.Book book = bookRepository.findById(bookId).orElseThrow(()-> new RuntimeException("Книга не найдена"));

        if (!book.getAvailable()) {
            throw new RuntimeException("Книга уже занята");
        }

        // Создать выдачу
        Loan loan = new Loan();
        loan.setBook(book);
        loan.setUser(user);
        loan.setLoanDate(LocalDate.now());
        loan.setDueDate(LocalDate.now().plusDays(LOAN_DAYS));
        loan.setStatus(LoanStatus.ACTIVE);

        // Пометить книгу как недоступную
        book.setAvailable(false);
        bookRepository.save(book);

        loanRepository.save(loan);

        return convertToDTO(loan);
    }

    /**
     * Вернуть книгу
     */
    @Transactional
    public LoanDTO returnBook(Long loanId) {
        User user = authService.getCurrentUser();

        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new RuntimeException("Выдача не найдена"));

        if (!loan.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Вы не можете вернуть чужую книгу");
        }

        if (loan.getStatus() == LoanStatus.RETURNED) {
            throw new RuntimeException("Книга уже возвращена");
        }

        // Обновить статус выдачи
        loan.setReturnDate(LocalDate.now());
        loan.setStatus(LoanStatus.RETURNED);

        // Сделать книгу снова доступной
        Book book = loan.getBook();
        book.setAvailable(true);
        bookRepository.save(book);

        loanRepository.save(loan);

        return convertToDTO(loan);
    }

    /**
     * Мои книги (взятые пользователем)
     */
    public List<LoanDTO> getMyBooks() {
        User user = authService.getCurrentUser();

        // Проверить и обновить просроченные
        checkOverdue(user);

        return loanRepository.findByUserAndStatusIn(user, List.of(LoanStatus.ACTIVE, LoanStatus.OVERDUE))
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Проверка просроченных книг и обновление статуса
     */
    private void checkOverdue(User user) {
        List<Loan> activeLoans = loanRepository.findByUserAndStatusIn(user, List.of(LoanStatus.ACTIVE));
        for (Loan loan : activeLoans) {
            if (loan.getDueDate().isBefore(LocalDate.now())) {
                loan.setStatus(LoanStatus.OVERDUE);
                loanRepository.save(loan);
            }
        }
    }

    /**
     * Информация о том, кто взял книгу (для каталога)
     */
    public String getBookBorrowedBy(Long bookId) {
        Loan loan = loanRepository.findByBook_IdAndStatusIn(bookId, List.of(LoanStatus.ACTIVE, LoanStatus.OVERDUE));
        if (loan != null) {
            User user = loan.getUser();
            String fullName = user.getFirstName() != null ? user.getFirstName() : "";
            fullName += user.getLastName() != null ? " " + user.getLastName() : "";
            return fullName.trim().isEmpty() ? user.getUsername() : fullName;
        }
        return null;
    }

    /**
     * Конвертация Loan → LoanDTO
     */
    private LoanDTO convertToDTO(Loan loan) {
        LoanDTO dto = new LoanDTO();
        dto.setLoanId(loan.getId());
        dto.setBookId(loan.getBook().getId());
        dto.setBookTitle(loan.getBook().getTitle());
        dto.setCoverImage(loan.getBook().getCoverImage());
        dto.setLoanDate(loan.getLoanDate());
        dto.setDueDate(loan.getDueDate());
        dto.setReturnDate(loan.getReturnDate());
        dto.setStatus(loan.getStatus().name());

        User user = loan.getUser();
        String fullName = user.getFirstName() != null ? user.getFirstName() : "";
        fullName += user.getLastName() != null ? " " + user.getLastName() : "";
        dto.setBorrowedBy(fullName.trim().isEmpty() ? user.getUsername() : fullName);

        return dto;
    }
}

