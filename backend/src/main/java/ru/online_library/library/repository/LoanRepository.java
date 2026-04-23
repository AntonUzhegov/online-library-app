package ru.online_library.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.online_library.library.model.Loan;
import ru.online_library.library.model.LoanStatus;
import ru.online_library.library.model.User;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {

    // Активные выдачи пользователя
    List<Loan> findByUserAndStatusIn(User user, List<LoanStatus> statuses);  // ← LoanStatus

    // Количество активных выдач
    int countByUserAndStatusIn(User user, List<LoanStatus> statuses);  // ← LoanStatus

    // Просроченные книги
    boolean existsByUserAndStatus(User user, LoanStatus status);  // ← LoanStatus

    // Все выдачи
    List<Loan> findAll();

    // Активная выдача по книге
    Loan findByBook_IdAndStatusIn(Long bookId, List<LoanStatus> statuses);
}
