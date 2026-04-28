package ru.online_library.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.online_library.library.model.Loan;
import ru.online_library.library.model.LoanStatus;
import ru.online_library.library.model.User;

import java.util.List;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByUserAndStatusIn(User user, List<LoanStatus> statuses);

    int countByUserAndStatusIn(User user, List<LoanStatus> statuses);

    boolean existsByUserAndStatus(User user, LoanStatus status);

    Loan findByBook_IdAndStatusIn(Long bookId, List<LoanStatus> statuses);

    // Новые методы для статистики
    List<Loan> findAllByOrderByLoanDateDesc();
    List<Loan> findByStatus(LoanStatus status);
    List<Loan> findByStatusIn(List<LoanStatus> statuses);
    long countByStatus(LoanStatus status);

    @Query("SELECT l.book.title, COUNT(l) FROM Loan l GROUP BY l.book.title ORDER BY COUNT(l) DESC")
    List<Object[]> findPopularBooks();

    List<Loan> findByBook_Id(Long bookId);
}
